// --- Blog Content Management ---
// Article data now points to external HTML files for content.
const blogArticles = [
    {
        id: 'gaming-trends-2025',
        isFeatured: true,
        title: 'Top 5 Gaming Market Trends to Watch in 2025',
        author: 'Sarah Chen',
        date: 'June 5, 2025',
        excerpt: 'From the rise of cloud gaming to the impact of Web3, discover the key trends shaping the future of the gaming industry and how your marketing can adapt.',
        thumbnail: 'images/blog/blog-1.jpg',
        heroImage: 'images/blog/blog-1.jpg',
        contentUrl: 'blog/articles/gaming-trends-2025.html'
    },
    {
        id: 'asian-gaming-markets',
        isFeatured: false,
        title: 'A Marketer\'s Guide to Asian Gaming Markets',
        author: 'Michael Park',
        date: 'May 28, 2025',
        excerpt: 'Unlock the potential of the world\'s largest gaming region. This guide breaks down the key differences between markets like Japan, South Korea, and Southeast Asia.',
        thumbnail: 'images/blog/blog-2.jpg',
        heroImage: 'images/blog/blog-2.jpg',
        contentUrl: 'blog/articles/asian-gaming-markets.html'
    },
    {
        id: 'igaming-strategies',
        isFeatured: false,
        title: 'Effective Marketing in Regulated iGaming Sectors',
        author: 'David Thompson',
        date: 'May 15, 2025',
        excerpt: 'Navigating the complex regulations of iGaming requires a specialized approach. Learn advanced strategies for player acquisition and retention while ensuring compliance.',
        thumbnail: 'images/blog/blog-3.jpg',
        heroImage: 'images/blog/blog-3.jpg',
        contentUrl: '' // Add URL when available
    },
    {
        id: 'community-management-power',
        isFeatured: false,
        title: 'The Power of Community: Building a Brand Beyond the Game',
        author: 'Emily Rodriguez',
        date: 'May 1, 2025',
        excerpt: 'Your game is just the beginning. Discover how strategic community management on platforms like Discord and Reddit can build lasting player loyalty and drive organic growth.',
        thumbnail: 'images/blog/blog-4.jpg',
        heroImage: 'images/blog/blog-4.jpg',
        contentUrl: '' // Add URL when available
    },
    {
        id: 'user-acquisition-roi',
        isFeatured: false,
        title: 'Maximizing ROI in Mobile User Acquisition Campaigns',
        author: 'James Wilson',
        date: 'April 22, 2025',
        excerpt: 'Don\'t just acquire users—acquire valuable players. We dive into data-driven techniques for optimizing your UA spend and increasing long-term player value.',
        thumbnail: 'images/blog/blog-5.jpg',
        heroImage: 'images/blog/blog-5.jpg',
        contentUrl: '' // Add URL when available
    }
];

// --- Page Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    displayFeaturedArticle();
    displayLatestArticles();
});

// --- Dynamic Content Functions ---
function displayFeaturedArticle() {
    const featuredContainer = document.getElementById('featured-article-container');
    const featuredArticle = blogArticles.find(article => article.isFeatured);

    if (!featuredContainer || !featuredArticle) return;

    const articleHTML = `
        <div class="featured-article-card" onclick="openBlogModal('${featuredArticle.id}')">
            <div class="featured-article-image">
                <img src="${featuredArticle.heroImage}" alt="${featuredArticle.title}">
            </div>
            <div class="featured-article-content">
                <span class="featured-tag">Featured Article</span>
                <h2>${featuredArticle.title}</h2>
                <p class="article-excerpt">${featuredArticle.excerpt}</p>
                <span class="read-more-link">Read Full Story &rarr;</span>
            </div>
        </div>
    `;
    featuredContainer.innerHTML = articleHTML;
    
    if (typeof animatedElementsObserver !== 'undefined') {
        const cardElement = featuredContainer.querySelector('.featured-article-card');
        if(cardElement) {
            cardElement.classList.add('blog-card'); 
            animatedElementsObserver.observe(cardElement);
        }
    }
}

function displayLatestArticles() {
    const gridContainer = document.getElementById('blog-grid-container');
    const latestArticles = blogArticles.filter(article => !article.isFeatured);

    if (!gridContainer) return;

    let articlesHTML = '';
    latestArticles.forEach(article => {
        articlesHTML += `
            <div class="blog-card" onclick="openBlogModal('${article.id}')">
                <div class="blog-card-thumbnail">
                    <img src="${article.thumbnail}" alt="${article.title}">
                </div>
                <div class="blog-card-content">
                    <h3>${article.title}</h3>
                    <p class="article-excerpt">${article.excerpt}</p>
                    <span class="read-more-link">Read More &rarr;</span>
                </div>
            </div>
        `;
    });
    gridContainer.innerHTML = articlesHTML;

    if (typeof animatedElementsObserver !== 'undefined') {
        gridContainer.querySelectorAll('.blog-card').forEach(card => {
            animatedElementsObserver.observe(card);
        });
    }
}

// --- Modal Functionality ---

/**
 * Opens the blog modal and fetches content from the article's URL.
 * @param {string} articleId - The ID of the article to display.
 */
async function openBlogModal(articleId) {
    const article = blogArticles.find(a => a.id === articleId);
    const modal = document.getElementById('blog-modal');
    const modalContentContainer = document.getElementById('modal-content');

    if (!article || !modal) {
        console.error('Article or modal not found.');
        return;
    }

    // Populate static parts of the modal immediately
    document.getElementById('modal-hero-image').src = article.heroImage;
    document.getElementById('modal-hero-image').alt = article.title;
    document.getElementById('modal-title').textContent = article.title;
    document.getElementById('modal-meta').innerHTML = `
        <span><strong>By:</strong> ${article.author}</span>
        <span><strong>Date:</strong> ${article.date}</span>
    `;

    // Show modal and set a loading state
    modalContentContainer.innerHTML = '<p>Loading article...</p>';
    modal.classList.add('modal--is-open');
    document.body.style.overflow = 'hidden';
    modal.querySelector('.blog-modal-content').scrollTop = 0;

    // Fetch and display the full article content
    if (!article.contentUrl) {
        modalContentContainer.innerHTML = '<p>Article content is not available yet. Please check back later.</p>';
        return;
    }

    try {
        const response = await fetch(article.contentUrl);
        if (!response.ok) {
            throw new Error(`Could not load article. Server responded with status: ${response.status}`);
        }
        const htmlContent = await response.text();
        modalContentContainer.innerHTML = htmlContent;
    } catch (error) {
        console.error('Error fetching article content:', error);
        modalContentContainer.innerHTML = `<p>Sorry, there was an error loading the article. Please try again later.</p>`;
    }
}

function closeBlogModal() {
    const modal = document.getElementById('blog-modal');
    if (modal) {
        modal.classList.remove('modal--is-open');
    }
    checkAndRestoreScroll();
}
