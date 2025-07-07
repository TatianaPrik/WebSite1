// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(248, 246, 240, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            navbar.style.background = 'rgba(248, 246, 240, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.05)';
        }
    }
});

// Artwork item click handlers
document.addEventListener('DOMContentLoaded', () => {
    // Handle artwork clicks to navigate to individual pages
    const artworkItems = document.querySelectorAll('.artwork-item, .standard-item');
    
    artworkItems.forEach(item => {
        item.addEventListener('click', () => {
            const artworkId = item.getAttribute('data-artwork');
            if (artworkId) {
                window.location.href = `artwork-${artworkId}.html`;
            }
        });
    });

    // Add hover effects for better UX
    artworkItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.cursor = 'pointer';
        });
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const elementsToObserve = document.querySelectorAll('.artwork-item, .standard-item, .about-content, .contact-content');
    elementsToObserve.forEach(el => {
        observer.observe(el);
    });
});

// Utility function to handle image loading errors
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            // Create a placeholder div if image fails to load
            const placeholder = document.createElement('div');
            placeholder.style.width = '100%';
            placeholder.style.height = this.style.height || '300px';
            placeholder.style.backgroundColor = '#f0f0f0';
            placeholder.style.display = 'flex';
            placeholder.style.alignItems = 'center';
            placeholder.style.justifyContent = 'center';
            placeholder.style.color = '#999';
            placeholder.style.fontSize = '14px';
            placeholder.textContent = 'Image placeholder';
            placeholder.style.borderRadius = '8px';
            
            this.parentNode.replaceChild(placeholder, this);
        });
    });
});

