#!/usr/bin/env python3
"""
Script to update all artwork HTML files with correct titles, image sources, and navigation
"""

import os
import re

# Artwork data
artworks = [
    {"id": 1, "title": "Grace in Motion", "medium": "Oil on Canvas", "year": "2023", "dimensions": "24\" x 36\"", "description": "This piece captures the ethereal beauty and grace of a white horse in motion. The flowing mane and powerful stance represent the perfect harmony between strength and elegance that defines these magnificent creatures."},
    {"id": 2, "title": "Golden Hour Majesty", "medium": "Acrylic on Canvas", "year": "2023", "dimensions": "30\" x 40\"", "description": "Captured during the magical golden hour, this piece showcases a magnificent horse bathed in warm, amber light. The interplay of light and shadow creates a dramatic atmosphere that emphasizes the noble bearing and natural beauty of this majestic creature."},
    {"id": 3, "title": "Freedom", "medium": "Mixed Media", "year": "2022", "dimensions": "28\" x 42\"", "description": "A powerful representation of unbridled freedom, this artwork captures a horse in full gallop across an open field. The dynamic brushstrokes and bold colors convey the raw energy and spirit of these magnificent animals."},
    {"id": 4, "title": "Summer Bloom", "medium": "Watercolor", "year": "2023", "dimensions": "16\" x 20\"", "description": "Delicate watercolor techniques bring this vibrant dahlia to life, showcasing the intricate layers of petals and the subtle gradations of color that make each flower unique and beautiful."},
    {"id": 5, "title": "Golden Petals", "medium": "Oil on Canvas", "year": "2022", "dimensions": "18\" x 24\"", "description": "Rich golden hues dominate this stunning floral composition, where each petal seems to glow with inner light. The careful attention to texture and form creates a sense of warmth and vitality."},
    {"id": 6, "title": "Exotic Beauty", "medium": "Acrylic on Canvas", "year": "2023", "dimensions": "20\" x 30\"", "description": "An exotic orchid takes center stage in this elegant composition, its purple petals rendered with exquisite detail and subtle color variations that highlight the flower's natural sophistication."},
    {"id": 7, "title": "Wild Spirit", "medium": "Oil on Canvas", "year": "2023", "dimensions": "32\" x 48\"", "description": "The untamed spirit of a wild mustang is captured in this dynamic painting, where bold brushstrokes and earthy tones convey the raw power and freedom of these magnificent creatures."},
    {"id": 8, "title": "Morning Dew", "medium": "Watercolor", "year": "2022", "dimensions": "14\" x 18\"", "description": "Delicate morning dew drops cling to flower petals in this ethereal watercolor, creating a sense of freshness and new beginnings that speaks to the beauty of nature's daily renewal."},
    {"id": 9, "title": "Stallion's Pride", "medium": "Mixed Media", "year": "2023", "dimensions": "36\" x 48\"", "description": "A proud stallion stands majestically in this mixed media masterpiece, combining traditional painting techniques with modern elements to create a timeless portrait of equine nobility."},
    {"id": 10, "title": "Rose Garden", "medium": "Oil on Canvas", "year": "2022", "dimensions": "22\" x 28\"", "description": "A lush garden of roses blooms across this canvas, each flower carefully rendered to show the unique character and beauty that makes roses the eternal symbol of love and beauty."},
    {"id": 11, "title": "Midnight Runner", "medium": "Acrylic on Canvas", "year": "2023", "dimensions": "30\" x 45\"", "description": "Under the cover of darkness, a horse moves like a shadow across the landscape. This dramatic piece uses deep blues and blacks to create an atmosphere of mystery and power."},
    {"id": 12, "title": "Tulip Dreams", "medium": "Watercolor", "year": "2023", "dimensions": "16\" x 22\"", "description": "Soft, dreamy tulips dance across this watercolor canvas, their gentle curves and pastel colors creating a sense of spring's eternal promise and renewal."},
    {"id": 13, "title": "Desert Wind", "medium": "Oil on Canvas", "year": "2022", "dimensions": "28\" x 40\"", "description": "A horse moves through the desert landscape, its mane flowing in the wind. The warm earth tones and dramatic lighting capture the harsh beauty of the desert environment."},
    {"id": 14, "title": "Sunflower Field", "medium": "Mixed Media", "year": "2023", "dimensions": "24\" x 36\"", "description": "Bright, cheerful sunflowers stretch toward the sky in this uplifting composition, their golden faces radiating warmth and joy across the canvas."},
    {"id": 15, "title": "Thunder's Call", "medium": "Acrylic on Canvas", "year": "2022", "dimensions": "34\" x 50\"", "description": "The power of thunder seems to echo through this dramatic horse portrait, where stormy skies and dynamic poses create an atmosphere of raw natural energy."},
    {"id": 16, "title": "Lily Pond", "medium": "Watercolor", "year": "2023", "dimensions": "18\" x 24\"", "description": "Serene water lilies float peacefully on a tranquil pond, their pure white petals reflecting the calm beauty of nature's most peaceful moments."},
    {"id": 17, "title": "Mountain Mustang", "medium": "Oil on Canvas", "year": "2023", "dimensions": "30\" x 42\"", "description": "Against the backdrop of majestic mountains, a wild mustang embodies the spirit of the American West, its powerful form silhouetted against the dramatic landscape."},
    {"id": 18, "title": "Cherry Blossom", "medium": "Mixed Media", "year": "2022", "dimensions": "20\" x 26\"", "description": "Delicate cherry blossoms create a cloud of pink and white across this canvas, capturing the fleeting beauty of spring's most celebrated flowering."},
    {"id": 19, "title": "Gentle Giant", "medium": "Acrylic on Canvas", "year": "2023", "dimensions": "28\" x 38\"", "description": "Despite its impressive size and strength, this gentle draft horse radiates kindness and wisdom, its soft eyes telling stories of years spent in partnership with humans."},
    {"id": 20, "title": "Iris Garden", "medium": "Watercolor", "year": "2023", "dimensions": "16\" x 20\"", "description": "Elegant irises stand tall in this watercolor garden, their regal purple petals and graceful forms creating a composition of natural aristocracy and beauty."}
]

def update_artwork_file(artwork_data):
    """Update an individual artwork HTML file with correct content"""
    filename = f"/home/ubuntu/artist-website-v2/artwork-{artwork_data['id']}.html"
    
    # Read the template file
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Update title tag
    content = re.sub(r'<title>.*?</title>', f'<title>{artwork_data["title"]} - TP Art</title>', content)
    
    # Update main heading
    content = re.sub(r'<h1>.*?</h1>', f'<h1>{artwork_data["title"]}</h1>', content)
    
    # Update image source
    content = re.sub(r'src="images/main/horse1\.jpg"', f'src="images/artwork-{artwork_data["id"]}.jpg"', content)
    content = re.sub(r'alt="Grace in Motion"', f'alt="{artwork_data["title"]}"', content)
    
    # Update artwork details
    content = re.sub(r'<p><strong>Materials:</strong>.*?</p>', f'<p><strong>Materials:</strong> {artwork_data["medium"]}</p>', content)
    content = re.sub(r'<p><strong>Year:</strong>.*?</p>', f'<p><strong>Year:</strong> {artwork_data["year"]}</p>', content)
    content = re.sub(r'<p><strong>Dimensions:</strong>.*?</p>', f'<p><strong>Dimensions:</strong> {artwork_data["dimensions"]}</p>', content)
    
    # Update description
    desc_pattern = r'<div class="artwork-description">\s*<p>.*?</p>\s*</div>'
    new_desc = f'<div class="artwork-description">\n                            <p>{artwork_data["description"]}</p>\n                        </div>'
    content = re.sub(desc_pattern, new_desc, content, flags=re.DOTALL)
    
    # Update fragment image sources
    for i in range(1, 6):
        old_pattern = f'src="images/fragments/horse1-fragment{i}\.jpg"'
        new_pattern = f'src="images/fragments/artwork-{artwork_data["id"]}-fragment{i}.jpg"'
        content = re.sub(old_pattern, new_pattern, content)
    
    # Update video sources
    content = re.sub(r'poster="images/thumbnails/horse1-video-poster\.jpg"', f'poster="images/thumbnails/artwork-{artwork_data["id"]}-video-poster.jpg"', content)
    content = re.sub(r'src="videos/horse1-process\.mp4"', f'src="videos/artwork-{artwork_data["id"]}-process.mp4"', content)
    content = re.sub(r'src="videos/horse1-process\.webm"', f'src="videos/artwork-{artwork_data["id"]}-process.webm"', content)
    
    # Update navigation links
    prev_id = artwork_data["id"] - 1 if artwork_data["id"] > 1 else 20
    next_id = artwork_data["id"] + 1 if artwork_data["id"] < 20 else 1
    
    content = re.sub(r'href="artwork-6\.html"', f'href="artwork-{prev_id}.html"', content)
    content = re.sub(r'href="artwork-2\.html"', f'href="artwork-{next_id}.html"', content)
    
    # Write the updated content back
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"Updated artwork-{artwork_data['id']}.html")

# Update all artwork files
for artwork in artworks:
    update_artwork_file(artwork)

print("All artwork files have been updated successfully!")

