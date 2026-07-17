# PORTFOLIO_REVIEW_CHECKLIST.md

Use this checklist before accepting each phase, before merging significant changes, and before every release.

---

## 1. Source integrity

- [ ] Every technical claim is supported by source code, documentation, media, or explicit user confirmation.
- [ ] No numerical performance value was invented.
- [ ] No date was invented.
- [ ] No team size or collaboration claim was invented.
- [ ] No technology was listed merely because it is common in robotics.
- [ ] Roadmap items are visibly distinct from implemented capabilities.
- [ ] Limitations have not been hidden or softened into misleading language.
- [ ] The site does not call the current system complete SLAM.
- [ ] The site does not describe relative depth as metric depth.
- [ ] The site acknowledges simulator-provided odometry where accumulated mapping is discussed.
- [ ] `PORTFOLIO_EVIDENCE_INVENTORY.md` is current.
- [ ] `PORTFOLIO_SPEC.md` was updated if any source-of-truth decision changed.

---

## 2. Ownership and positioning

- [ ] Daniel’s name is visible.
- [ ] “Individual engineering project” is immediately clear.
- [ ] Mathematics + Computer Science is visible without dominating the project.
- [ ] The project is described as a prototype or research-oriented system.
- [ ] The page does not imply company, university-lab, or team affiliation that has not been verified.
- [ ] The repository link is easy to find.
- [ ] The project purpose is understandable in approximately ten seconds.
- [ ] The engineering scope is understandable in approximately one minute.

---

## 3. Architecture accuracy

- [ ] CARLA RGB is represented as an input.
- [ ] Semantic segmentation feeds object extraction.
- [ ] Object extraction feeds tracking.
- [ ] Monocular depth is represented independently.
- [ ] Tracking and depth feed object-depth fusion.
- [ ] Segmentation and depth feed free-space estimation.
- [ ] Segmentation and depth feed local occupancy.
- [ ] Free-space estimation can feed reactive navigation.
- [ ] Local occupancy and hero odometry feed accumulated local mapping.
- [ ] Primary flow is left-to-right.
- [ ] Solid connectors indicate primary data.
- [ ] Dashed connectors indicate auxiliary or odometry data.
- [ ] Arrowheads are consistent.
- [ ] No ambiguous backward connector exists.
- [ ] Node labels are readable.
- [ ] ROS topic labels do not wrap awkwardly.
- [ ] Mobile architecture remains understandable.
- [ ] Print architecture remains vector-based.
- [ ] SVG has an accessible title and description.
- [ ] Color is not the only way groups are distinguished.

---

## 4. Content quality

- [ ] The summary is concise.
- [ ] The page does not repeat the same project description across multiple sections.
- [ ] Node count, class count, and map-layer count are supporting metadata rather than the main story.
- [ ] Contribution bullets are specific.
- [ ] Generic claims such as “passionate,” “innovative,” or “cutting-edge” have been avoided unless necessary.
- [ ] The development trajectory communicates progression.
- [ ] Captions explain what media demonstrates.
- [ ] Limitations include engineering consequences where useful.
- [ ] Roadmap copy is clear and realistic.
- [ ] The default page is not overloaded with repository-level documentation.
- [ ] Optional technical depth is secondary and accessible.

---

## 5. Media integrity

- [ ] Every result image comes from the project or an explicitly approved source.
- [ ] Conceptual illustrations are not labelled as results.
- [ ] Remaining placeholders are visibly identified.
- [ ] Alt text is technically accurate.
- [ ] Captions do not overstate performance.
- [ ] Important overlays and legends remain visible.
- [ ] Media is not cropped in a misleading way.
- [ ] Image dimensions are declared.
- [ ] Below-the-fold media is lazy-loaded.
- [ ] Animated content has a static fallback.
- [ ] Reduced-motion users receive a usable alternative.
- [ ] Print uses static representative frames.
- [ ] Technical details remain visible after optimization.

---

## 6. Visual system

- [ ] Dark navy and turquoise remain the primary visual identity.
- [ ] Secondary accent colors are restrained.
- [ ] Accent colors have consistent semantic roles.
- [ ] IBM Plex Sans is used for interface/body text.
- [ ] IBM Plex Mono is used selectively for technical labels.
- [ ] Text contrast is sufficient.
- [ ] Secondary grey text is not too faint.
- [ ] Spacing follows a consistent scale.
- [ ] Card padding is consistent.
- [ ] Border radii are consistent.
- [ ] Border weights are consistent.
- [ ] Headings align consistently.
- [ ] No awkward orphaned words appear in major headings.
- [ ] Repository URLs are not clipped.
- [ ] Topic pills are not too small.
- [ ] The design does not drift into cyberpunk, gaming, or generic startup aesthetics.
- [ ] Visual effects do not compete with engineering evidence.

---

## 7. Responsive behavior

Test at approximately:

- 1440 px
- 1024 px
- 768 px
- 390 px

Checklist:

- [ ] No uncontrolled horizontal overflow.
- [ ] Mobile navigation works by keyboard and touch.
- [ ] Hero content order is intentional.
- [ ] Technology badges wrap cleanly.
- [ ] Cards do not become unreadably narrow.
- [ ] Timeline remains understandable.
- [ ] Architecture either reflows or scrolls with clear affordance.
- [ ] Media retains useful detail.
- [ ] Captions remain readable.
- [ ] Buttons have adequate touch targets.
- [ ] Text is not reduced merely to preserve desktop layout.
- [ ] No content depends on hover.

---

## 8. Accessibility

- [ ] Semantic page landmarks exist.
- [ ] Heading hierarchy is correct.
- [ ] Navigation has an accessible name.
- [ ] Focus states are visible.
- [ ] Keyboard order is logical.
- [ ] Mobile menu focus behavior is correct.
- [ ] All informative images have alt text.
- [ ] Decorative images are ignored appropriately.
- [ ] SVG diagrams include titles and descriptions.
- [ ] Color contrast is sufficient.
- [ ] Meaning is not conveyed only with color.
- [ ] Reduced-motion preference is respected.
- [ ] Interactive controls have accessible names.
- [ ] Links are distinguishable.
- [ ] No duplicate IDs exist.
- [ ] The page remains usable when zoomed.
- [ ] Controlled horizontal scrolling is keyboard accessible.

---

## 9. Performance

- [ ] Static rendering is used where possible.
- [ ] Unnecessary client-side hydration is absent.
- [ ] Images use suitable formats.
- [ ] Image dimensions prevent layout shift.
- [ ] Only essential assets are preloaded.
- [ ] Fonts load without blocking the page unnecessarily.
- [ ] Unused CSS is limited.
- [ ] JavaScript bundle size is justified.
- [ ] Heavy media does not autoplay.
- [ ] Below-the-fold media is lazy-loaded.
- [ ] Mobile network behavior is acceptable.
- [ ] PDF assets are high enough resolution without excessive file size.

---

## 10. Four-page PDF

- [ ] PDF contains exactly four pages.
- [ ] Each page is A4 landscape.
- [ ] No browser headers or footers appear.
- [ ] No unexpected margins appear.
- [ ] Background colors print correctly.
- [ ] No blank page appears.
- [ ] No card is split across pages.
- [ ] No SVG is clipped.
- [ ] No image is clipped unintentionally.
- [ ] No animated media is used.
- [ ] URLs remain visible.
- [ ] Links remain clickable where supported.
- [ ] Text remains readable at thumbnail size.
- [ ] Architecture remains vector-based.
- [ ] Page 1 covers project overview.
- [ ] Page 2 covers architecture.
- [ ] Page 3 covers contributions and trajectory.
- [ ] Page 4 covers outputs, limitations, and roadmap.
- [ ] Footer placement is consistent.
- [ ] File name is professional.
- [ ] File size is reasonable for applications.

---

## 11. Build and deployment

- [ ] Clean dependency installation succeeds.
- [ ] Type checks succeed.
- [ ] Production build succeeds.
- [ ] PDF export succeeds.
- [ ] Export failure returns a nonzero status.
- [ ] Preview process is cleaned up.
- [ ] PDF existence is verified in CI.
- [ ] Pull requests run build checks.
- [ ] Main-branch pushes deploy automatically.
- [ ] Node version is specified.
- [ ] Dependency caching is configured appropriately.
- [ ] GitHub Pages artifact is correct.
- [ ] Asset paths work in production.
- [ ] Canonical URL is correct.
- [ ] Download-PDF link works after deployment.
- [ ] Repository link works.
- [ ] Manual GitHub settings are documented.

---

## 12. Recruiter review

### Ten-second test

- [ ] I understand what the project is.
- [ ] I understand that Daniel built it.
- [ ] I can find the repository.
- [ ] I see authentic technical evidence.

### Sixty-second test

- [ ] I understand the main data flow.
- [ ] I can identify Daniel’s engineering contributions.
- [ ] I see progression beyond a single ML model.
- [ ] I understand the role of ROS2 and CARLA.
- [ ] I understand what is currently limited.
- [ ] I understand the next technical step.
- [ ] I have a reason to inspect the repository.

### Credibility test

- [ ] Claims feel specific and supported.
- [ ] Limitations increase rather than reduce trust.
- [ ] The page does not resemble a generic template.
- [ ] The project appears technically coherent.
- [ ] The portfolio does not exaggerate production readiness.
- [ ] The PDF works without needing the website.

---

## 13. Before every significant commit

- [ ] Working tree reviewed.
- [ ] Unrelated files preserved.
- [ ] Build run.
- [ ] Changed routes opened locally.
- [ ] Responsive impact reviewed.
- [ ] Print impact reviewed.
- [ ] Accessibility impact reviewed.
- [ ] New claims added to the evidence inventory.
- [ ] Specification updated when needed.
- [ ] Commit message describes the engineering change.

---

## 14. Before every release

- [ ] All applicable checklist sections completed.
- [ ] Website built from a clean install.
- [ ] PDF regenerated.
- [ ] PDF visually inspected.
- [ ] Website inspected on desktop and mobile.
- [ ] Links checked.
- [ ] Media checked.
- [ ] Metadata checked.
- [ ] Deployment workflow checked.
- [ ] Deployed URL opened.
- [ ] PDF URL opened.
- [ ] Remaining placeholders documented.
- [ ] Remaining Daniel-dependent tasks documented.
- [ ] Release summary written.

---

## 15. Future project additions

When adding a new robotics project:

- [ ] Create a separate evidence inventory.
- [ ] Define ownership and scope.
- [ ] Reuse the design system.
- [ ] Avoid forcing the new project into the same architecture diagram.
- [ ] Use authentic media.
- [ ] State limitations.
- [ ] Add a project-specific roadmap only when useful.
- [ ] Keep the homepage concise.
- [ ] Ensure the autonomous-driving project remains accessible.
- [ ] Reassess PDF scope rather than automatically expanding it.
