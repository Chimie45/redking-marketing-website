// This array holds all the data for your blog posts.
// To add a new post, just add a new object to this array.
const blogPosts = [
    {
        id: 'blog1',
        title: 'Gaming Market Trends 2025',
        date: '2025-03-15',
        author: 'Jane Doe',
        tags: ['Market Trends', 'Global Gaming', 'Strategy'],
        imageUrl: 'images/blog/blog-1.jpg',
        imageAlt: 'Gaming Market Trends 2025',
        excerpt: 'Discover the latest trends shaping the gaming industry and how to capitalize on emerging opportunities in global markets.',
        articleUrl: 'blogs/articles/gaming-trends-2025.html',
        featured: true // Set this to true for the single featured post
    },
    {
        id: 'blog2',
        title: 'Asian Gaming Markets Guide',
        date: '2025-03-08',
        author: 'John Smith',
        tags: ['Asia', 'Market Guide', 'Localization'],
        imageUrl: 'images/blog/blog-2.jpg',
        imageAlt: 'Asian Gaming Markets Guide',
        excerpt: 'Navigate the complexities of marketing gaming products across diverse Asian markets with cultural insights and regulatory guidance.',
        articleUrl: 'blogs/articles/asian-markets-guide.html'
    },
    {
        id: 'blog3',
        title: 'iGaming Marketing Strategies',
        date: '2025-02-28',
        author: 'Alex Johnson',
        tags: ['iGaming', 'Marketing', 'Player Acquisition'],
        imageUrl: 'images/blog/blog-3.jpg',
        imageAlt: 'iGaming Marketing Strategies',
        excerpt: 'Advanced strategies for marketing in highly regulated iGaming environments while maximizing player acquisition and retention.',
        articleUrl: 'blogs/articles/igaming-strategies.html'
    },
    {
        id: 'blog4',
        title: 'Social Media for Gaming Brands',
        date: '2025-02-20',
        author: 'Emily White',
        tags: ['Social Media', 'Community', 'Engagement'],
        imageUrl: 'images/blog/blog-4.jpg',
        imageAlt: 'Social Media for Gaming Brands',
        excerpt: 'Building authentic communities and driving engagement through strategic social media marketing in the gaming industry.',
        articleUrl: 'blogs/articles/social-media-gaming.html'
    },
    {
        id: 'blog5',
        title: 'User Acquisition Best Practices',
        date: '2025-02-12',
        author: 'Chris Green',
        tags: ['User Acquisition', 'Mobile Gaming', 'ROI'],
        imageUrl: 'images/blog/blog-5.jpg',
        imageAlt: 'User Acquisition Best Practices',
        excerpt: 'Data-driven approaches to mobile game user acquisition that maximize ROI and long-term player value.',
        articleUrl: 'blogs/articles/user-acquisition.html'
    },
    {
        id: 'blog6',
        title: 'Gaming Localization Strategies',
        date: '2025-02-05',
        author: 'Jane Doe',
        tags: ['Localization', 'Global Markets', 'Culture'],
        imageUrl: 'images/blog/blog-6.jpg',
        imageAlt: 'Gaming Localization Strategies',
        excerpt: 'Essential strategies for localizing gaming content and marketing campaigns for global audiences while maintaining brand authenticity.',
        articleUrl: 'blogs/articles/localization-strategies.html'
    }
];


document.addEventListener('DOMContentLoaded', function() {
    // This function runs once the entire HTML document is loaded.

    // Sort posts by date, most recent first, to ensure the "Latest Articles" are in order.
    blogPosts.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Get the container elements from the HTML.
    const featuredPostContainer = document.getElementById('featured-post-container');
    const blogGridContainer = document.getElementById('blog-grid-container');
    const modalContainer = document.getElementById('modal-container');

    // Find the single featured post and the rest of the posts.
    const featuredPost = blogPosts.find(p => p.featured);
    const regularPosts = blogPosts.filter(p => !p.featured);

    // If a featured post exists, create its HTML card and add it to the page.
    if (featuredPost) {
        featuredPostContainer.innerHTML = createFeaturedCard(featuredPost);
    }

    // Create the grid of regular blog post cards.
    let blogGridHtml = '';
    regularPosts.forEach(post => {
        blogGridHtml += createBlogCard(post);
    });
    blogGridContainer.innerHTML = blogGridHtml;

    // Create the hidden modal for every single blog post (featured and regular).
    let modalsHtml = '';
    blogPosts.forEach(post => {
        modalsHtml += createBlogModal(post);
    });
    modalContainer.innerHTML = modalsHtml;

    // If the scroll animation observer exists (from scripts.js), make it watch the new cards.
    if (typeof animatedElementsObserver !== 'undefined') {
        document.querySelectorAll('.blog-card, .featured-blog-card').forEach((el) => {
            animatedElementsObserver.observe(el);
        });
    }
});

/**
 * Creates the HTML string for a featured blog post card.
 * @param {object} post - The blog post data object.
 * @returns {string} The HTML string for the card.
 */
function createFeaturedCard(post) {
    const formattedDate = new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    return `
        <div class="featured-blog-card" onclick="openBlogModal('${post.id}')">
            <div class="featured-blog-image" style="background-image: url('${post.imageUrl}');"></div>
            <div class="featured-blog-content">
                <h3>${post.title}</h3>
                <p class="blog-date">${formattedDate}</p>
                <p class="blog-excerpt">${post.excerpt}</p>
                <span class="view-details">Read More →</span>
            </div>
        </div>
    `;
}

/**
 * Creates the HTML string for a standard blog post card in the grid.
 * @param {object} post - The blog post data object.
 * @returns {string} The HTML string for the card.
 */
function createBlogCard(post) {
    return `
        <div class="blog-card" onclick="openBlogModal('${post.id}')">
            <div class="blog-image">
                <img src="${post.imageUrl}" alt="${post.imageAlt}" loading="lazy">
            </div>
            <div class="blog-card-overlay">
                <h3>${post.title}</h3>
            </div>
        </div>
    `;
}

/**
 * Creates the HTML string for a blog post modal.
 * @param {object} post - The blog post data object.
 * @returns {string} The HTML string for the modal.
 */
function createBlogModal(post) {
    const formattedDate = new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const tagsHtml = post.tags.map(tag => `<span class="tag">${tag}</span>`).join('');

    return `
        <div id="${post.id}" class="blog-modal modal--is-open" style="display: none;">
            <div class="blog-modal-content">
                <span class="close-blog-modal" onclick="closeBlogModal('${post.id}')">&times;</span>
                <div class="blog-modal-header">
                    <img src="${post.imageUrl}" alt="${post.imageAlt}">
                </div>
                <div class="blog-modal-body">
                    <h1>${post.title}</h1>
                    <div class="blog-byline">
                        By <span class="author">${post.author}</span> on <span class="date">${formattedDate}</span>
                    </div>
                    <div class="blog-tags">${tagsHtml}</div>
                    <div class="blog-article-content" id="article-content-${post.id}">
                        <p>Loading article...</p>
                    </div>
                    <div class="blog-comments-section">
                        <h3>Comments</h3>
                        <div class="comment-form">
                            <textarea placeholder="Write a comment..."></textarea>
                            <button type="button">Post Comment</button>
                            <p style="font-size:0.8em; color:#888; margin-top:10px;">Note: Comment functionality is for demonstration and is not connected to a database.</p>
                        </div>
                        <div class="comment-list">
                            <p class="no-comments">No comments yet.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}


/**
 * Opens a specific blog modal and fetches its content.
 * @param {string} modalId - The ID of the modal to open.
 */
async function openBlogModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) {
        console.error('Blog modal not found:', modalId);
        return;
    }

    // Set background blur for the header
    const modalHeader = modal.querySelector('.blog-modal-header');
    const modalImg = modalHeader.querySelector('img');
    if (modalImg && modalImg.src) {
        modalHeader.style.backgroundImage = `url(${modalImg.src})`;
    }

    // Display the modal and prevent background scrolling
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    // Find the specific post's data from the global array
    const postData = blogPosts.find(p => p.id === modalId);
    const contentContainer = modal.querySelector(`#article-content-${modalId}`);

    // Fetch and inject the article content if it hasn't been loaded yet
    if (postData && contentContainer && contentContainer.innerHTML.includes('Loading article...')) {
        try {
            const response = await fetch(postData.articleUrl);
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            const articleHtml = await response.text();
            contentContainer.innerHTML = articleHtml;
        } catch (error) {
            contentContainer.innerHTML = `<p style="color:var(--error-red);">Sorry, we couldn't load the article content. Please try again later.</p>`;
            console.error('Error fetching blog article:', error);
        }
    }

    // Scroll the modal content to the top
    const modalContent = modal.querySelector('.blog-modal-content');
    if (modalContent) {
        modalContent.scrollTop = 0;
    }
}

/**
 * Closes a specific blog modal.
 * @param {string} modalId - The ID of the modal to close.
 */
function closeBlogModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
    // This global function (from scripts.js) checks if any other modals are open before restoring scroll
    if (typeof checkAndRestoreScroll === 'function') {
        checkAndRestoreScroll();
    } else {
        // Fallback if the function isn't available for some reason
        document.body.style.overflow = 'auto';
    }
}

// NOTE: The global event listeners for closing modals (clicking the overlay or pressing Escape)
// are located in your main `scripts.js` file and will work for these blog modals as well,
// since they share the '.blog-modal' class and the open/close functions are now defined here.
