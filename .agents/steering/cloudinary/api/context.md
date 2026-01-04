# Cloudinary API Integration
Keywords: cloudinary, url, image, video, transformation, options

## URL Structure

Cloudinary URLs follow pattern:
```
https://res.cloudinary.com/{cloudName}/{resourceType}/upload{params}/{publicId}
```

Resource types:
- `image` - For images
- `video` - For videos

## Variable Formatter

The `variable-formatter` utility converts options objects to Cloudinary URL parameters:

```javascript
import formatter from '../utils/variable-formatter';

// Input: { width: 100, height: 200, crop: 'fill' }
// Output: '/w_100,h_200,c_fill'
```

### Supported Options

| Option | URL Param | Description |
|--------|-----------|-------------|
| height | h_ | Height in pixels |
| width | w_ | Width in pixels |
| crop | c_ | Crop mode (fill, fit, limit, lfill, etc.) |
| dpr | dpr_ | Device pixel ratio |
| fetch_format | f_ | Output format |
| quality | q_ | Quality (auto, 80, etc.) |
| radius | r_ | Corner radius |
| default_image | d_ | Default image fallback |
| aspect_ratio | ar_ | Aspect ratio |
| gravity | g_ | Gravity for cropping |
| zoom | z_ | Zoom level |
| x, y | x_, y_ | Position offsets |
| angle | a_ | Rotation angle |
| effect | e_ | Effects |
| opacity | o_ | Opacity |
| border | bo_ | Border |
| background | b_ | Background color |
| overlay | l_ | Overlay image |
| underlay | u_ | Underlay image |

## Crop Mode Behavior

Certain crop modes (`limit`, `fit`, `lfill`) don't set HTML width/height attributes because the resulting image dimensions are not predictable:

```javascript
if (crop === 'limit' || crop === 'fit' || crop === 'lfill') {
  return null; // Don't set width/height attributes
}
```

## Resource List API

Fetches tagged resources from Cloudinary's Client Side Resource Lists:
```
https://res.cloudinary.com/{cloudName}/image/list/{tag}.json
```

Response resources are sorted by `context.custom.order` field.

## Rules
- MUST: Escape all values before URL construction
- MUST: Handle missing options gracefully (return empty string)
- PREFER: Use `quality: 'auto'` for automatic optimization
- AVOID: Setting HTML dimensions for responsive crop modes

## References
- Key files: addon/utils/variable-formatter.js, addon/components/cloudinary-resource-list.js
- Related contexts: core/patterns/context.md
