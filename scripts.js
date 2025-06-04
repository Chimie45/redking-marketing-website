// Store slide indexes for each gallery slideshow
let gallerySlideIndexes = {
    'gallery5': 1
    // Add other gallery IDs here if they become slideshows
};

// Function to open a gallery modal that contains an iframe
function openIframeModal(modalId, iframeSrc) {
    const modal = document.getElementById(modalId);
    if (!modal) {
        console.error('Iframe modal not found:', modalId);
        return;
    }
    const iframe = modal.querySelector('.gallery-iframe');
    if (!iframe) {
        console.error('Iframe element not found in modal:', modalId);
        return;
    }

    iframe.src = iframeSrc; // Set the source for the iframe
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}


// Gallery modal functions (modified to include slideshow and iframe logic)
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

    const iframe = modal.querySelector('.gallery-iframe');
    if (iframe) {
        iframe.src = ''; 
    }
}

// Slideshow specific functions
function plusSlides(n, galleryId) {
    showGallerySlide(gallerySlideIndexes[galleryId] += n, galleryId);
}

function currentGallerySlide(n, galleryId) {
    showGallerySlide(gallerySlideIndexes[galleryId] = n, galleryId);
}

function showGallerySlide(n, galleryId) {
    let i;
    const slideshowContainer = document.getElementById(galleryId + '-slideshow');
    if (!slideshowContainer) {
        return; 
    }

    const slides = slideshowContainer.getElementsByClassName("gallery-slide");
    const dotsContainer = document.getElementById(galleryId + '-dots');
    let dots = [];
    if (dotsContainer) {
        dots = dotsContainer.getElementsByClassName("dot");
    }

    if (slides.length === 0) {
        return;
    }

    if (n > slides.length) { gallerySlideIndexes[galleryId] = 1 }
    if (n < 1) { gallerySlideIndexes[galleryId] = slides.length }
    
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    if (dots.length > 0) { 
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
    }
    
    slides[gallerySlideIndexes[galleryId] - 1].style.display = "block";
    if (dots.length > 0) { 
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
    
    if (modalImg && modalImg.src) {
        modalHeader.style.backgroundImage = `url(${modalImg.src})`;
    } else if (modalImg) {
        console.warn('Portfolio modal image source not found for background blur:', modalId);
    } else {
        console.warn('Portfolio modal image not found for background blur:', modalId);
    }
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';

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
        if (document.getElementById(modalId) && document.getElementById(modalId).style.display === 'block') {
            closeGalleryModal(modalId);
        }
    }
    
    if (event.target.classList.contains('portfolio-modal')) {
        if (event.target.style.display === 'block') {
            closePortfolioModal(event.target.id); 
        }
    }
});

// Close modals with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        let aModalWasOpen = false;
        const galleryModals = document.querySelectorAll('.gallery-modal');
        galleryModals.forEach(modal => {
            if (modal.style.display === 'block') {
                closeGalleryModal(modal.id);
                aModalWasOpen = true;
            }
        });
        
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
    let formMessageDiv = document.getElementById('form-submission-message');
    if (!formMessageDiv) {
        formMessageDiv = document.createElement('div');
        formMessageDiv.id = 'form-submission-message';
        formMessageDiv.style.marginTop = '15px'; 
        formMessageDiv.style.padding = '10px';
        formMessageDiv.style.borderRadius = '5px';
        formMessageDiv.style.textAlign = 'center';
        formMessageDiv.style.display = 'none'; // Initially hidden
        // Insert after the parent of the form, which is .contact-form
        // or before the submit button if you want it inside the form.
        // For now, let's put it after the form wrapper.
        if (contactForm.parentNode.parentNode) { // Assuming .contact-form is wrapped
             contactForm.parentNode.parentNode.insertBefore(formMessageDiv, contactForm.parentNode.nextSibling);
        } else { // Fallback if structure is different
            contactForm.parentNode.insertBefore(formMessageDiv, contactForm.nextSibling);
        }
    }


    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        formMessageDiv.textContent = ''; 
        formMessageDiv.style.display = 'none'; 

        const submitButton = this.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        const formData = new FormData(this);
        const data = Object.fromEntries(formData.entries()); 
        data.formType = 'contact'; // Add form type
        
        if (!data.name || !data.email || !data.message) {
            formMessageDiv.textContent = 'Please fill in all required fields.';
            formMessageDiv.style.backgroundColor = 'var(--primary-red)';
            formMessageDiv.style.color = 'var(--white)';
            formMessageDiv.style.display = 'block';
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
            return;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            formMessageDiv.textContent = 'Please enter a valid email address.';
            formMessageDiv.style.backgroundColor = 'var(--primary-red)';
            formMessageDiv.style.color = 'var(--white)';
            formMessageDiv.style.display = 'block';
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
            return;
        }

        const workerUrl = 'https://contact-form-handler.thomas-streetman.workers.dev/'; 

        try {
            const response = await fetch(workerUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok && result.success) {
                formMessageDiv.textContent = result.message || 'Message sent successfully!';
                formMessageDiv.style.backgroundColor = 'var(--muted-gold)'; 
                formMessageDiv.style.color = 'var(--black)';
                this.reset(); 
            } else {
                formMessageDiv.textContent = result.message || `Failed to send message. Server responded with ${response.status}.`;
                formMessageDiv.style.backgroundColor = 'var(--primary-red)';
                formMessageDiv.style.color = 'var(--white)';
            }
        } catch (error) {
            console.error('Error submitting contact form:', error);
            formMessageDiv.textContent = 'An error occurred. Please try again later.';
            formMessageDiv.style.backgroundColor = 'var(--dark-red)';
            formMessageDiv.style.color = 'var(--white)';
        } finally {
            formMessageDiv.style.display = 'block';
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
        }
    });
} else {
    console.warn("Contact form with ID 'contactForm' not found.");
}

// Newsletter form handling
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    let newsletterMessageDiv = document.getElementById('newsletter-submission-message');
    if (!newsletterMessageDiv) {
        newsletterMessageDiv = document.createElement('div');
        newsletterMessageDiv.id = 'newsletter-submission-message';
        newsletterMessageDiv.style.marginTop = '10px';
        newsletterMessageDiv.style.padding = '8px';
        newsletterMessageDiv.style.borderRadius = '4px';
        newsletterMessageDiv.style.textAlign = 'center';
        newsletterMessageDiv.style.fontSize = '0.9em';
        newsletterMessageDiv.style.display = 'none'; // Initially hidden
        newsletterForm.parentNode.insertBefore(newsletterMessageDiv, newsletterForm.nextSibling);
    }

    newsletterForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        newsletterMessageDiv.textContent = '';
        newsletterMessageDiv.style.display = 'none';

        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value;
        const submitButton = this.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;

        submitButton.textContent = 'Subscribing...';
        submitButton.disabled = true;

        if (!email) {
            newsletterMessageDiv.textContent = 'Please enter your email address.';
            newsletterMessageDiv.style.backgroundColor = 'var(--primary-red)';
            newsletterMessageDiv.style.color = 'var(--white)';
            newsletterMessageDiv.style.display = 'block';
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            newsletterMessageDiv.textContent = 'Please enter a valid email address.';
            newsletterMessageDiv.style.backgroundColor = 'var(--primary-red)';
            newsletterMessageDiv.style.color = 'var(--white)';
            newsletterMessageDiv.style.display = 'block';
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
            return;
        }

        const workerUrl = 'https://contact-form-handler.thomas-streetman.workers.dev/'; // Same worker URL
        const data = {
            email: email,
            formType: 'newsletter' // Differentiate from contact form
        };

        try {
            const response = await fetch(workerUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok && result.success) {
                newsletterMessageDiv.textContent = result.message || 'Successfully subscribed!';
                newsletterMessageDiv.style.backgroundColor = 'var(--muted-gold)';
                newsletterMessageDiv.style.color = 'var(--black)';
                this.reset(); // Clear the form
            } else {
                newsletterMessageDiv.textContent = result.message || `Subscription failed. Server responded with ${response.status}.`;
                newsletterMessageDiv.style.backgroundColor = 'var(--primary-red)';
                newsletterMessageDiv.style.color = 'var(--white)';
            }
        } catch (error) {
            console.error('Error submitting newsletter form:', error);
            newsletterMessageDiv.textContent = 'An error occurred. Please try again later.';
            newsletterMessageDiv.style.backgroundColor = 'var(--dark-red)';
            newsletterMessageDiv.style.color = 'var(--white)';
        } finally {
            newsletterMessageDiv.style.display = 'block';
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
        }
    });
} else {
    console.warn("Newsletter form with ID 'newsletterForm' not found.");
}


// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href.length > 1 && href.startsWith('#')) {
            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
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


// Animate elements on scroll
const observerOptions = {
    threshold: 0.1, 
    rootMargin: '0px 0px -50px 0px' 
};

const animatedElementsObserver = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('element--in-view'); 
            observer.unobserve(entry.target); 
        }
    });
}, observerOptions);

document.querySelectorAll('.portfolio-card, .service-card, .about-text > *, .client-logos, .gallery-item, .blog .service-card, .contact-info > *, .contact-form > *').forEach((el) => {
    animatedElementsObserver.observe(el);
});


// Animate stat numbers 
function animateValue(element) {
    if (!element) return; 
    const finalValueText = element.textContent;
    
    let numericPart = finalValueText.replace(/[^\d.-]/g, ''); 
    if (numericPart === '') return; 

    const numericValue = parseFloat(numericPart);
    if (isNaN(numericValue)) return;

    const suffix = finalValueText.substring(numericPart.length); 
    
    const duration = 1500; 
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
        if (numericPart.includes('.') && !Number.isInteger(numericValue) ) { 
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
    if (!img.complete) { 
        img.addEventListener('error', function() {
            this.style.display = 'none'; 
            console.error('Failed to load image:', this.src);
        });
    } else if (img.naturalWidth === 0 && img.src) { 
         img.style.display = 'none';
         console.error('Image previously failed to load (naturalWidth is 0):', img.src);
    }
});

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
    
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
});
