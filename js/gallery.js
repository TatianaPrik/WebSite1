// Gallery View Toggle Functionality
document.addEventListener('DOMContentLoaded', () => {
    const viewToggleButtons = document.querySelectorAll('.view-toggle');
    const mosaicView = document.getElementById('mosaic-gallery');
    const standardView = document.getElementById('standard-gallery');

    if (viewToggleButtons.length > 0 && mosaicView && standardView) {
        viewToggleButtons.forEach(button => {
            button.addEventListener('click', () => {
                const viewType = button.getAttribute('data-view');
                
                // Remove active class from all buttons
                viewToggleButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');
                
                // Hide all gallery views
                mosaicView.classList.remove('active');
                standardView.classList.remove('active');
                
                // Show selected view
                if (viewType === 'mosaic') {
                    mosaicView.classList.add('active');
                    // Trigger masonry layout recalculation if needed
                    setTimeout(() => {
                        window.dispatchEvent(new Event('resize'));
                    }, 100);
                } else if (viewType === 'standard') {
                    standardView.classList.add('active');
                }
                
                // Save user preference
                localStorage.setItem('preferredGalleryView', viewType);
            });
        });

        // Load user preference on page load
        const savedView = localStorage.getItem('preferredGalleryView');
        if (savedView) {
            const savedButton = document.querySelector(`[data-view="${savedView}"]`);
            if (savedButton) {
                savedButton.click();
            }
        }
    }

    // Enhanced artwork hover effects for gallery
    const artworkItems = document.querySelectorAll('.artwork-item, .standard-item');
    
    artworkItems.forEach(item => {
        // Add click animation
        item.addEventListener('click', () => {
            item.style.transform = 'scale(0.95)';
            setTimeout(() => {
                item.style.transform = '';
            }, 150);
        });

        // Add keyboard navigation support
        item.setAttribute('tabindex', '0');
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                item.click();
            }
        });
    });

    // Lazy loading for images in gallery
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });

    // Observe all images with data-src attribute
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });

    // Gallery search/filter functionality (if needed in future)
    const searchInput = document.getElementById('gallery-search');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const allArtworks = document.querySelectorAll('.artwork-item, .standard-item');
            
            allArtworks.forEach(item => {
                const title = item.querySelector('h3').textContent.toLowerCase();
                const description = item.querySelector('p').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }

    // Masonry layout adjustment for mosaic view
    function adjustMasonryLayout() {
        if (mosaicView && mosaicView.classList.contains('active')) {
            // Force reflow for proper masonry layout
            const items = mosaicView.querySelectorAll('.artwork-item');
            items.forEach(item => {
                item.style.breakInside = 'avoid';
                item.style.pageBreakInside = 'avoid';
            });
        }
    }

    // Adjust layout on window resize
    window.addEventListener('resize', adjustMasonryLayout);
    
    // Initial layout adjustment
    setTimeout(adjustMasonryLayout, 500);
});

