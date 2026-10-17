# Homepage suit portrait

Active asset: `public/editorial/pranav-suit-cutout-v1.png`.
Source: user-provided `Smiling Man in a Three-Piece Suit.png` in Downloads. Original untouched.
Tool: built-in imagegen; alpha checked at background and subject sample points.

## Initial prompt

Edit target: supplied portrait of a smiling young man wearing a three-piece suit. Create a faithful photographic black-and-white editorial cutout for a sophisticated newspaper-style portfolio homepage. Preserve his exact face, smile, hair, body shape, hands-in-pockets pose, suit, tie, and all clothing details; do not beautify, change identity, or invent features. Remove the white background completely, including small spaces around arms, and keep genuine alpha transparency. Crop to the existing upper-thigh/waist boundary without inventing lower body; center the figure with narrow transparent margins, full hair and both shoulders visible. Rich natural monochrome tones with restrained fine print grain and a very thin irregular off-white paper edge. No text, no additional objects, no backdrop, no baked drop shadow. Natural photographic likeness is the priority. Deliver a tall portrait asset.

## Final correction prompt

Precise background removal correction. Keep the photographed man, face, hair, suit and pose unchanged. Remove ALL gray haze, glow, vignette and dark background outside the man's exact silhouette. Outside the person must be completely transparent alpha 0, with only tiny antialiased silhouette edges. The man's body and clothing must remain opaque. No paper border, no glow, no shadows, no extra processing. Keep monochrome photo, identical subject details, and tall framing. This must be a genuinely clean transparent background cutout, not a portrait on a soft gradient.

## Name treatment

White name lettering uses CSS difference blending inside the existing isolated hero. The backdrop is the theme paper plus the rendered portrait, so each letter inverts the pixels beneath it, including partial overlaps. Stroke and text shadows are removed to avoid a fixed-color halo. Unsupported browsers retain the theme ink. Forced-color mode restores normal system-colored text.
