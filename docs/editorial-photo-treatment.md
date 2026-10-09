# Editorial photo finishing

Built-in imagegen edits, saved as optimized WebP assets. Originals are retained in the archive.

Selected final assets:
- `research-in-action.webp` — ISUE Lab VR demonstration.
- `diwali-on-stage.webp` — Diwali hosts actively presenting.

Prompt used for each: identity-preserving documentary photo finishing for an editorial software engineer portfolio. Clean neutral black and white, gently improved exposure, detailed midtones, soft charcoal blacks, subtle fine grain. Preserve people's faces, expressions, gestures, clothing, scene and original framing. No added typography, badges, logos or fabricated events. Lift the dim Diwali exposure naturally.

The generated Exodus variant was rejected because the poster text changed. The original poster and newspaper scans are used with CSS grayscale and paper-edge treatment to preserve their content. The NSS conference certificate photo, podium presentation, VR demonstration and event hosting are the selected visual moments. Posed contact-sheet photos, the humorous SI composite, food tables, duplicate event backdrops and unrelated audience shots are excluded from editorial galleries. The original shared archive remains intact.

## Final prompt set (built-in imagegen)

For each selected edit, `NAME` was respectively `research-in-action` and `diwali-on-stage`:

> Use case: identity-preserve. Edit target: the attached actual documentary photo. Asset type: an editorial software engineer portfolio photo, named NAME. Apply a tasteful BLACK AND WHITE archival magazine photo finish: gently improve exposure, preserve midtone detail, clean neutral grayscale, deep soft charcoal blacks, subtle fine photographic grain. Make this existing photo blend into an elegant charcoal/ivory/red editorial magazine site. Keep the original photograph and scene EXACTLY: identical people's faces, identities, expressions, hands, positions, clothing, gestures, objects, environment, and all existing text. This is a photo finishing edit only; do not reimagine or redraw the scene. The Diwali shot is dim: lift exposure enough to see both hosts naturally without flattening the atmosphere. Preserve the aspect ratio and the full useful original framing, no added typography, captions, borders, graphics, badges, logos, new people or removed people, no fabricated accomplishment. Output one clean finished photo.

Saved paths, relative to the workspace:
- `public/editorial/photos/research-in-action.webp`
- `public/editorial/photos/diwali-on-stage.webp`
