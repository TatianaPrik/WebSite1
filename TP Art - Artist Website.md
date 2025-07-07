# TP Art - Artist Website

A professional, responsive multi-page website for showcasing artwork with dual gallery views, individual artwork pages, and advanced features.

## 🎨 Features

### Gallery Views
- **Mosaic View**: Artistic masonry layout preserving original image proportions with baguette-style frames
- **Standard Gallery View**: Uniform grid layout with fitted images in standardized containers
- **Toggle between views**: Easy switching with preference memory

### Individual Artwork Pages
- **Zoom functionality**: +/- controls and mouse wheel zoom
- **Watermark system**: Automatic "TP Art" watermarks on full-size images
- **Fragment gallery**: Up to 5 detail images per artwork
- **Process videos**: Embedded videos showing creation process
- **Navigation**: Previous/Next artwork navigation

### Responsive Design
- **Desktop**: Multi-column layouts with hover effects
- **Tablet**: Adapted grids with touch-friendly controls
- **Mobile**: Single-column layouts with swipe gestures

## 📁 File Structure

```
artist-website-v2/
├── index.html                 # Main gallery page (20 artwork slots)
├── about.html                 # Artist biography and manifesto
├── contact.html               # Contact information
├── artwork-1.html             # Individual artwork page template
├── artwork-2.html             # Second artwork page example
├── css/
│   └── styles.css            # Complete responsive styling
├── js/
│   ├── main.js               # Core functionality
│   ├── gallery.js            # Gallery view switching
│   └── artwork.js            # Zoom and artwork interactions
├── images/
│   ├── artwork-1.jpg         # Main artwork images (add your own)
│   ├── artwork-2.jpg         # ...up to artwork-20.jpg
│   ├── fragments/
│   │   ├── artwork-1-fragment1.jpg  # Detail images
│   │   └── ...               # Up to 5 fragments per artwork
│   └── thumbnails/
│       └── artwork-1-video-poster.jpg  # Video poster images
├── videos/
│   └── artwork-1-process.mp4 # Process videos
├── README.md                 # This file
├── HOW_TO_ADD_ARTWORKS.md   # Instructions for adding new artworks
└── start_server.*           # Local server scripts
```

## 🚀 Quick Start

### Option 1: Local Web Server (Recommended)

#### Windows:
1. Double-click `start_server.bat`
2. Open browser to `http://localhost:8000`

#### Mac/Linux:
1. Open Terminal in the website folder
2. Run: `./start_server.sh` (or `chmod +x start_server.sh` first if needed)
3. Open browser to `http://localhost:8000`

#### Manual Python Server:
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

### Option 2: Visual Studio Code Live Server
1. Install "Live Server" extension in VS Code
2. Right-click `index.html` → "Open with Live Server"

### Option 3: Other Local Servers
- **Node.js**: `npx serve .`
- **PHP**: `php -S localhost:8000`
- **Ruby**: `ruby -run -e httpd . -p 8000`

## 📸 Adding Your Artwork

### 1. Prepare Your Images
- **Main images**: Save as `artwork-1.jpg`, `artwork-2.jpg`, etc.
- **Fragment images**: Save as `artwork-X-fragment1.jpg` through `artwork-X-fragment5.jpg`
- **Video posters**: Save as `artwork-X-video-poster.jpg`
- **Process videos**: Save as `artwork-X-process.mp4`

### 2. Update Gallery (index.html)
Copy the artwork blocks and update:
- Image filenames
- Artwork titles
- Medium and year information
- `data-artwork` numbers

### 3. Create Individual Pages
Copy `artwork-1.html` to create `artwork-X.html` and update:
- Page title
- Artwork information
- Image sources
- Fragment images
- Video sources
- Navigation links

See `HOW_TO_ADD_ARTWORKS.md` for detailed step-by-step instructions.

## 🎨 Customization

### Colors (in css/styles.css)
```css
:root {
    --primary-color: #2C2C2C;    /* Dark text */
    --secondary-color: #F8F6F0;  /* Background */
    --accent-color: #D4AF37;     /* Gold accent */
    --frame-color: #8B4513;      /* Baguette frames */
}
```

### Typography
- Headers: Playfair Display (serif)
- Body: Inter (sans-serif)
- Fonts loaded from Google Fonts

### Layout
- Mosaic view: CSS columns for natural flow
- Standard view: CSS Grid for uniform layout
- Responsive breakpoints: 480px, 768px, 1200px

## 🌐 Deployment Options

### Static Hosting Services
- **Netlify**: Drag & drop the folder
- **Vercel**: Connect to Git repository
- **GitHub Pages**: Push to GitHub repository
- **Firebase Hosting**: `firebase deploy`

### Traditional Web Hosting
1. Compress the entire folder to ZIP
2. Upload to your web hosting service
3. Extract in the public_html or www folder

### CDN Deployment
- **AWS S3 + CloudFront**
- **Google Cloud Storage**
- **Azure Static Web Apps**

## 🔧 Technical Details

### Browser Support
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### Performance Features
- Lazy loading images
- CSS animations for smooth interactions
- Optimized file structure
- Mobile-first responsive design

### Accessibility
- Semantic HTML structure
- Keyboard navigation support
- Alt text for all images
- ARIA labels for interactive elements

## 🎯 SEO Optimization

### Meta Tags
Each page includes:
- Title tags
- Meta descriptions
- Viewport settings
- Open Graph tags (ready for social sharing)

### Structure
- Semantic HTML5 elements
- Proper heading hierarchy
- Clean URL structure
- Fast loading times

## 🛠️ Troubleshooting

### Images Not Loading
- Check file names match exactly (case-sensitive)
- Ensure images are in the correct folders
- Use a local web server (not file:// protocol)

### CSS/JS Not Working
- Verify you're using a web server
- Check browser console for errors
- Ensure all file paths are correct

### Mobile Issues
- Test on actual devices
- Use browser developer tools
- Check touch event handling

### Performance Issues
- Optimize image sizes (recommended: under 500KB each)
- Compress videos (recommended: under 50MB each)
- Use WebP format for better compression

## 📞 Support

### File Issues
1. Check the `HOW_TO_ADD_ARTWORKS.md` guide
2. Verify file naming conventions
3. Test with sample images first

### Technical Issues
1. Use browser developer tools (F12)
2. Check console for error messages
3. Test in different browsers

### Deployment Issues
1. Verify all files are uploaded
2. Check hosting service documentation
3. Test locally first

## 🎨 Design Philosophy

This website balances artistic presentation with functional usability:

- **Mosaic View**: Preserves the artistic integrity of each piece
- **Standard View**: Provides organized, professional presentation
- **Individual Pages**: Offer detailed exploration of each artwork
- **Responsive Design**: Ensures accessibility across all devices

The design celebrates the beauty of horses and flowers while providing a professional platform for showcasing artistic work.

## 📄 License

This website template is provided for personal and commercial use. Feel free to modify and customize as needed for your artistic portfolio.

---

**Ready to showcase your art to the world!** 🎨✨

