// Artwork Page Functionality
document.addEventListener('DOMContentLoaded', () => {
    const mainImage = document.getElementById('main-artwork-image');
    const zoomInBtn = document.getElementById('zoom-in');
    const zoomOutBtn = document.getElementById('zoom-out');
    const zoomResetBtn = document.getElementById('zoom-reset');
    const imageContainer = document.querySelector('.main-image-container');
    
    let currentZoom = 1;
    const zoomStep = 0.2;
    const maxZoom = 3;
    const minZoom = 0.5;
    
    // Pan variables
    let isPanning = false;
    let startX = 0;
    let startY = 0;
    let translateX = 0;
    let translateY = 0;
    let lastTranslateX = 0;
    let lastTranslateY = 0;

    // Zoom functionality - ONLY buttons for desktop
    if (mainImage && zoomInBtn && zoomOutBtn && zoomResetBtn) {
        zoomInBtn.addEventListener('click', () => {
            if (currentZoom < maxZoom) {
                currentZoom += zoomStep;
                updateImageTransform();
            }
        });

        zoomOutBtn.addEventListener('click', () => {
            if (currentZoom > minZoom) {
                currentZoom -= zoomStep;
                updateImageTransform();
            }
        });

        zoomResetBtn.addEventListener('click', () => {
            currentZoom = 1;
            translateX = 0;
            translateY = 0;
            lastTranslateX = 0;
            lastTranslateY = 0;
            updateImageTransform();
        });

        function updateImageTransform() {
            // Constrain translation when zoomed
            if (currentZoom > 1) {
                const containerRect = imageContainer.getBoundingClientRect();
                const imageRect = mainImage.getBoundingClientRect();
                
                const maxTranslateX = Math.max(0, (imageRect.width * currentZoom - containerRect.width) / 2);
                const maxTranslateY = Math.max(0, (imageRect.height * currentZoom - containerRect.height) / 2);
                
                translateX = Math.max(-maxTranslateX, Math.min(maxTranslateX, translateX));
                translateY = Math.max(-maxTranslateY, Math.min(maxTranslateY, translateY));
            } else {
                translateX = 0;
                translateY = 0;
            }
            
            mainImage.style.transform = `scale(${currentZoom}) translate(${translateX}px, ${translateY}px)`;
            
            // Update button states
            zoomInBtn.disabled = currentZoom >= maxZoom;
            zoomOutBtn.disabled = currentZoom <= minZoom;
            
            // Visual feedback for disabled buttons
            zoomInBtn.style.opacity = currentZoom >= maxZoom ? '0.5' : '1';
            zoomOutBtn.style.opacity = currentZoom <= minZoom ? '0.5' : '1';
            
            // Enable/disable panning based on zoom
            imageContainer.style.cursor = currentZoom > 1 ? 'grab' : 'default';
        }

        // DESKTOP: Mouse drag functionality
        if (imageContainer) {
            imageContainer.addEventListener('mousedown', (e) => {
                if (currentZoom > 1) {
                    isPanning = true;
                    startX = e.clientX - translateX;
                    startY = e.clientY - translateY;
                    imageContainer.style.cursor = 'grabbing';
                    e.preventDefault();
                }
            });

            document.addEventListener('mousemove', (e) => {
                if (isPanning && currentZoom > 1) {
                    translateX = e.clientX - startX;
                    translateY = e.clientY - startY;
                    updateImageTransform();
                }
            });

            document.addEventListener('mouseup', () => {
                if (isPanning) {
                    isPanning = false;
                    lastTranslateX = translateX;
                    lastTranslateY = translateY;
                    imageContainer.style.cursor = currentZoom > 1 ? 'grab' : 'default';
                }
            });
        }

        // MOBILE: Touch/pinch zoom and pan
        let initialDistance = 0;
        let initialZoom = 1;
        let touches = [];

        imageContainer.addEventListener('touchstart', (e) => {
            touches = Array.from(e.touches);
            
            if (touches.length === 2) {
                // Two finger pinch zoom
                initialDistance = getDistance(touches[0], touches[1]);
                initialZoom = currentZoom;
                e.preventDefault();
            } else if (touches.length === 1 && currentZoom > 1) {
                // Single finger pan (only when zoomed)
                isPanning = true;
                startX = touches[0].clientX - translateX;
                startY = touches[0].clientY - translateY;
                e.preventDefault();
            }
        });

        imageContainer.addEventListener('touchmove', (e) => {
            touches = Array.from(e.touches);
            
            if (touches.length === 2) {
                // Pinch zoom
                e.preventDefault();
                const currentDistance = getDistance(touches[0], touches[1]);
                const scale = currentDistance / initialDistance;
                const newZoom = Math.max(minZoom, Math.min(maxZoom, initialZoom * scale));
                
                currentZoom = newZoom;
                updateImageTransform();
            } else if (touches.length === 1 && isPanning && currentZoom > 1) {
                // Pan
                e.preventDefault();
                translateX = touches[0].clientX - startX;
                translateY = touches[0].clientY - startY;
                updateImageTransform();
            }
        });

        imageContainer.addEventListener('touchend', (e) => {
            if (isPanning) {
                isPanning = false;
                lastTranslateX = translateX;
                lastTranslateY = translateY;
            }
            
            // Reset if no touches
            if (e.touches.length === 0) {
                touches = [];
            }
        });

        function getDistance(touch1, touch2) {
            const dx = touch1.clientX - touch2.clientX;
            const dy = touch1.clientY - touch2.clientY;
            return Math.sqrt(dx * dx + dy * dy);
        }

        // Prevent context menu on long press (mobile)
        imageContainer.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        });

        // Prevent default drag behavior
        mainImage.addEventListener('dragstart', (e) => {
            e.preventDefault();
        });
    }

    // Fragment image interactions
    const fragmentItems = document.querySelectorAll('.fragment-item');
    fragmentItems.forEach(fragment => {
        fragment.addEventListener('click', () => {
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
        video.addEventListener('loadedmetadata', () => {
            console.log('Video loaded successfully');
        });
        
        video.addEventListener('error', () => {
            console.log('Video failed to load');
        });
    }

    // Keyboard navigation for artwork pages
    document.addEventListener('keydown', (e) => {
        // Only if not focused on input elements
        if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
            const prevLink = document.querySelector('.nav-artwork.prev');
            const nextLink = document.querySelector('.nav-artwork.next');
            
            if (e.key === 'ArrowLeft' && prevLink) {
                window.location.href = prevLink.href;
            } else if (e.key === 'ArrowRight' && nextLink) {
                window.location.href = nextLink.href;
            }
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

