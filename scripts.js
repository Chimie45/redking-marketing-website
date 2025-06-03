// Store slide indexes for each gallery slideshow
let gallerySlideIndexes = {
    'gallery5': 1
    // Add other gallery IDs here if they become slideshows
};

// Gallery modal functions (modified to include slideshow logic)
function openGalleryModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) {
        console.error('Modal not found:', modalId);
        return;
    }
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    const video = modal.querySelector('video');
    if (video) {
        video.currentTime = 0;
        video.play().catch(e => console.log('Video autoplay prevented by browser:', e));
    }

    // If the modal is a slideshow, initialize it
    if (modalId === 'gallery5') { // Check if it's our specific slideshow
        // Ensure the slide index is reset or set to 1 when opening
        gallerySlideIndexes[modalId] = 1; 
        showGallerySlide(gallerySlideIndexes[modalId], modalId);
    }
}

function closeGalleryModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) {
        console.error('Modal not found for closing:', modalId);
        return;
    }
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    const video = modal.querySelector('video');
    if (video) {
        video.pause();
        video.currentTime = 0;
    }
    // No specific action needed for slideshow on close, as slides are just hidden/shown
}

// Slideshow specific functions
function plusSlides(n, galleryId) {
    // gallerySlideIndexes[galleryId] is already updated by showGallerySlide if it goes out of bounds
    showGallerySlide(gallerySlideIndexes[galleryId] += n, galleryId);
}

function currentGallerySlide(n, galleryId) {
    showGallerySlide(gallerySlideIndexes[galleryId] = n, galleryId);
}

function showGallerySlide(n, galleryId) {
    let i;
    const slideshowContainer = document.getElementById(galleryId + '-slideshow');
    // It's possible this function is called for a modal that isn't a slideshow,
    // or before the slideshow elements are fully confirmed.
    if (!slideshowContainer) {
        // This is not an error if the modal is not a slideshow (e.g. gallery1, gallery2 etc.)
        // console.warn('Slideshow container not found for gallery:', galleryId);
        return; 
    }

    const slides = slideshowContainer.getElementsByClassName("gallery-slide");
    const dotsContainer = document.getElementById(galleryId + '-dots');
    let dots = [];
    if (dotsContainer) {
        dots = dotsContainer.getElementsByClassName("dot");
    }

    if (slides.length === 0) {
        // This would be an issue if slideshowContainer exists but has no slides.
        // console.warn('No slides found in slideshow container for gallery:', galleryId);
        return;
    }

    if (n > slides.length) { gallerySlideIndexes[galleryId] = 1 }
    if (n < 1) { gallerySlideIndexes[galleryId] = slides.length }
    
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    if (dots.length > 0) { // Check if dots exist
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
    }
    
    slides[gallerySlideIndexes[galleryId] - 1].style.display = "block";
    if (dots.length > 0) { // Check if dots exist
        dots[gallerySlideIndexes[galleryId] - 1].className += " active";
    }
}

// Portfolio modal functions
function openPortfolioModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) {
        console.error('Portfolio modal not found:', modalId);
        return;
    }
    const modalHeader = modal.querySelector('.portfolio-modal-header');
    const modalImg = modalHeader.querySelector('img');
    
    // Set the background image for the blur effect
    if (modalImg && modalImg.src) {
        modalHeader.style.backgroundImage = `url(${modalImg.src})`;
    } else if (modalImg) {
        console.warn('Portfolio modal image source not found for background blur:', modalId);
    } else {
        console.warn('Portfolio modal image not found for background blur:', modalId);
    }
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closePortfolioModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) {
        console.error('Portfolio modal not found for closing:', modalId);
        return;
    }
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modals when clicking outside of content
window.addEventListener('click', function(event) {
    if (event.target.classList.contains('gallery-modal')) {
        const modalId = event.target.id;
        // Check if the modal is actually displayed before trying to close it
        if (document.getElementById(modalId) && document.getElementById(modalId).style.display === 'block') {
            closeGalleryModal(modalId);
        }
    }
    
    if (event.target.classList.contains('portfolio-modal')) {
        // Check if the modal is actually displayed
        if (event.target.style.display === 'block') {
            event.target.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }
});

// Close modals with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        // Close gallery modals
        const galleryModals = document.querySelectorAll('.gallery-modal');
        galleryModals.forEach(modal => {
            if (modal.style.display === 'block') {
                closeGalleryModal(modal.id);
            }
        });
        
        // Close portfolio modals
        const portfolioModals = document.querySelectorAll('.portfolio-modal');
        portfolioModals.forEach(modal => {
            if (modal.style.display === 'block') {
                // Use the specific close function if available, otherwise just hide
                if (typeof closePortfolioModal === 'function') {
                    closePortfolioModal(modal.id);
                } else {
                    modal.style.display = 'none';
                }
            }
        });
        // Ensure body overflow is reset if any modal was closed
        if (document.querySelectorAll('.gallery-modal[style*="display: block"]').length === 0 &&
            document.querySelectorAll('.portfolio-modal[style*="display: block"]').length === 0) {
            document.body.style.overflow = 'auto';
        }
    }
});

// Contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        if (!data.name || !data.email || !data.message) {
            // Consider using a custom, non-blocking notification instead of alert
            console.warn('Form validation: Please fill in all required fields.');
            // Example: display a message in a specific div
            // document.getElementById('form-message').textContent = 'Please fill in all required fields.';
            return;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            console.warn('Form validation: Please enter a valid email address.');
            // document.getElementById('form-message').textContent = 'Please enter a valid email address.';
            return;
        }
        
        console.log('Form submitted (simulated):', data);
        // document.getElementById('form-message').textContent = 'Thank you for your message! We\'ll get back to you within 24 hours.';
        this.reset();
    });
} else {
    console.warn("Contact form with ID 'contactForm' not found.");
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        // Ensure it's a valid internal link and not just "#"
        if (href.length > 1 && href.startsWith('#')) {
            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start' 
                });
            }
        }
    });
});

// Mobile menu toggle
const mobileMenuIcon = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuIcon && navLinks) {
    mobileMenuIcon.addEventListener('click', function() {
        // Toggle a class on nav-links for display and on mobile-menu for active state
        navLinks.classList.toggle('nav-links--active'); // You'll need to define this class in CSS
        this.classList.toggle('active'); 
        
        // Example CSS for .nav-links--active:
        // .nav-links--active { display: flex; flex-direction: column; position: absolute; top: 70px; left:0; right:0; background: var(--black); padding: 1rem; gap: 1rem; }
        // Also, ensure .nav-links initial display is none for mobile in CSS if it's not already.
    });
} else {
    console.warn("Mobile menu icon or nav links not found.");
}


// Add scroll effect to navigation
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (nav) {
        if (window.scrollY > 100) {
            nav.classList.add('nav--scrolled'); // Define .nav--scrolled in CSS
            // nav.style.background = 'rgba(0, 0, 0, 0.95)';
            // nav.style.backdropFilter = 'blur(10px)';
        } else {
            nav.classList.remove('nav--scrolled');
            // nav.style.background = 'var(--black)';
            // nav.style.backdropFilter = 'none';
        }
    }
});
// CSS for .nav--scrolled:
// nav.nav--scrolled { background: rgba(0, 0, 0, 0.95); backdrop-filter: blur(10px); }


// Animate elements on scroll (only for below-the-fold content)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px' // Start animation a bit before fully in view
};

const animatedElementsObserver = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('element--in-view'); // Add a class to trigger animation
            
            // If you still want to animate numbers specifically when they come into view
            if (entry.target.classList.contains('metric-number')) { // Assuming numbers are in portfolio modals
                 // This logic might need adjustment if numbers are animated on modal open instead of scroll
                // animateValue(entry.target); // This was the original call
            }
            observer.unobserve(entry.target); // Animate only once
        }
    });
}, observerOptions);

// Apply observer to elements you want to animate
// Example: Portfolio cards (already in your HTML)
document.querySelectorAll('.portfolio-card, .service-card, .about-text > *, .client-logos, .gallery-item, .blog .service-card, .contact-info > *, .contact-form > *').forEach((el, index) => {
    el.style.opacity = '0'; // Initial state for fade-in
    el.style.transform = 'translateY(20px)'; // Initial state for slide-up
    // Apply a transition in CSS for .element--in-view
    // Example CSS: 
    // .element--in-view { opacity: 1; transform: translateY(0); transition: opacity 0.6s ease, transform 0.6s ease; }
    // You can add staggered delays using el.style.transitionDelay = `${index * 0.1}s`;
    // but it's often better to handle complex staggers with CSS or more specific JS.
    animatedElementsObserver.observe(el);
});
// CSS for animations:
// selector-for-animated-element { opacity: 0; transform: translateY(20px); transition: opacity 0.6s ease-out, transform 0.6s ease-out; }
// selector-for-animated-element.element--in-view { opacity: 1; transform: translateY(0); }


// Animate stat numbers (this function might be better called when modals open, rather than on scroll)
function animateValue(element) {
    const finalValueText = element.textContent;
    
    // Extract numeric part, handling '+' or '%'
    let numericPart = finalValueText.replace(/[^\d.-]/g, ''); // Get numbers, decimal, minus
    if (numericPart === '') return; // No number to animate

    const numericValue = parseFloat(numericPart);
    if (isNaN(numericValue)) return;

    const suffix = finalValueText.substring(numericPart.length); // Get suffix like '+', '%'
    
    const duration = 2000; // 2 seconds
    const frameDuration = 16; // approx 60fps
    const totalFrames = duration / frameDuration;
    const increment = numericValue / totalFrames;
    let currentValue = 0;
    
    element.textContent = (numericValue < 1 && numericValue > 0 ? '0' : '0') + suffix; // Start display at 0 or 0.0

    const timer = setInterval(() => {
        currentValue += increment;
        if ((increment > 0 && currentValue >= numericValue) || (increment < 0 && currentValue <= numericValue)) {
            currentValue = numericValue;
            clearInterval(timer);
        }
        
        // Format based on original precision if it was a decimal
        let displayValue;
        if (numericPart.includes('.')) {
            const decimalPlaces = (numericPart.split('.')[1] || '').length;
            displayValue = currentValue.toFixed(decimalPlaces);
        } else {
            displayValue = Math.floor(currentValue);
        }
        element.textContent = displayValue + suffix;

    }, frameDuration);
}

// Add loading state for images (error handling)
document.querySelectorAll('img').forEach(img => {
    if (!img.complete || img.naturalWidth === 0) { // Check if already loaded or broken
        img.addEventListener('error', function() {
            this.style.display = 'none'; // Or set a placeholder
            console.error('Failed to load image:', this.src);
        });
    }
});

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
    // Lazy load images (if you decide to implement data-src)
    const lazyImages = document.querySelectorAll('img[data-src]');
    if (lazyImages.length > 0) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        }, { threshold: 0.1 }); // Load when 10% visible
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // Example: If you want to animate numbers in portfolio modals when they open
    // You would call animateValue from within openPortfolioModal for each .metric-number
    // For example, inside openPortfolioModal, after modal.style.display = 'block';
    // const metricNumbers = modal.querySelectorAll('.metric-number');
    // metricNumbers.forEach(num => animateValue(num));
});
