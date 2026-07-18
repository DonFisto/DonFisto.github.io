import { createServer } from "node:http";
import { mkdir, readFile, stat } from "node:fs/promises";
import { extname, relative, resolve } from "node:path";
import { chromium } from "playwright";

const HOST = "127.0.0.1";
const DIST_ROOT = resolve("dist");
const OUTPUT = resolve(
  "public/downloads/Daniel-Martinez-Cabeza-de-Vaca-Robotics-Portfolio.pdf"
);

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".gif": "image/gif",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".pdf": "application/pdf",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

function isInsideDist(path) {
  const location = relative(DIST_ROOT, path);
  return location === "" || (!location.startsWith("..") && !location.startsWith("/"));
}

async function resolveAsset(pathname) {
  const decoded = decodeURIComponent(pathname);
  const relativePath = decoded.replace(/^\/+/, "");
  let candidate = resolve(DIST_ROOT, relativePath);

  if (!isInsideDist(candidate)) {
    throw new Error(`Blocked path outside dist: ${pathname}`);
  }

  try {
    const information = await stat(candidate);
    if (information.isDirectory()) {
      candidate = resolve(candidate, "index.html");
    }
  } catch {
    if (pathname.endsWith("/")) {
      candidate = resolve(candidate, "index.html");
    }
  }

  if (!isInsideDist(candidate)) {
    throw new Error(`Blocked resolved path outside dist: ${pathname}`);
  }

  return candidate;
}

async function startStaticServer() {
  const server = createServer(async (request, response) => {
    try {
      const requestUrl = new URL(request.url ?? "/", `http://${HOST}`);
      const filePath = await resolveAsset(requestUrl.pathname);
      const information = await stat(filePath);

      if (!information.isFile()) {
        response.writeHead(404);
        response.end("Not found");
        return;
      }

      const body = await readFile(filePath);
      response.writeHead(200, {
        "Content-Type": contentTypes[extname(filePath).toLowerCase()] ?? "application/octet-stream",
        "Content-Length": String(body.length),
        "Cache-Control": "no-store",
      });
      response.end(body);
    } catch {
      response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("Not found");
    }
  });

  server.keepAliveTimeout = 1_000;
  server.headersTimeout = 5_000;

  await new Promise((resolvePromise, rejectPromise) => {
    server.once("error", rejectPromise);
    server.listen(0, HOST, () => {
      server.off("error", rejectPromise);
      resolvePromise();
    });
  });

  const address = server.address();
  if (!address || typeof address === "string") {
    throw new Error("Could not determine the local preview server address.");
  }

  return {
    server,
    origin: `http://${HOST}:${address.port}`,
  };
}

async function closeServer(server) {
  if (!server) return;

  console.log("Closing in-process static server...");

  const closed = new Promise((resolvePromise) => {
    server.close(() => resolvePromise());
  });

  server.closeAllConnections?.();

  await Promise.race([
    closed,
    new Promise((resolvePromise) => setTimeout(resolvePromise, 5_000)),
  ]);

  console.log("In-process static server closed.");
}

async function closeBrowser(browser) {
  if (!browser) return;

  console.log("Closing Playwright browser...");

  await Promise.race([
    browser.close(),
    new Promise((_, rejectPromise) =>
      setTimeout(
        () => rejectPromise(new Error("Timed out while closing Playwright browser.")),
        10_000
      )
    ),
  ]);

  console.log("Playwright browser closed.");
}

async function main() {
  let server;
  let browser;
  let primaryError;

  try {
    await mkdir(resolve("public/downloads"), { recursive: true });

    const local = await startStaticServer();
    server = local.server;
    const printUrl = `${local.origin}/portfolio-print/`;

    console.log(`Serving built portfolio at ${local.origin}`);

    browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    await page.emulateMedia({ media: "print" });

    await page.goto(printUrl, {
      waitUntil: "networkidle",
      timeout: 60_000,
    });

    await page.waitForFunction(
      () => document.querySelectorAll(".pdf-page").length === 4,
      undefined,
      { timeout: 30_000 }
    );

    await page.evaluate(async () => {
      await document.fonts.ready;
      await Promise.all(
        Array.from(document.images).map((image) => {
          if (image.complete && image.naturalWidth > 0) return Promise.resolve();
          return new Promise((resolveImage, rejectImage) => {
            image.addEventListener("load", resolveImage, { once: true });
            image.addEventListener(
              "error",
              () => rejectImage(new Error(`Image failed to load: ${image.currentSrc}`)),
              { once: true }
            );
          });
        })
      );
    });

    const dimensions = await page.evaluate(() =>
      Array.from(document.querySelectorAll(".pdf-page")).map((element) => {
        const rect = element.getBoundingClientRect();
        return {
          page: element.getAttribute("data-page"),
          width: rect.width,
          height: rect.height,
          scrollWidth: element.scrollWidth,
          scrollHeight: element.scrollHeight,
        };
      })
    );

    for (const item of dimensions) {
      if (item.scrollWidth > item.width + 2 || item.scrollHeight > item.height + 2) {
        throw new Error(
          `Print page ${item.page ?? "unknown"} overflows: ` +
          `${item.scrollWidth}x${item.scrollHeight} inside ${item.width}x${item.height}.`
        );
      }
    }

    await page.pdf({
      path: OUTPUT,
      printBackground: true,
      preferCSSPageSize: true,
      displayHeaderFooter: false,
      margin: {
        top: "0",
        right: "0",
        bottom: "0",
        left: "0",
      },
    });

    const file = await stat(OUTPUT);
    if (!file.isFile() || file.size < 20_000) {
      throw new Error(`Generated PDF is missing or unexpectedly small: ${file.size} bytes.`);
    }

    console.log(`Generated ${OUTPUT} (${file.size} bytes).`);
  } catch (error) {
    primaryError = error;
  } finally {
    try {
      await closeBrowser(browser);
    } catch (error) {
      primaryError ??= error;
      console.error(error);
    }

    try {
      await closeServer(server);
    } catch (error) {
      primaryError ??= error;
      console.error(error);
    }
  }

  if (primaryError) {
    throw primaryError;
  }

  console.log("PDF export cleanup completed.");
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
