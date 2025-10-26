# Lore Assets

This directory is for images and media files referenced in the lore documentation.

## Images to Extract

The following image was found in the original Notion documents and should be uploaded to your CDN:

### Weapon Systems Diagram

- **Original URL**: `https://prod-files-secure.s3.us-west-2.amazonaws.com/85f63887-dad5-40be-b14f-0a989ce7770b/51610737-be98-44b1-b26f-43e6b7c5bc54/image.png`
- **Referenced in**: `systems/weapon-systems.md`
- **Suggested filename**: `weapon-systems-diagram.png`

## Instructions

1. Download the image from the URL above
2. Upload to your CDN
3. Update the reference in `systems/weapon-systems.md` to point to your CDN URL
4. Replace the path: `![Weapon Systems Diagram](../assets/weapon-systems-diagram.png)` with your CDN URL

Example:

```markdown
![Weapon Systems Diagram](https://your-cdn.com/eidolon-lore/weapon-systems-diagram.png)
```

## Notes

- All images should be optimized for web delivery
- Consider using WebP format for better compression
- Maintain aspect ratios and quality for diagrams
- Add alt text for accessibility
