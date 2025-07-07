# How to Add New Artworks to Your Website

This guide explains how to easily add new artworks to your website by copying and modifying existing code blocks.

## File Structure

Your website expects images to be organized as follows:
```
images/
├── artwork-1.jpg          (main artwork images)
├── artwork-2.jpg
├── artwork-3.jpg
├── ...
├── artwork-20.jpg
├── fragments/
│   ├── artwork-1-fragment1.jpg    (detail images)
│   ├── artwork-1-fragment2.jpg
│   ├── artwork-1-fragment3.jpg
│   ├── artwork-1-fragment4.jpg
│   ├── artwork-1-fragment5.jpg
│   ├── artwork-2-fragment1.jpg
│   └── ...
├── thumbnails/
│   ├── artwork-1-video-poster.jpg (video poster images)
│   ├── artwork-2-video-poster.jpg
│   └── ...
└── videos/
    ├── artwork-1-process.mp4      (process videos)
    ├── artwork-2-process.mp4
    └── ...
```

## Step 1: Adding Images

1. **Main Artwork**: Save your main artwork image as `artwork-X.jpg` (where X is the artwork number)
2. **Fragment Images**: Save up to 5 detail images as `artwork-X-fragment1.jpg` through `artwork-X-fragment5.jpg`
3. **Video Poster**: Save a poster image for your video as `artwork-X-video-poster.jpg`
4. **Process Video**: Save your creation process video as `artwork-X-process.mp4`

## Step 2: Adding to Gallery (index.html)

### For Mosaic View
Find the comment `<!-- ARTWORK X - Copy this block to add new artworks -->` and copy this entire block:

```html
<!-- ARTWORK 21 - Copy this block to add new artworks -->
<div class="artwork-item" data-artwork="21">
    <div class="artwork-frame">
        <img src="images/artwork-21.jpg" alt="Artwork 21" loading="lazy">
        <div class="artwork-overlay">
            <h3>Your Artwork Title</h3>
            <p>Medium, Year</p>
        </div>
    </div>
</div>
```

**What to change:**
- Change `21` to your new artwork number
- Change `artwork-21.jpg` to your image filename
- Change `"Artwork 21"` to your artwork title
- Change `"Your Artwork Title"` to your actual title
- Change `"Medium, Year"` to your artwork's medium and year

### For Standard View
Find the comment `<!-- STANDARD ARTWORK X - Copy this block to add new artworks -->` and copy this block:

```html
<!-- STANDARD ARTWORK 21 - Copy this block to add new artworks -->
<div class="standard-item" data-artwork="21">
    <div class="standard-frame">
        <img src="images/artwork-21.jpg" alt="Artwork 21" loading="lazy">
        <div class="standard-overlay">
            <h3>Your Artwork Title</h3>
        </div>
    </div>
</div>
```

**What to change:**
- Same changes as mosaic view above

## Step 3: Creating Individual Artwork Page

1. **Copy an existing artwork page**: Copy `artwork-1.html` and rename it to `artwork-X.html` (where X is your new artwork number)

2. **Update the page content**:
   - Change the `<title>` tag: `<title>Your Artwork Title - TP Art</title>`
   - Change the main image src: `src="images/artwork-X.jpg"`
   - Change the alt text: `alt="Your Artwork Title"`
   - Update the artwork title: `<h1>Your Artwork Title</h1>`
   - Update the artwork details:
     ```html
     <p><strong>Materials:</strong> Your Medium</p>
     <p><strong>Year:</strong> Your Year</p>
     <p><strong>Dimensions:</strong> Your Dimensions</p>
     ```
   - Update the description paragraph
   - Update fragment images: `src="images/fragments/artwork-X-fragment1.jpg"` etc.
   - Update video sources: `src="videos/artwork-X-process.mp4"`
   - Update video poster: `poster="images/thumbnails/artwork-X-video-poster.jpg"`
   - Update navigation links to previous/next artworks

## Step 4: Update Navigation Links

In your new artwork page, update the navigation at the bottom:
```html
<div class="artwork-navigation">
    <a href="artwork-X.html" class="nav-artwork prev">← Previous</a>
    <a href="artwork-Y.html" class="nav-artwork next">Next →</a>
</div>
```

Also update the "Next" link in the previous artwork page to point to your new artwork.

## Example: Adding Artwork #21

1. **Add images**:
   - `images/artwork-21.jpg`
   - `images/fragments/artwork-21-fragment1.jpg` through `artwork-21-fragment5.jpg`
   - `images/thumbnails/artwork-21-video-poster.jpg`
   - `videos/artwork-21-process.mp4`

2. **Add to index.html** (both mosaic and standard sections):
   ```html
   <!-- ARTWORK 21 -->
   <div class="artwork-item" data-artwork="21">
       <div class="artwork-frame">
           <img src="images/artwork-21.jpg" alt="Sunset Stallion" loading="lazy">
           <div class="artwork-overlay">
               <h3>Sunset Stallion</h3>
               <p>Oil on Canvas, 2024</p>
           </div>
       </div>
   </div>
   ```

3. **Create artwork-21.html** by copying artwork-1.html and updating all references

4. **Update artwork-20.html** to link to artwork-21.html in the "Next" navigation

## Tips

- **Consistent naming**: Always use the format `artwork-X` for consistency
- **Image optimization**: Compress your images for web to improve loading times
- **Alt text**: Always provide descriptive alt text for accessibility
- **Fragment variety**: Choose diverse detail shots that showcase different aspects of your artwork
- **Video quality**: Keep videos under 50MB for good web performance

## Troubleshooting

- **Images not showing**: Check that file names match exactly (case-sensitive)
- **Links not working**: Verify that `data-artwork` numbers match the HTML filename numbers
- **Layout issues**: Ensure you've copied the complete HTML blocks including all div tags

This modular approach makes it easy to expand your gallery indefinitely while maintaining consistency and functionality.

