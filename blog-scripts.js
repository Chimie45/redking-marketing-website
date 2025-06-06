// Blog Article Configuration
const blogArticles = [
    {
        id: 'gaming-trends-2025',
        title: 'Gaming Market Trends 2025',
        date: '2025-03-15',
        author: 'Sarah Chen',
        tags: ['Industry Trends', 'Market Analysis', 'Gaming'],
        excerpt: 'Discover the latest trends shaping the gaming industry and how to capitalize on emerging opportunities in global markets.',
        heroImage: 'images/blog/blog-1.jpg',
        articlePath: '/blogs/articles/gaming-trends-2025.html',
        featured: true
    },
    {
        id: 'asian-gaming-markets',
        title: 'Asian Gaming Markets Guide',
        date: '2025-03-08',
        author: 'Michael Park',
        tags: ['Asia', 'Market Entry', 'Localization'],
        excerpt: 'Navigate the complexities of marketing gaming products across diverse Asian markets with cultural insights and regulatory guidance.',
        heroImage: 'images/blog/blog-2.jpg',
        articlePath: '/blogs/articles/asian-gaming-markets.html',
        featured: false
    },
    {
        id: 'igaming-marketing-strategies',
        title: 'iGaming Marketing Strategies',
        date: '2025-02-28',
        author: 'David Thompson',
        tags: ['iGaming', 'Strategy', 'User Acquisition'],
        excerpt: 'Advanced strategies for marketing in highly regulated iGaming environments while maximizing player acquisition and retention.',
        heroImage: 'images/blog/blog-3.jpg',
        articlePath: '/blogs/articles/igaming-marketing-strategies.html',
        featured: false
    },
    {
        id: 'social-media-gaming-brands',
        title: 'Social Media for Gaming Brands',
        date: '2025-02-20',
        author: 'Emily Rodriguez',
        tags: ['Social Media', 'Community', 'Engagement'],
        excerpt: 'Building authentic communities and driving engagement through strategic social media marketing in the gaming industry.',
        heroImage: 'images/blog/blog-4.jpg',
        articlePath: '/blogs/articles/social-media-gaming-brands.html',
        featured: false
    },
    {
        id: 'user-acquisition-best-practices',
        title: 'User Acquisition Best Practices',
        date: '2025-02-12',
        author: 'James Wilson',
        tags: ['User Acquisition', 'Mobile Gaming', 'Performance Marketing'],
        excerpt: 'Data-driven approaches to mobile game user acquisition that maximize ROI and long-term player value.',
        heroImage: 'images/blog/blog-5.jpg',
        articlePath: '/blogs/articles/user-acquisition-best-practices.html',
        featured: false
    },
    {
        id: 'gaming-localization-strategies',
        title: 'Gaming Localization Strategies',
        date: '2025-02-05',
        author: 'Lisa Zhang',
        tags: ['Localization', 'Global Marketing', 'Cultural Adaptation'],
        excerpt: 'Essential strategies for localizing gaming content and marketing campaigns for global audiences while maintaining brand authenticity.',
        heroImage: 'images/blog/blog-6.jpg',
        articlePath: '/blogs/articles/gaming-localization-strategies.html',
        featured: false
    }
];

// Variables for pagination
let currentPage = 1;
const articlesPerPage = 6;
let displayedArticles = [];

// Initialize blog page
document.addEventListener('DOMContentLoaded', function() {
    // Sort articles by date (most recent first)
    blogArticles.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Display featured blog
    displayFeaturedBlog();
    
    // Display initial blog posts
    loadBlogPosts();
});

// Display featured blog
function displayFeaturedBlog() {
    const featuredContainer = document.getElementById('featured-blog-container');
    const featuredArticle = blogArticles.find(article => article.featured);
    
    if (featuredArticle && featuredContainer) {
        featuredContainer.innerHTML = `
            <div class="featured-blog-card" onclick="openBlogArticle('${featuredArticle.id}')">
                <div class="featured-blog-image">
                    <img src="${featuredArticle.heroImage}" alt="${featuredArticle.title}">
                    <div class="featured-blog-overlay">
                        <div class="featured-blog-info">
                            <span class="featured-label">Featured Article</span>
                            <h3>${featuredArticle.title}</h3>
                            <p class="blog-meta">
                                <span class="blog-date">${formatDate(featuredArticle.date)}</span>
                                <span class="blog-author">by ${featuredArticle.author}</span>
                            </p>
                            <p class="blog-excerpt">${featuredArticle.excerpt}</p>
                            <span class="view-details">Read Full Article →</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

// Load blog posts with pagination
function loadBlogPosts() {
    const blogGrid = document.getElementById('blog-grid');
    const loadMoreBtn = document.getElementById('load-more-btn');
    
    // Filter out featured article from regular grid
    const regularArticles = blogArticles.filter(article => !article.featured);
    
    // Calculate which articles to show
    const startIndex = (currentPage - 1) * articlesPerPage;
    const endIndex = startIndex + articlesPerPage;
    const articlesToShow = regularArticles.slice(0, endIndex);
    
    // Clear grid and rebuild with all articles up to current page
    blogGrid.innerHTML = '';
    
    articlesToShow.forEach(article => {
        const blogCard = createBlogCard(article);
        blogGrid.appendChild(blogCard);
    });
    
    // Show/hide load more button
    if (endIndex < regularArticles.length) {
        loadMoreBtn.style.display = 'inline-block';
        loadMoreBtn.onclick = () => {
            currentPage++;
            loadBlogPosts();
        };
    } else {
        loadMoreBtn.style.display = 'none';
    }
    
    // Re-observe new elements for animations
    if (typeof animatedElementsObserver !== 'undefined') {
        blogGrid.querySelectorAll('.blog-card').forEach((el) => {
            animatedElementsObserver.observe(el);
        });
    }
}

// Create blog card element
function createBlogCard(article) {
    const div = document.createElement('div');
    div.className = 'blog-card';
    div.onclick = () => openBlogArticle(article.id);
    
    div.innerHTML = `
        <div class="blog-image">
            <img src="${article.heroImage}" alt="${article.title}">
            <div class="blog-overlay">
                <div class="blog-info">
                    <div class="blog-text">
                        <h3>${article.title}</h3>
                        <p class="blog-date">${formatDate(article.date)}</p>
                        <p class="blog-excerpt">${article.excerpt}</p>
                    </div>
                    <span class="view-details">Read More →</span>
                </div>
            </div>
        </div>
    `;
    
    return div;
}

// Open blog article in modal
async function openBlogArticle(articleId) {
    const article = blogArticles.find(a => a.id === articleId);
    if (!article) return;
    
    const modal = document.getElementById('blogModal');
    const modalImage = document.getElementById('modal-hero-image');
    const contentContainer = document.getElementById('blog-article-content');
    
    // Set hero image
    modalImage.src = article.heroImage;
    modalImage.alt = article.title;
    
    // Show loading state
    contentContainer.innerHTML = '<p>Loading article...</p>';
    
    // Open modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    try {
        // Fetch article content
        const response = await fetch(article.articlePath);
        if (!response.ok) throw new Error('Article not found');
        
        const html = await response.text();
        
        // Parse the HTML to extract just the article content
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const articleContent = doc.querySelector('.article-content') || doc.querySelector('article') || doc.querySelector('main');
        
        // Display article with metadata
        contentContainer.innerHTML = `
            <div class="blog-meta">
                <span class="blog-date">${formatDate(article.date)}</span>
                <span class="blog-author">by ${article.author}</span>
            </div>
            <h1>${article.title}</h1>
            <div class="blog-tags">
                ${article.tags.map(tag => `<span class="blog-tag">${tag}</span>`).join('')}
            </div>
            <div class="blog-content">
                ${articleContent ? articleContent.innerHTML : '<p>Article content not found.</p>'}
            </div>
        `;
        
        // Scroll to top of modal content
        const modalContent = modal.querySelector('.blog-modal-content');
        if (modalContent) modalContent.scrollTop = 0;
        
    } catch (error) {
        console.error('Error loading article:', error);
        contentContainer.innerHTML = `
            <div class="blog-meta">
                <span class="blog-date">${formatDate(article.date)}</span>
                <span class="blog-author">by ${article.author}</span>
            </div>
            <h1>${article.title}</h1>
            <div class="blog-tags">
                ${article.tags.map(tag => `<span class="blog-tag">${tag}</span>`).join('')}
            </div>
            <div class="blog-content">
                <p>We're sorry, but this article is currently unavailable. Please check back later or contact us for more information.</p>
            </div>
        `;
    }
}

// Close blog modal
function closeBlogModal() {
    const modal = document.getElementById('blogModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Format date helper
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Add event listeners for modal closing
window.addEventListener('click', function(event) {
    const modal = document.getElementById('blogModal');
    if (event.target === modal) {
        closeBlogModal();
    }
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeBlogModal();
    }
});
