// Store slide indexes for each gallery slideshow
let gallerySlideIndexes = {
    'gallery5': 1
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
    iframe.src = iframeSrc;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Gallery modal functions
function openGalleryModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) {
        console.error('Modal not found for gallery:', modalId); // Specific console log
        return;
    }
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    const video = modal.querySelector('video');
    if (video) {
        video.currentTime = 0;
        console.log('Attempting to play video in gallery modal:', video.src);
        video.play().then(() => {
            console.log('Video playback started for gallery modal:', modalId);
        }).catch(e => {
            console.error('Video playback error for gallery modal ' + modalId + ':', e.message);
        });
    }

    if (modalId === 'gallery5') { 
        gallerySlideIndexes[modalId] = 1; 
        showGallerySlide(gallerySlideIndexes[modalId], modalId);
    }
}

function closeGalleryModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) {
        console.error('Modal not found for closing gallery:', modalId);
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
    if (!slideshowContainer) return; 
    const slides = slideshowContainer.getElementsByClassName("gallery-slide");
    const dotsContainer = document.getElementById(galleryId + '-dots');
    let dots = dotsContainer ? dotsContainer.getElementsByClassName("dot") : [];
    if (slides.length === 0) return;
    if (n > slides.length) gallerySlideIndexes[galleryId] = 1;
    if (n < 1) gallerySlideIndexes[galleryId] = slides.length;
    for (i = 0; i < slides.length; i++) slides[i].style.display = "none";
    if (dots.length > 0) {
        for (i = 0; i < dots.length; i++) dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[gallerySlideIndexes[galleryId] - 1].style.display = "block";
    if (dots.length > 0 && dots[gallerySlideIndexes[galleryId] - 1]) {
        dots[gallerySlideIndexes[galleryId] - 1].className += " active";
    }
}

// Portfolio modal functions
function openPortfolioModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) { console.error('Portfolio modal not found:', modalId); return; }
    const modalHeader = modal.querySelector('.portfolio-modal-header');
    const modalImg = modalHeader ? modalHeader.querySelector('img') : null;
    if (modalImg && modalImg.src) modalHeader.style.backgroundImage = `url(${modalImg.src})`;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    modal.querySelectorAll('.metric-number').forEach(num => animateValue(num));
}
function closePortfolioModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.style.display = 'none';
    checkAndRestoreScroll();
}

// Team Member Modal Functions
function openTeamModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) { console.error('Team modal not found:', modalId); return; }
    const modalHeader = modal.querySelector('.team-modal-header');
    const modalImg = modalHeader ? modalHeader.querySelector('.team-modal-img-main') : null;
    if (modalImg && modalImg.src) modalHeader.style.backgroundImage = `url(${modalImg.src})`;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    modal.querySelectorAll('.metric-number').forEach(num => animateValue(num));
}
function closeTeamModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.style.display = 'none';
    checkAndRestoreScroll();
}

// Job Modal Functions
function openJobModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) { console.error('Job modal not found:', modalId); return; }
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    const form = modal.querySelector('.job-application-form');
    if (form) form.reset();
    const messageDiv = modal.querySelector('.form-submission-feedback');
    if (messageDiv) { messageDiv.style.display = 'none'; messageDiv.textContent = ''; messageDiv.className = 'form-submission-feedback'; }
    const charCounter = modal.querySelector('.char-counter');
    const messageTextarea = modal.querySelector('textarea[name="message"]');
    if (charCounter && messageTextarea) { charCounter.textContent = `${messageTextarea.maxLength} characters remaining`; charCounter.style.color = '#aaa'; }
}
function closeJobModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.style.display = 'none';
    checkAndRestoreScroll();
}

// Service Detail Modal Functions
function openServiceModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) { console.error('Service modal not found:', modalId); return; }
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    setTimeout(() => { 
       if(modal.contains(document.activeElement)) modal.blur();
       modal.scrollTop = 0; 
       const content = modal.querySelector('.service-modal-content');
       if(content) content.scrollTop = 0;
    },0);
}
function closeServiceModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.style.display = 'none';
    checkAndRestoreScroll();
}

// Helper function to check if any modal is open and restore scroll if not
function checkAndRestoreScroll() {
    const anyModalOpen = document.querySelector('.gallery-modal[style*="display: block"], .portfolio-modal[style*="display: block"], .team-modal[style*="display: block"], .job-modal[style*="display: block"], .service-detail-modal[style*="display: block"], .blog-modal[style*="display: block"]');
    if (!anyModalOpen) {
        document.body.style.overflow = 'auto';
    }
}

// Close modals when clicking outside of content
window.addEventListener('click', function(event) {
    if (event.target.matches('.gallery-modal, .portfolio-modal, .team-modal, .job-modal, .service-detail-modal, .blog-modal')) {
        if (event.target.style.display === 'block') { // Ensure it's visible before trying to close
            if (event.target.classList.contains('gallery-modal')) closeGalleryModal(event.target.id);
            else if (event.target.classList.contains('portfolio-modal')) closePortfolioModal(event.target.id);
            else if (event.target.classList.contains('team-modal')) closeTeamModal(event.target.id);
            else if (event.target.classList.contains('job-modal')) closeJobModal(event.target.id);
            else if (event.target.classList.contains('service-detail-modal')) closeServiceModal(event.target.id);
            else if (event.target.classList.contains('blog-modal') && typeof closeBlogModal === 'function') closeBlogModal(event.target.id); // blog-modal handled by blog-scripts.js mostly
        }
    }
});

// Close modals with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        let modalClosedThisEvent = false;
        document.querySelectorAll('.gallery-modal, .portfolio-modal, .team-modal, .job-modal, .service-detail-modal, .blog-modal').forEach(modal => {
            if (modal.style.display === 'block') {
                if (modal.classList.contains('gallery-modal')) closeGalleryModal(modal.id);
                else if (modal.classList.contains('portfolio-modal')) closePortfolioModal(modal.id);
                else if (modal.classList.contains('team-modal')) closeTeamModal(modal.id);
                else if (modal.classList.contains('job-modal')) closeJobModal(modal.id);
                else if (modal.classList.contains('service-detail-modal')) closeServiceModal(modal.id);
                else if (modal.classList.contains('blog-modal') && typeof closeBlogModal === 'function') closeBlogModal(modal.id);
                modalClosedThisEvent = true;
            }
        });
        if (modalClosedThisEvent) checkAndRestoreScroll();
    }
});

// Contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    let formMessageDiv = document.getElementById('form-submission-message');
    if (!formMessageDiv) {
        formMessageDiv = document.createElement('div');
        formMessageDiv.id = 'form-submission-message';
        formMessageDiv.className = 'form-submission-feedback';
        contactForm.parentNode.insertBefore(formMessageDiv, contactForm.nextSibling);
    }
    contactForm.addEventListener('submit', async function(e) { /* ... Same as before ... */ });
}

// Newsletter form handling
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    let newsletterMessageDiv = document.getElementById('newsletter-submission-message');
    if(!newsletterMessageDiv){
        newsletterMessageDiv = document.createElement('div');
        newsletterMessageDiv.id = 'newsletter-submission-message';
        newsletterMessageDiv.className = 'form-submission-feedback';
        newsletterForm.parentNode.insertBefore(newsletterMessageDiv, newsletterForm.nextSibling);
    }
    newsletterForm.addEventListener('submit', async function(e) { /* ... Same as before ... */ });
}

// Job Application Form Handler
const jobAppFormMotionDesigner = document.getElementById('jobApplicationFormMotionDesigner');
if (jobAppFormMotionDesigner) { /* ... Same as before ... */ }


// DOMContentLoaded for general initializations
document.addEventListener('DOMContentLoaded', function() {
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) currentYearSpan.textContent = new Date().getFullYear();
    
    const lazyImages = document.querySelectorAll('img[data-src]');
    if (lazyImages.length > 0) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target; img.src = img.dataset.src; img.removeAttribute('data-src'); observer.unobserve(img);
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
            const href = this.getAttribute('href'); const [path, hash] = href.split('#');
            const currentPath = window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1) || "index.html";
            const targetPath = path || (currentPath === "index.html" || currentPath === "" ? "index.html" : currentPath);
            if (hash) {
                if (targetPath === currentPath || (targetPath === 'index.html' && (currentPath === '' || currentPath === 'index.html'))) {
                    e.preventDefault(); const targetElement = document.getElementById(hash);
                    if (targetElement) {
                        if (navLinks && navLinks.classList.contains('nav-links--active')) { navLinks.classList.remove('nav-links--active'); if (mobileMenuIcon) mobileMenuIcon.classList.remove('active'); }
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
        mobileMenuIcon.addEventListener('click', function() { navLinks.classList.toggle('nav-links--active'); this.classList.toggle('active'); });
    }

    window.addEventListener('scroll', function() {
        const nav = document.querySelector('nav');
        if (nav) nav.classList.toggle('nav--scrolled', window.scrollY > 100);
    });

    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const animatedElementsObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) { entry.target.classList.add('element--in-view'); observer.unobserve(entry.target); }
        });
    }, observerOptions);

    // Simplified observer loop: Observe all targeted elements directly.
    // Note: `blog-card` specific animations might be in `blog-scripts.js`. This targets general elements.
    const elementsToObserve = document.querySelectorAll(
        '.portfolio-card, .service-card, .about-text > *, .client-logos, .gallery-item, ' + 
        '.contact-info > *, .contact-form > *, .team-member-card, .award-item, .job-posting, .mission-content'
        // Note: #blog .service-card is covered by .service-card.
        // .blog-card is handled by blog-scripts.js if it has its own observer.
    );
    elementsToObserve.forEach(el => animatedElementsObserver.observe(el));

    // Specifically observe cards in the "Latest Insights" section on index.html
    const latestInsightsCards = document.querySelectorAll('#blog.services .service-card');
    latestInsightsCards.forEach(el => animatedElementsObserver.observe(el));
});

// Animate stat numbers 
function animateValue(element) { /* ... Same as before ... */ }

// Image error handling
document.querySelectorAll('img').forEach(img => { /* ... Same as before ... */ });

// --- (Content for form handlers and animateValue was here, assuming it's unchanged and correct based on prior turns) ---
// For brevity, I'll re-paste only the differing/relevant parts.
// The full script for contactForm, newsletterForm, jobAppFormMotionDesigner, animateValue, and image error handling
// should be the same as provided in the previous turn (artifact id="scripts_js_corrected").
// Make sure those full functions are present.
// This is just to show the observer change more clearly.
// Ensure the full definitions for those functions are present in your actual file.
// ... (rest of the script for form submissions, animateValue, image error handling as in the previous full version)
// The previous canvas `scripts_js_corrected` contains the full, most up-to-date JS.
// The only functional change here is to simplify the IntersectionObserver loop in DOMContentLoaded.
// Please refer to the full content of `scripts_js_corrected` for the complete script.
