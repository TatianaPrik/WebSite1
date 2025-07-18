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

    // ========================================
    // VIDEO FUNCTIONALITY - NEW SECTION
    // ========================================
    
    const videoContainer = document.querySelector('.video-container');
    const video = document.querySelector('.video-container video');
    const fullscreenBtn = document.querySelector('.fullscreen-btn');
    
    if (video && videoContainer) {
        // Video play/pause functionality with play icon management
        video.addEventListener('play', () => {
            videoContainer.classList.add('playing');
            console.log('Video started playing');
        });
        
        video.addEventListener('pause', () => {
            videoContainer.classList.remove('playing');
            console.log('Video paused');
        });
        
        video.addEventListener('ended', () => {
            videoContainer.classList.remove('playing');
            console.log('Video ended');
        });
        
        // Video loading events
        video.addEventListener('loadedmetadata', () => {
            console.log('Video metadata loaded successfully');
        });
        
        video.addEventListener('loadeddata', () => {
            console.log('Video data loaded successfully');
        });
        
        video.addEventListener('error', (e) => {
            console.error('Video failed to load:', e);
            // Show error message to user
            const errorMsg = document.createElement('div');
            errorMsg.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                color: white;
                background: rgba(255, 0, 0, 0.8);
                padding: 1rem;
                border-radius: 5px;
                text-align: center;
                z-index: 10;
            `;
            errorMsg.textContent = 'Ошибка загрузки видео. Проверьте путь к файлу.';
            videoContainer.appendChild(errorMsg);
        });
        
        // Fullscreen functionality
        if (fullscreenBtn) {
            fullscreenBtn.addEventListener('click', () => {
                toggleFullscreen();
            });
        }
        
        // Double-click on video for fullscreen
        video.addEventListener('dblclick', () => {
            toggleFullscreen();
        });
        
        function toggleFullscreen() {
            if (!document.fullscreenElement) {
                // Enter fullscreen
                if (videoContainer.requestFullscreen) {
                    videoContainer.requestFullscreen();
                } else if (videoContainer.webkitRequestFullscreen) {
                    videoContainer.webkitRequestFullscreen();
                } else if (videoContainer.msRequestFullscreen) {
                    videoContainer.msRequestFullscreen();
                }
            } else {
                // Exit fullscreen
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            }
        }
        
        // Fullscreen change events
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
        document.addEventListener('msfullscreenchange', handleFullscreenChange);
        
        function handleFullscreenChange() {
            if (document.fullscreenElement === videoContainer || 
                document.webkitFullscreenElement === videoContainer ||
                document.msFullscreenElement === videoContainer) {
                // Entered fullscreen
                videoContainer.classList.add('fullscreen-active');
                if (fullscreenBtn) {
                    fullscreenBtn.textContent = 'Exit Fullscreen';
                }
            } else {
                // Exited fullscreen
                videoContainer.classList.remove('fullscreen-active');
                if (fullscreenBtn) {
                    fullscreenBtn.textContent = 'Full Screen';
                }
            }
        }
        
        // Keyboard controls for video
        document.addEventListener('keydown', (e) => {
            // Only if video is focused or fullscreen
            if (document.fullscreenElement === videoContainer || e.target === video) {
                switch(e.key) {
                    case ' ':
                    case 'k':
                        e.preventDefault();
                        if (video.paused) {
                            video.play();
                        } else {
                            video.pause();
                        }
                        break;
                    case 'f':
                        e.preventDefault();
                        toggleFullscreen();
                        break;
                    case 'Escape':
                        if (document.fullscreenElement) {
                            e.preventDefault();
                            toggleFullscreen();
                        }
                        break;
                    case 'ArrowLeft':
                        e.preventDefault();
                        video.currentTime = Math.max(0, video.currentTime - 10);
                        break;
                    case 'ArrowRight':
                        e.preventDefault();
                        video.currentTime = Math.min(video.duration, video.currentTime + 10);
                        break;
                    case 'ArrowUp':
                        e.preventDefault();
                        video.volume = Math.min(1, video.volume + 0.1);
                        break;
                    case 'ArrowDown':
                        e.preventDefault();
                        video.volume = Math.max(0, video.volume - 0.1);
                        break;
                    case 'm':
                        e.preventDefault();
                        video.muted = !video.muted;
                        break;
                }
            }
        });
        
        // Click on video container to play/pause (but not on controls)
        videoContainer.addEventListener('click', (e) => {
            // Don't trigger if clicking on video controls or fullscreen button
            if (e.target === video || e.target === videoContainer) {
                if (video.paused) {
                    video.play();
                } else {
                    video.pause();
                }
            }
        });
        
        // Progress indicator on video hover (optional enhancement)
        let progressIndicator = null;
        
        video.addEventListener('timeupdate', () => {
            if (progressIndicator && video.duration) {
                const progress = (video.currentTime / video.duration) * 100;
                progressIndicator.style.width = progress + '%';
            }
        });
        
        // Create progress indicator on hover
        videoContainer.addEventListener('mouseenter', () => {
            if (!progressIndicator && video.duration) {
                progressIndicator = document.createElement('div');
                progressIndicator.style.cssText = `
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    height: 3px;
                    background: var(--accent-color, #D4AF37);
                    transition: width 0.1s ease;
                    z-index: 5;
                    pointer-events: none;
                `;
                videoContainer.appendChild(progressIndicator);
                
                // Set initial progress
                const progress = (video.currentTime / video.duration) * 100;
                progressIndicator.style.width = progress + '%';
            }
        });
        
        videoContainer.addEventListener('mouseleave', () => {
            if (progressIndicator) {
                videoContainer.removeChild(progressIndicator);
                progressIndicator = null;
            }
        });
    }

    // Keyboard navigation for artwork pages
    document.addEventListener('keydown', (e) => {
        // Only if not focused on input elements and not in fullscreen video
        if (e.target.tagName !== 'INPUT' && 
            e.target.tagName !== 'TEXTAREA' && 
            !document.fullscreenElement) {
            
            const prevLink = document.querySelector('.nav-artwork[href*="artwork-6"]');
            const nextLink = document.querySelector('.nav-artwork[href*="artwork-2"]');
            
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

