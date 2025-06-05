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


// Gallery modal functions
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

    if (modalId === 'gallery5') { 
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
    
    const video = modal.querySelector('video');
    if (video) {
        video.pause();
        video.currentTime = 0;
    }

    const iframe = modal.querySelector('.gallery-iframe');
    if (iframe) {
        iframe.src = ''; 
    }
    checkAndRestoreScroll(); 
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
        console.warn('Portfolio modal image element not found for background blur:', modalId);
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
    checkAndRestoreScroll();
}

// Team Member Modal Functions
function openTeamModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) {
        console.error('Team modal not found:', modalId);
        return;
    }
    const modalHeader = modal.querySelector('.team-modal-header');
    const modalImg = modalHeader.querySelector('.team-modal-img-main'); 
    
    if (modalImg && modalImg.src) {
        modalHeader.style.backgroundImage = `url(${modalImg.src})`;
    } else if (modalImg) {
        console.warn('Team modal image source not found for background blur:', modalId);
    } else {
         console.warn('Team modal image element (.team-modal-img-main) not found for background blur:', modalId);
    }
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';

    const metricNumbers = modal.querySelectorAll('.metric-number');
    metricNumbers.forEach(num => animateValue(num));
}

function closeTeamModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) {
        console.error('Team modal not found for closing:', modalId);
        return;
    }
    modal.style.display = 'none';
    checkAndRestoreScroll();
}

// Job Modal Functions
function openJobModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) {
        console.error('Job modal not found:', modalId);
        return;
    }
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';

    const form = modal.querySelector('.job-application-form');
    if (form) form.reset();
    const messageDiv = modal.querySelector('.form-submission-feedback');
    if (messageDiv) {
        messageDiv.style.display = 'none';
        messageDiv.textContent = '';
        messageDiv.className = 'form-submission-feedback'; 
    }
    const charCounter = modal.querySelector('.char-counter');
    const messageTextarea = modal.querySelector('textarea[name="message"]');
    if (charCounter && messageTextarea) {
        charCounter.textContent = `${messageTextarea.maxLength} characters remaining`;
        charCounter.style.color = '#aaa'; 
    }
}

function closeJobModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) {
        console.error('Job modal not found for closing:', modalId);
        return;
    }
    modal.style.display = 'none';
    checkAndRestoreScroll();
}

// Service Detail Modal Functions (NEW)
function openServiceModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) {
        console.error('Service modal not found:', modalId);
        return;
    }
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
     // Scroll modal to top
    setTimeout(() => { 
       if(modal.contains(document.activeElement)) modal.blur();
       modal.scrollTop = 0; 
       const content = modal.querySelector('.service-modal-content');
       if(content) content.scrollTop = 0;
    },0);
}

function closeServiceModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) {
        console.error('Service modal not found for closing:', modalId);
        return;
    }
    modal.style.display = 'none';
    checkAndRestoreScroll();
}


// Helper function to check if any modal is open and restore scroll if not
function checkAndRestoreScroll() {
    const anyModalOpen = document.querySelector('.gallery-modal[style*="display: block"]') ||
                         document.querySelector('.portfolio-modal[style*="display: block"]') ||
                         document.querySelector('.team-modal[style*="display: block"]') ||
                         document.querySelector('.job-modal[style*="display: block"]') ||
                         document.querySelector('.service-detail-modal[style*="display: block"]') || // Added service modal
                         (typeof closeBlogModal !== 'undefined' && document.querySelector('.blog-modal[style*="display: block"]'));
    if (!anyModalOpen) {
        document.body.style.overflow = 'auto';
    }
}

// Close modals when clicking outside of content
window.addEventListener('click', function(event) {
    if (event.target.classList.contains('gallery-modal')) {
        closeGalleryModal(event.target.id);
    } else if (event.target.classList.contains('portfolio-modal')) {
        closePortfolioModal(event.target.id); 
    } else if (event.target.classList.contains('team-modal')) { 
        closeTeamModal(event.target.id);
    } else if (event.target.classList.contains('job-modal')) {
        closeJobModal(event.target.id);
    } else if (event.target.classList.contains('service-detail-modal')) { // Added service modal
        closeServiceModal(event.target.id);
    }
    // Note: blog-modal outside click is handled in blog-scripts.js
});

// Close modals with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        let modalClosedThisEvent = false;
        document.querySelectorAll('.gallery-modal, .portfolio-modal, .team-modal, .job-modal, .service-detail-modal').forEach(modal => { // Added service modal
            if (modal.style.display === 'block') {
                if (modal.classList.contains('gallery-modal')) closeGalleryModal(modal.id);
                else if (modal.classList.contains('portfolio-modal')) closePortfolioModal(modal.id);
                else if (modal.classList.contains('team-modal')) closeTeamModal(modal.id);
                else if (modal.classList.contains('job-modal')) closeJobModal(modal.id);
                else if (modal.classList.contains('service-detail-modal')) closeServiceModal(modal.id); // Added service modal
                modalClosedThisEvent = true;
            }
        });
        
        if (modalClosedThisEvent) {
             checkAndRestoreScroll();
        }
    }
});

// Contact form handling (for index.html footer form)
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
        formMessageDiv.style.display = 'none'; 
        formMessageDiv.className = 'form-submission-feedback'; 
        const parentOfContactForm = contactForm.parentNode;
        if (parentOfContactForm) {
             parentOfContactForm.insertBefore(formMessageDiv, contactForm.nextSibling);
        }
    }

    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        formMessageDiv.textContent = ''; 
        formMessageDiv.style.display = 'none'; 
        formMessageDiv.className = 'form-submission-feedback'; 

        const submitButton = this.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        const formData = new FormData(this);
        const data = Object.fromEntries(formData.entries()); 
        data.formType = 'contact'; 
        
        if (!data.name || !data.email || !data.message) {
            formMessageDiv.textContent = 'Please fill in all required fields.';
            formMessageDiv.classList.add('error');
            formMessageDiv.style.display = 'block';
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
            return;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            formMessageDiv.textContent = 'Please enter a valid email address.';
            formMessageDiv.classList.add('error');
            formMessageDiv.style.display = 'block';
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
            return;
        }

        const workerUrl = 'https://contact-form-handler.thomas-streetman.workers.dev/'; 

        try {
            const response = await fetch(workerUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', },
                body: JSON.stringify(data),
            });
            const result = await response.json();

            if (response.ok && result.success) {
                formMessageDiv.textContent = result.message || 'Message sent successfully!';
                formMessageDiv.classList.add('success');
                this.reset(); 
            } else {
                formMessageDiv.textContent = result.message || `Failed to send message. Server responded with ${response.status}.`;
                formMessageDiv.classList.add('error');
            }
        } catch (error) {
            console.error('Error submitting contact form:', error);
            formMessageDiv.textContent = 'An error occurred. Please try again later.';
            formMessageDiv.classList.add('error');
        } finally {
            formMessageDiv.style.display = 'block';
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
        }
    });
}

// Newsletter form handling (for footer newsletter, ID 'newsletterForm')
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
        newsletterMessageDiv.style.display = 'none'; 
        newsletterMessageDiv.className = 'form-submission-feedback'; 
        newsletterForm.parentNode.insertBefore(newsletterMessageDiv, newsletterForm.nextSibling);
    }

    newsletterForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        newsletterMessageDiv.textContent = '';
        newsletterMessageDiv.style.display = 'none';
        newsletterMessageDiv.className = 'form-submission-feedback'; 


        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value;
        const submitButton = this.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;

        submitButton.textContent = 'Subscribing...';
        submitButton.disabled = true;

        if (!email) {
            newsletterMessageDiv.textContent = 'Please enter your email address.';
            newsletterMessageDiv.classList.add('error');
            newsletterMessageDiv.style.display = 'block';
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            newsletterMessageDiv.textContent = 'Please enter a valid email address.';
            newsletterMessageDiv.classList.add('error');
            newsletterMessageDiv.style.display = 'block';
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
            return;
        }

        const workerUrl = 'https://contact-form-handler.thomas-streetman.workers.dev/'; 
        const data = { email: email, formType: 'newsletter' };

        try {
            const response = await fetch(workerUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', },
                body: JSON.stringify(data),
            });
            const result = await response.json();
            if (response.ok && result.success) {
                newsletterMessageDiv.textContent = result.message || 'Successfully subscribed!';
                newsletterMessageDiv.classList.add('success');
                this.reset(); 
            } else {
                newsletterMessageDiv.textContent = result.message || `Subscription failed. Server responded with ${response.status}.`;
                newsletterMessageDiv.classList.add('error');
            }
        } catch (error) {
            console.error('Error submitting newsletter form:', error);
            newsletterMessageDiv.textContent = 'An error occurred. Please try again later.';
            newsletterMessageDiv.classList.add('error');
        } finally {
            newsletterMessageDiv.style.display = 'block';
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
        }
    });
}

// Job Application Form Handler
const jobAppFormMotionDesigner = document.getElementById('jobApplicationFormMotionDesigner');
if (jobAppFormMotionDesigner) {
    const messageTextarea = document.getElementById('jobAppMessageMotionDesigner');
    const charCounterDisplay = document.getElementById('charCounterMotionDesigner');
    const maxLength = 300;

    if (messageTextarea && charCounterDisplay) {
        messageTextarea.addEventListener('input', function() {
            const currentLength = this.value.length;
            const charsRemaining = maxLength - currentLength;
            charCounterDisplay.textContent = `${charsRemaining} characters remaining`;
            charCounterDisplay.style.color = charsRemaining < 0 ? 'var(--error-red)' : '#aaa';
        });
    }

    jobAppFormMotionDesigner.addEventListener('submit', async function(e) {
        e.preventDefault();
        const feedbackDiv = document.getElementById('jobAppSubmissionMessageMotionDesigner');
        feedbackDiv.textContent = '';
        feedbackDiv.style.display = 'none';
        feedbackDiv.className = 'form-submission-feedback'; 


        const submitButton = this.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.textContent = 'Submitting...';
        submitButton.disabled = true;

        const nameInput = document.getElementById('jobAppNameMotionDesigner');
        const emailInput = document.getElementById('jobAppEmailMotionDesigner');
        const resumeInput = document.getElementById('jobAppResumeMotionDesigner');

        if (!nameInput.value || !emailInput.value || !messageTextarea.value || !resumeInput.files.length) {
            feedbackDiv.textContent = 'Please fill in all required fields and attach a resume.';
            feedbackDiv.classList.add('error');
            feedbackDiv.style.display = 'block';
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
            return;
        }
        if (messageTextarea.value.length > maxLength) {
            feedbackDiv.textContent = `Message exceeds ${maxLength} characters.`;
            feedbackDiv.classList.add('error');
            feedbackDiv.style.display = 'block';
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            feedbackDiv.textContent = 'Please enter a valid email address.';
            feedbackDiv.classList.add('error');
            feedbackDiv.style.display = 'block';
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
            return;
        }
        const file = resumeInput.files[0];
        const maxFileSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxFileSize) {
            feedbackDiv.textContent = 'Resume file size exceeds 5MB.';
            feedbackDiv.classList.add('error');
            feedbackDiv.style.display = 'block';
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
            return;
        }
        const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/rtf', 'text/plain'];
        if (!allowedTypes.includes(file.type)) {
            feedbackDiv.textContent = 'Invalid file type. Please upload PDF, DOC, DOCX, RTF or TXT.';
            feedbackDiv.classList.add('error');
            feedbackDiv.style.display = 'block';
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
            return;
        }

        const formData = new FormData(this);
        formData.append('formType', 'job-application-motion-designer');
        
        const workerUrl = 'https://contact-form-handler.thomas-streetman.workers.dev/';

        try {
            const response = await fetch(workerUrl, {
                method: 'POST',
                body: formData, 
            });
            const result = await response.json(); 

            if (response.ok && result.success) {
                feedbackDiv.textContent = result.message || 'Application submitted successfully!';
                feedbackDiv.classList.add('success');
                this.reset(); 
                if (charCounterDisplay) charCounterDisplay.textContent = `${maxLength} characters remaining`;
            } else {
                feedbackDiv.textContent = result.message || `Submission failed. Server responded with ${response.status}.`;
                feedbackDiv.classList.add('error');
            }
        } catch (error) {
            console.error('Error submitting job application:', error);
            feedbackDiv.textContent = 'An error occurred. Please try again later.';
            feedbackDiv.classList.add('error');
        } finally {
            feedbackDiv.style.display = 'block';
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
        }
    });
}


// DOMContentLoaded for general initializations
document.addEventListener('DOMContentLoaded', function() {
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

    const navAnchors = document.querySelectorAll('nav .nav-links a[href*="#"], .logo[href*="#"], .cta-button[href*="#"]');
    const mobileMenuIcon = document.querySelector('.mobile-menu'); 
    const navLinks = document.querySelector('.nav-links'); 

    navAnchors.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            const [path, hash] = href.split('#');
            
            const currentPath = window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1) || "index.html";
            const targetPath = path || (currentPath === "index.html" || currentPath === "" ? "index.html" : currentPath) ;

            if (hash) {
                if (targetPath === currentPath || (targetPath === 'index.html' && (currentPath === '' || currentPath === 'index.html'))) {
                    e.preventDefault();
                    const targetElement = document.getElementById(hash);
                    if (targetElement) {
                        if (navLinks && navLinks.classList.contains('nav-links--active')) {
                            navLinks.classList.remove('nav-links--active');
                            if (mobileMenuIcon) mobileMenuIcon.classList.remove('active');
                        }
                        const navHeight = document.querySelector('nav') ? document.querySelector('nav').offsetHeight : 0;
                        const elementPosition = targetElement.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - navHeight - 20; 
                        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
                    }
                }
            }
        });
    });

    if (mobileMenuIcon && navLinks) {
        mobileMenuIcon.addEventListener('click', function() {
            navLinks.classList.toggle('nav-links--active'); 
            this.classList.toggle('active'); 
        });
    }

    window.addEventListener('scroll', function() {
        const nav = document.querySelector('nav');
        if (nav) {
            nav.classList.toggle('nav--scrolled', window.scrollY > 100);
        }
    });

    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const animatedElementsObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('element--in-view'); 
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    document.querySelectorAll('.portfolio-card, .service-card, .about-text > *, .client-logos, .gallery-item, #blog .service-card, .contact-info > *, .contact-form > *, .team-member-card, .award-item, .job-posting, .mission-content').forEach((el) => {
        // Updated to ensure blog cards are observed correctly by their specific script if necessary.
        if (el.closest('#blog-posts') && el.classList.contains('blog-card')) {
            // If blog-scripts.js handles blog-card animations, this check prevents double observation.
            // If blog-scripts.js relies on this observer, then this check is not needed.
            // For now, assume blog-scripts.js might have its own observer or rely on this one.
            // If this script is meant to be the sole animator, remove this conditional block for blog-cards.
        } else {
             animatedElementsObserver.observe(el);
        }
    });
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
    const totalFrames = Math.max(1, duration / frameDuration); 
    let increment = numericValue / totalFrames; 

    if (numericValue === 0) {
        element.textContent = '0' + suffix;
        return;
    }
    if (Math.abs(increment) < 0.0001 && numericValue !== 0) {
      increment = (numericValue / Math.abs(numericValue)) * 0.001; 
    }

    let currentValue = 0;
    const initialDisplayValue = (numericValue < 1 && numericValue > 0 && !Number.isInteger(numericValue)) ? '0.0' : '0';
    element.textContent = initialDisplayValue + suffix;

    const timer = setInterval(() => {
        currentValue += increment;
        let animationComplete = false;
        if ((increment > 0 && currentValue >= numericValue) || (increment < 0 && currentValue <= numericValue)) {
            currentValue = numericValue;
            animationComplete = true;
        } else if (numericValue === 0) { 
            currentValue = 0;
            animationComplete = true;
        }

        let displayValue;
        if (numericPart.includes('.') && !Number.isInteger(numericValue) ) { 
            const decimalPlaces = (numericPart.split('.')[1] || '').length;
            displayValue = currentValue.toFixed(decimalPlaces);
        } else {
            displayValue = Math.round(currentValue); 
        }
        element.textContent = displayValue + suffix;
        
        if(animationComplete){
            clearInterval(timer);
        }
    }, frameDuration);
}

// Image error handling
document.querySelectorAll('img').forEach(img => {
    if (!img.complete) { 
        img.addEventListener('error', function() {
            this.style.display = 'none'; 
            console.error('Failed to load image:', this.src);
        });
    } else if (img.naturalWidth === 0 && img.src && !img.getAttribute('src').startsWith('data:image/')) { 
         img.style.display = 'none';
         console.error('Image previously failed to load (naturalWidth is 0):', img.src);
    }
});
