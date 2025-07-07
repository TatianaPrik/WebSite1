// Artwork Page Functionality
document.addEventListener('DOMContentLoaded', () => {
    const mainImage = document.getElementById('main-artwork-image');
    const zoomInBtn = document.getElementById('zoom-in');
    const zoomOutBtn = document.getElementById('zoom-out');
    const zoomResetBtn = document.getElementById('zoom-reset');
    
    let currentZoom = 1;
    const zoomStep = 0.2;
    const maxZoom = 3;
    const minZoom = 0.5;

    // Zoom functionality
    if (mainImage && zoomInBtn && zoomOutBtn && zoomResetBtn) {
        zoomInBtn.addEventListener('click', () => {
            if (currentZoom < maxZoom) {
                currentZoom += zoomStep;
                updateImageZoom();
            }
        });

        zoomOutBtn.addEventListener('click', () => {
            if (currentZoom > minZoom) {
                currentZoom -= zoomStep;
                updateImageZoom();
            }
        });

        zoomResetBtn.addEventListener('click', () => {
            currentZoom = 1;
            updateImageZoom();
        });

        function updateImageZoom() {
            mainImage.style.transform = `scale(${currentZoom})`;
            
            // Update button states
            zoomInBtn.disabled = currentZoom >= maxZoom;
            zoomOutBtn.disabled = currentZoom <= minZoom;
            
            // Add visual feedback for disabled buttons
            if (currentZoom >= maxZoom) {
                zoomInBtn.style.opacity = '0.5';
            } else {
                zoomInBtn.style.opacity = '1';
            }
            
            if (currentZoom <= minZoom) {
                zoomOutBtn.style.opacity = '0.5';
            } else {
                zoomOutBtn.style.opacity = '1';
            }
        }

        // Mouse wheel zoom
        const imageContainer = document.querySelector('.main-image-container');
        if (imageContainer) {
            imageContainer.addEventListener('wheel', (e) => {
                e.preventDefault();
                
                if (e.deltaY < 0 && currentZoom < maxZoom) {
                    // Zoom in
                    currentZoom += zoomStep;
                    updateImageZoom();
                } else if (e.deltaY > 0 && currentZoom > minZoom) {
                    // Zoom out
                    currentZoom -= zoomStep;
                    updateImageZoom();
                }
            });
        }

        // Touch/pinch zoom for mobile
        let initialDistance = 0;
        let initialZoom = 1;

        imageContainer.addEventListener('touchstart', (e) => {
            if (e.touches.length === 2) {
                initialDistance = getDistance(e.touches[0], e.touches[1]);
                initialZoom = currentZoom;
            }
        });

        imageContainer.addEventListener('touchmove', (e) => {
            if (e.touches.length === 2) {
                e.preventDefault();
                const currentDistance = getDistance(e.touches[0], e.touches[1]);
                const scale = currentDistance / initialDistance;
                const newZoom = Math.max(minZoom, Math.min(maxZoom, initialZoom * scale));
                
                currentZoom = newZoom;
                updateImageZoom();
            }
        });

        function getDistance(touch1, touch2) {
            const dx = touch1.clientX - touch2.clientX;
            const dy = touch1.clientY - touch2.clientY;
            return Math.sqrt(dx * dx + dy * dy);
        }
    }

    // Fragment image interactions
    const fragmentItems = document.querySelectorAll('.fragment-item');
    fragmentItems.forEach(fragment => {
        fragment.addEventListener('click', () => {
            // Create lightbox for fragment
            createFragmentLightbox(fragment.querySelector('img'));
        });
    });

    // Fragment lightbox functionality
    function createFragmentLightbox(img) {
        const lightbox = document.createElement('div');
        lightbox.className = 'fragment-lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <img src="${img.src}" alt="${img.alt}">
                <button class="lightbox-close">&times;</button>
            </div>
        `;
        
        // Add lightbox styles
        lightbox.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        const content = lightbox.querySelector('.lightbox-content');
        content.style.cssText = `
            position: relative;
            max-width: 90%;
            max-height: 90%;
        `;
        
        const lightboxImg = lightbox.querySelector('img');
        lightboxImg.style.cssText = `
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
        `;
        
        const closeBtn = lightbox.querySelector('.lightbox-close');
        closeBtn.style.cssText = `
            position: absolute;
            top: -40px;
            right: -40px;
            background: none;
            border: none;
            color: white;
            font-size: 2rem;
            cursor: pointer;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        
        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';
        
        // Fade in
        setTimeout(() => {
            lightbox.style.opacity = '1';
        }, 10);
        
        // Close functionality
        function closeLightbox() {
            lightbox.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(lightbox);
                document.body.style.overflow = 'auto';
            }, 300);
        }
        
        closeBtn.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
        
        // Keyboard support
        document.addEventListener('keydown', function escHandler(e) {
            if (e.key === 'Escape') {
                closeLightbox();
                document.removeEventListener('keydown', escHandler);
            }
        });
    }

    // Video controls enhancement
    const video = document.querySelector('.video-container video');
    if (video) {
        // Add custom video controls or enhancements here
        video.addEventListener('loadedmetadata', () => {
            console.log('Video loaded successfully');
        });
        
        video.addEventListener('error', () => {
            console.log('Video failed to load');
            // Could add fallback or error message here
        });
    }

    // Keyboard navigation for artwork pages
    document.addEventListener('keydown', (e) => {
        const prevLink = document.querySelector('.nav-artwork.prev');
        const nextLink = document.querySelector('.nav-artwork.next');
        
        if (e.key === 'ArrowLeft' && prevLink) {
            window.location.href = prevLink.href;
        } else if (e.key === 'ArrowRight' && nextLink) {
            window.location.href = nextLink.href;
        }
    });

    // Smooth scroll to sections within artwork page
    const artworkSections = document.querySelectorAll('.fragments-section, .video-section');
    artworkSections.forEach(section => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // Initial state
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        observer.observe(section);
    });
});

