// Blog modal functions
function openBlogModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) {
        console.error('Blog modal not found:', modalId);
        return;
    }
    
    const modalHeader = modal.querySelector('.blog-modal-header');
    const modalImg = modalHeader.querySelector('img');
    
    if (modalImg && modalImg.src) {
        modalHeader.style.backgroundImage = `url(${modalImg.src})`;
    } else if (modalImg) {
        console.warn('Blog modal image source not found for background blur:', modalId);
    } else {
        console.warn('Blog modal image element not found for background blur:', modalId);
    }
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Scroll to top of modal content
    const modalContent = modal.querySelector('.blog-modal-content');
    if (modalContent) {
        modalContent.scrollTop = 0;
    }
}

function closeBlogModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) {
        console.error('Blog modal not found for closing:', modalId);
        return;
    }
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Add blog modal event listeners to existing window click handler
window.addEventListener('click', function(event) {
    if (event.target.classList.contains('blog-modal')) {
        if (event.target.style.display === 'block') {
            closeBlogModal(event.target.id);
        }
    }
});

// Add blog modal support to existing escape key handler
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        let aModalWasOpen = false;
        document.querySelectorAll('.blog-modal').forEach(modal => {
            if (modal.style.display === 'block') {
                closeBlogModal(modal.id);
                aModalWasOpen = true;
            }
        });
        
        if (aModalWasOpen) {
            document.body.style.overflow = 'auto';
        }
    }
});

// Blog newsletter form handling
const blogNewsletterForm = document.getElementById('blogNewsletterForm');
if (blogNewsletterForm) {
    let blogFormMessageDiv = document.getElementById('blog-form-submission-message');
    if (!blogFormMessageDiv) {
        blogFormMessageDiv = document.createElement('div');
        blogFormMessageDiv.id = 'blog-form-submission-message';
        blogFormMessageDiv.style.marginTop = '15px';
        blogFormMessageDiv.style.padding = '10px';
        blogFormMessageDiv.style.borderRadius = '5px';
        blogFormMessageDiv.style.textAlign = 'center';
        blogFormMessageDiv.style.display = 'none';
        blogNewsletterForm.parentNode.insertBefore(blogFormMessageDiv, blogNewsletterForm.nextSibling);
    }

    blogNewsletterForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        blogFormMessageDiv.textContent = '';
        blogFormMessageDiv.style.display = 'none';

        const submitButton = this.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.textContent = 'Subscribing...';
        submitButton.disabled = true;

        const formData = new FormData(this);
        const data = Object.fromEntries(formData.entries());
        data.formType = 'blog-newsletter';
        data.source = 'blog-page';
        
        if (!data.email) {
            blogFormMessageDiv.textContent = 'Please enter your email address.';
            blogFormMessageDiv.style.backgroundColor = 'var(--primary-red)';
            blogFormMessageDiv.style.color = 'var(--white)';
            blogFormMessageDiv.style.display = 'block';
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
            return;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            blogFormMessageDiv.textContent = 'Please enter a valid email address.';
            blogFormMessageDiv.style.backgroundColor = 'var(--primary-red)';
            blogFormMessageDiv.style.color = 'var(--white)';
            blogFormMessageDiv.style.display = 'block';
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
                blogFormMessageDiv.textContent = result.message || 'Successfully subscribed to our newsletter!';
                blogFormMessageDiv.style.backgroundColor = 'var(--muted-gold)';
                blogFormMessageDiv.style.color = 'var(--black)';
                this.reset();
            } else {
                blogFormMessageDiv.textContent = result.message || `Subscription failed. Server responded with ${response.status}.`;
                blogFormMessageDiv.style.backgroundColor = 'var(--primary-red)';
                blogFormMessageDiv.style.color = 'var(--white)';
            }
        } catch (error) {
            console.error('Error submitting blog newsletter form:', error);
            blogFormMessageDiv.textContent = 'An error occurred. Please try again later.';
            blogFormMessageDiv.style.backgroundColor = 'var(--dark-red)';
            blogFormMessageDiv.style.color = 'var(--white)';
        } finally {
            blogFormMessageDiv.style.display = 'block';
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
        }
    });
} else {
    console.warn("Blog newsletter form with ID 'blogNewsletterForm' not found.");
}

// Initialize blog page animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add blog cards to scroll animation observer if it exists
    if (typeof animatedElementsObserver !== 'undefined') {
        document.querySelectorAll('.blog-card').forEach((el) => {
            animatedElementsObserver.observe(el);
        });
    }
});