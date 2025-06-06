// Blog Article Configuration
// Article content is now included directly here to avoid fetch errors
const blogArticles = [
    {
        id: 'gaming-trends-2025',
        title: 'Gaming Market Trends 2025',
        date: '2025-03-15',
        author: 'Sarah Chen',
        tags: ['Industry Trends', 'Market Analysis', 'Gaming'],
        excerpt: 'Discover the latest trends shaping the gaming industry and how to capitalize on emerging opportunities in global markets.',
        heroImage: 'images/blog/blog-1.jpg',
        featured: true,
        fullContent: `
            <div class="article-content">
                <h2>The Convergence of Technology and Entertainment</h2>
                <p>The gaming landscape in 2025 is defined by unprecedented technological fusion. Cloud gaming is no longer a niche but a mainstream reality, offering console-quality experiences across devices. This shift democratizes access to high-fidelity games, but also presents new marketing challenges in reaching a broader, more diverse audience.</p>
                
                <h2>Mobile Gaming's Next Evolution</h2>
                <p>Mobile gaming continues its dominance, but with a twist. The focus is shifting from hyper-casual to deeper, more engaging "Triple-A" mobile experiences. Augmented Reality (AR) is finally finding its footing with compelling use cases that blend the real and virtual worlds, creating powerful marketing opportunities for brands.</p>
                
                <h2>Web3 and Player Ownership</h2>
                <p>While still nascent, Web3 technologies and the concept of true digital ownership are gaining traction. Marketers must learn to navigate this new paradigm, focusing on community-building and transparency rather than traditional advertising. The most successful campaigns will empower players and give them a tangible stake in the game's ecosystem.</p>
                
                <h2>Marketing Strategies for 2025</h2>
                <ul>
                    <li><strong>Community-Led Growth:</strong> Build authentic relationships with players through Discord, creator collaborations, and transparent development roadmaps.</li>
                    <li><strong>Data-Driven Personalization:</strong> Utilize analytics to deliver tailored in-game offers, content, and messaging that enhances the player experience.</li>
                    <li><strong>Cross-Platform Narratives:</strong> Create cohesive brand stories that extend beyond the game itself into social media, streaming content, and real-world events.</li>
                </ul>
            </div>
        `
    },
    {
        id: 'asian-gaming-markets',
        title: 'Asian Gaming Markets Guide',
        date: '2025-03-08',
        author: 'Michael Park',
        tags: ['Asia', 'Market Entry', 'Localization'],
        excerpt: 'Navigate the complexities of marketing gaming products across diverse Asian markets with cultural insights and regulatory guidance.',
        heroImage: 'images/blog/blog-2.jpg',
        featured: false,
        fullContent: `
             <div class="article-content">
                <h2>A Continent of Gamers</h2>
                <p>Asia is not a monolithic market; it's a vibrant tapestry of diverse cultures, languages, and gaming preferences. A one-size-fits-all approach is doomed to fail. Success requires deep cultural understanding and a willingness to adapt your product and marketing from the ground up.</p>
                
                <h2>Country-Specific Insights</h2>
                <ul>
                    <li><strong>Japan:</strong> A market that reveres story, polish, and iconic IP. Gacha mechanics are prevalent, but a strong narrative is key to retention. Marketing often leans on high-profile collaborations and voice actor promotions.</li>
                    <li><strong>South Korea:</strong> Dominated by competitive PC gaming (esports) and highly social mobile RPGs. Visually stunning graphics and community-focused events are critical. Influencer marketing with top-tier streamers is essential.</li>
                    <li><strong>China:</strong> The largest market, but with significant regulatory hurdles. Mobile is king, and social integration via platforms like WeChat is non-negotiable. Partnering with a local publisher is almost always required.</li>
                    <li><strong>Southeast Asia (SEA):</strong> A mobile-first region with immense growth potential. Localization must account for dozens of languages and dialects. Pricing strategies must be adapted to varying economic conditions.</li>
                </ul>

                <h2>Common Pitfalls to Avoid</h2>
                <p>Many Western developers fail by simply translating their game. True localization involves adapting art styles, themes, monetization strategies, and community management to fit local expectations. Ignoring cultural nuances or failing to understand the regulatory environment can lead to costly mistakes.</p>
            </div>
        `
    },
    {
        id: 'igaming-marketing-strategies',
        title: 'iGaming Marketing Strategies',
        date: '2025-02-28',
        author: 'David Thompson',
        tags: ['iGaming', 'Strategy', 'User Acquisition'],
        excerpt: 'Advanced strategies for marketing in highly regulated iGaming environments while maximizing player acquisition and retention.',
        heroImage: 'images/blog/blog-3.jpg',
        featured: false,
        fullContent: `<p>Content for iGaming Marketing Strategies coming soon.</p>`
    },
    {
        id: 'social-media-gaming-brands',
        title: 'Social Media for Gaming Brands',
        date: '2025-02-20',
        author: 'Emily Rodriguez',
        tags: ['Social Media', 'Community', 'Engagement'],
        excerpt: 'Building authentic communities and driving engagement through strategic social media marketing in the gaming industry.',
        heroImage: 'images/blog/blog-4.jpg',
        featured: false,
        fullContent: `<p>Content for Social Media for Gaming Brands coming soon.</p>`
    },
    {
        id: 'user-acquisition-best-practices',
        title: 'User Acquisition Best Practices',
        date: '2025-02-12',
        author: 'James Wilson',
        tags: ['User Acquisition', 'Mobile Gaming', 'Performance Marketing'],
        excerpt: 'Data-driven approaches to mobile game user acquisition that maximize ROI and long-term player value.',
        heroImage: 'images/blog/blog-5.jpg',
        featured: false,
        fullContent: `<p>Content for User Acquisition Best Practices coming soon.</p>`
    }
];

// Initialize blog page
document.addEventListener('DOMContentLoaded', function() {
    // Sort articles by date (most recent first)
    blogArticles.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Display the single featured blog
    displayFeaturedBlog();
    
    // Display all other blog posts
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
                    <img src="${featuredArticle.heroImage}" alt="${featuredArticle.title}" onerror="this.src='https://placehold.co/1000x450/1a1a1a/c9b037?text=Image+Not+Found'">
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

// Load all non-featured blog posts into the grid
function loadBlogPosts() {
    const blogGrid = document.getElementById('blog-grid');
    if (!blogGrid) return;
    
    // Filter out the featured article to get the rest
    const regularArticles = blogArticles.filter(article => !article.featured);
    
    // Clear any existing content
    blogGrid.innerHTML = '';
    
    // Create and append a card for each regular article
    regularArticles.forEach(article => {
        const blogCard = createBlogCard(article);
        blogGrid.appendChild(blogCard);
    });
    
    // Re-observe new elements for animations if the observer exists (from scripts.js)
    if (typeof animatedElementsObserver !== 'undefined') {
        blogGrid.querySelectorAll('.blog-card').forEach((el) => {
            animatedElementsObserver.observe(el);
        });
    }
}

// Create blog card element for the grid
function createBlogCard(article) {
    const div = document.createElement('div');
    div.className = 'blog-card';
    div.onclick = () => openBlogArticle(article.id);
    
    div.innerHTML = `
        <div class="blog-image">
            <img src="${article.heroImage}" alt="${article.title}" onerror="this.src='https://placehold.co/350x220/1a1a1a/c9b037?text=Image+Not+Found'">
        </div>
        <div class="blog-overlay">
            <div class="blog-info">
                <h3>${article.title}</h3>
                <p class="blog-date">${formatDate(article.date)}</p>
                <p class="blog-excerpt">${article.excerpt}</p>
                <span class="view-details">Read More →</span>
            </div>
        </div>
    `;
    
    return div;
}

// Open blog article in modal
function openBlogArticle(articleId) {
    const article = blogArticles.find(a => a.id === articleId);
    if (!article) return;
    
    const modal = document.getElementById('blogModal');
    if (!modal) return;
    
    const modalImage = document.getElementById('modal-hero-image');
    const contentContainer = document.getElementById('blog-article-content');
    
    // Set hero image and add an error handler
    modalImage.src = article.heroImage;
    modalImage.alt = article.title;
    modalImage.onerror = () => { 
        modalImage.src = 'https://placehold.co/900x350/1a1a1a/c9b037?text=Image+Not+Found';
    };

    // Add or remove a class to the modal for specific styling
    if (article.featured) {
        modal.classList.add('featured-article-modal');
    } else {
        modal.classList.remove('featured-article-modal');
    }
    
    // Display article with metadata from the JS object
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
            ${article.fullContent || '<p>Article content could not be loaded.</p>'}
        </div>
    `;
    
    // Open modal using the class from scripts.js for consistency
    modal.classList.add('modal--is-open');

    // Scroll to top of modal content
    const modalContent = modal.querySelector('.blog-modal-content');
    if (modalContent) modalContent.scrollTop = 0;
}

// Close blog modal
function closeBlogModal() {
    const modal = document.getElementById('blogModal');
    if (modal) {
        // Close modal using the class from scripts.js
        modal.classList.remove('modal--is-open');
    }
}

// Format date helper
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Note: The global event listeners for closing the modal via Escape key or
// clicking the overlay are already present in your main 'scripts.js' file
// and should now work correctly with closeBlogModal().
