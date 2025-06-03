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

    // Animate metric numbers when portfolio modal opens
    const metricNumbers = modal.querySelectorAll('.metric-number');
    metricNumbers.forEach(num => animateValue(num));
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
            // event.target.style.display = 'none'; // Handled by closePortfolioModal
            closePortfolioModal(event.target.id); // Use the specific close function
            document.body.style.overflow = 'auto';
        }
    }
});

// Close modals with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        let aModalWasOpen = false;
        // Close gallery modals
        const galleryModals = document.querySelectorAll('.gallery-modal');
        galleryModals.forEach(modal => {
            if (modal.style.display === 'block') {
                closeGalleryModal(modal.id);
                aModalWasOpen = true;
            }
        });
        
        // Close portfolio modals
        const portfolioModals = document.querySelectorAll('.portfolio-modal');
        portfolioModals.forEach(modal => {
            if (modal.style.display === 'block') {
                closePortfolioModal(modal.id);
                aModalWasOpen = true;
            }
        });
        
        if (aModalWasOpen) {
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
        alert('Thank you for your message! We\'ll get back to you within 24 hours.'); // Kept alert as per original
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
                // Also close mobile menu if open
                if (navLinks && navLinks.classList.contains('nav-links--active')) {
                    navLinks.classList.remove('nav-links--active');
                    if (mobileMenuIcon) mobileMenuIcon.classList.remove('active');
                }
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
        navLinks.classList.toggle('nav-links--active'); 
        this.classList.toggle('active'); 
    });
} else {
    console.warn("Mobile menu icon or nav links not found.");
}


// Add scroll effect to navigation
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (nav) {
        if (window.scrollY > 100) {
            nav.classList.add('nav--scrolled'); 
        } else {
            nav.classList.remove('nav--scrolled');
        }
    }
});


// Animate elements on scroll (only for below-the-fold content)
const observerOptions = {
    threshold: 0.1, // Trigger when 10% of the element is visible
    rootMargin: '0px 0px -50px 0px' // Start animation a bit before fully in view
};

const animatedElementsObserver = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('element--in-view'); 
            observer.unobserve(entry.target); // Animate only once
        }
    });
}, observerOptions);

// Apply observer to elements you want to animate
document.querySelectorAll('.portfolio-card, .service-card, .about-text > *, .client-logos, .gallery-item, .blog .service-card, .contact-info > *, .contact-form > *').forEach((el) => {
    // el.style.opacity = '0'; // REMOVED: Initial state for fade-in, should be handled by CSS if animation is desired
    // el.style.transform = 'translateY(20px)'; // REMOVED: Initial state for slide-up, should be handled by CSS
    animatedElementsObserver.observe(el);
});


// Animate stat numbers 
function animateValue(element) {
    if (!element) return; // Guard clause
    const finalValueText = element.textContent;
    
    let numericPart = finalValueText.replace(/[^\d.-]/g, ''); 
    if (numericPart === '') return; 

    const numericValue = parseFloat(numericPart);
    if (isNaN(numericValue)) return;

    const suffix = finalValueText.substring(numericPart.length); 
    
    const duration = 1500; // 1.5 seconds
    const frameDuration = 16; 
    const totalFrames = duration / frameDuration;
    const increment = numericValue / totalFrames;
    let currentValue = 0;
    
    element.textContent = (numericValue < 1 && numericValue > 0 && numericValue !== 0 ? '0.0' : '0') + suffix; 

    const timer = setInterval(() => {
        currentValue += increment;
        if ((increment > 0 && currentValue >= numericValue) || (increment < 0 && currentValue <= numericValue) || numericValue === 0) {
            currentValue = numericValue;
            clearInterval(timer);
        }
        
        let displayValue;
        if (numericPart.includes('.') && !Number.isInteger(numericValue) ) { // Animate decimals only if original was decimal
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
    // Check if image is already loaded (e.g. from cache) or has an error
    if (!img.complete) { // Only add listener if not yet complete
        img.addEventListener('error', function() {
            this.style.display = 'none'; // Or set a placeholder
            console.error('Failed to load image:', this.src);
        });
    } else if (img.naturalWidth === 0 && img.src) { // Already completed but failed to load (e.g. broken link)
         img.style.display = 'none';
         console.error('Image previously failed to load (naturalWidth is 0):', img.src);
    }
});

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
    // Lazy load images (if you decide to implement data-src in HTML)
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
        }, { threshold: 0.1 }); 
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // Animate numbers in portfolio modals when they open - moved to openPortfolioModal
});
