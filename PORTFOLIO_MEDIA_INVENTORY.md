# Portfolio media inventory

Captured 2026-09-17 from `DonFisto/vision-segmentation-autonomous-driving`, branch `feature/route-lane-association`, exact commit `42a250e34197b5c51ecca227a69f6c566df1de2c`. Files were copied with `git show <commit>:<path>` from the clean local repository, not from an unpinned branch download.

Machine-readable source paths, destination paths and SHA-256 checksums: `provenance.json`. `npm run media:metadata` checks all source hashes and generates measured dimensions/bytes. No media is fabricated.

| Key | Source asset | Portfolio asset | Dimensions | Bytes |
| --- | --- | --- | --- | ---: |
| planning | `assets/AD_Planning_Photo.png` | `/media/autonomous-driving/planning.png` | 2556x1399 | 508,562 |
| lanePhoto | `assets/AD_Lane_Detection_Photo.png` | `/media/autonomous-driving/lane-detection.png` | 2134x1341 | 1,171,917 |
| laneDemo | `assets/AD_Lane_Detection_Demo.gif` | `/media/autonomous-driving/lane-detection-demo.gif` | 600x377 | 14,507,315 |
| projectDemo | `assets/AD_Project_Demo.gif` | `/media/autonomous-driving/project-demo.gif` | 800x450 | 12,388,823 |
| trackingOverlay | `assets/Segmentatation+Overlay+Tracking.png` | `/media/autonomous-driving/tracking-overlay.png` | 3432x1199 | 1,497,130 |
| segmentationOverlay | `assets/demo_overlay.png` | `/media/autonomous-driving/segmentation-overlay.png` | 2048x1024 | 1,931,698 |
| mappingDemo | `assets/AD_Mapping_Demo.gif` | `/media/autonomous-driving/mapping-demo.gif` | 1280x523 | 16,689,027 |

## Presentation and provenance of derivatives

- `planning.png` is the current homepage/case-study/print hero and social image: OpenDRIVE routing graph, ego pose and selected RoutePlan in Foxglove. Privileged map visualization, not closed-loop autonomy or perception proof.
- `lane-detection.png` is the current static lane diagnostic view. It does not display every LaneMap field.
- `lane-detection-demo.gif` (14.5 MB decimal) is loaded only on explicit play, below the fold, with a stop/static control. Reduced-motion users receive the photo and no GIF request. It is not used in print.
- `tracking-overlay.png` illustrates earlier/parallel semantic object perception, subordinate to current lane/routing work.
- `project-demo.gif` and `mapping-demo.gif` remain historical assets. Accumulated occupancy is a grid representation, not current vector LaneMap. Neither autoplay nor current-system hero usage is allowed.
- `segmentation-overlay.png` remains available as historical semantic evidence.

Reproduce derivatives with `node scripts/generate-media-derivatives.mjs` (optional authoring step; ImageMagick installed locally). No cropping or aspect-ratio change:

| Derivative | Input | Operation |
| --- | --- | --- |
| `planning.webp` | `planning.png` | `convert input.png -quality 88 output.webp` |
| `lane-detection.webp` | `lane-detection.png` | same |
| `tracking-overlay.webp` | `tracking-overlay.png` | same |
| `segmentation-overlay.webp` | `segmentation-overlay.png` | same |
| `project-demo-poster.png` | `project-demo.gif` | `convert input.gif[0] output.png` |
| `mapping-demo-poster.png` | `mapping-demo.gif` | same |

All derivatives inherit the exact source branch/commit/path above. Their dimensions remain those of the input; GIF posters are the first frame. Originals preserve full resolution, overlays and legends. The web provides a full-resolution image link for detailed inspection. Existing historical media was rechecked/copied against this current commit; this does not turn historical capability into current scope.

Future planner animation/video: add `motion` to `heroMedia` in the typed content model, with an authentic source and metadata entry; the same shared media component handles explicit-load GIF or video. Keep the static planning preview and update provenance before publishing.

## Evidence gaps

No new benchmark or correctness claim is inferred from an image. Dedicated depth/fusion/free-space captures are not required for the current critical path; historical PHASE_4 documents retain the earlier capture backlog. No placeholder replaces a missing association output because that layer is not implemented.
