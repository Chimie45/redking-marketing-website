// --- Blog Content Management ---
const blogArticles = [
    {
        id: 'featured-gaming-trends-2025',
        isFeatured: true,
        title: 'Top 5 Gaming Market Trends to Watch in 2025',
        author: 'Sarah Chen',
        date: 'June 5, 2025',
        excerpt: 'From the rise of cloud gaming to the impact of Web3, discover the key trends shaping the future of the gaming industry and how your marketing can adapt.',
        thumbnail: 'images/blog/blog-1.jpg',
        heroImage: 'images/blog/blog-1.jpg',
        content: `
            <p>The gaming landscape is in a perpetual state of evolution, and 2025 is shaping up to be a landmark year. As technology advances and player expectations shift, marketers must stay ahead of the curve to remain effective. Here are the five most critical trends to watch.</p>
            <h2>1. Cloud Gaming Goes Mainstream</h2>
            <p>Services like Xbox Cloud Gaming and GeForce NOW are maturing rapidly, removing the hardware barrier for millions of potential players. This democratizes access to high-fidelity games, but it also means marketing needs to target a much broader demographic who may not identify as "traditional" gamers.</p>
            <h2>2. The "AAA" Mobile Experience</h2>
            <p>Mobile gaming is no longer just about hyper-casual titles. We're seeing a surge in high-budget, graphically intensive games on mobile that rival their console counterparts. Marketing for these titles requires a focus on quality, storytelling, and community-building, much like a traditional AAA launch.</p>
            <h2>3. AI-Driven Personalization</h2>
            <p>Artificial intelligence is set to revolutionize in-game experiences and marketing. From dynamically adjusting difficulty to offering personalized in-game store promotions, AI allows for a level of individualized engagement that was previously impossible. Marketers who leverage player data ethically will build deeper, more loyal communities.</p>
            <h2>4. Web3 and Digital Ownership</h2>
            <p>While still controversial, the concepts of NFTs and blockchain technology are finding their footing. The core idea of "true digital ownership" resonates with players. Successful marketing in this space will prioritize transparency, community governance, and providing real, tangible value to players who invest in the ecosystem.</p>
            <h2>5. The Creator Economy Matures</h2>
            <p>Influencer marketing is evolving into a more integrated creator economy. Rather than one-off sponsorships, brands are building long-term partnerships with creators, co-creating content, and even integrating them into the game world itself. Authenticity is paramount, and the most successful campaigns will empower creators rather than just using them as billboards.</p>
        `
    },
    {
        id: 'asia-market-guide',
        isFeatured: false,
        title: 'A Marketer\'s Guide to Asian Gaming Markets',
        author: 'Michael Park',
        date: 'May 28, 2025',
        excerpt: 'Unlock the potential of the world\'s largest gaming region. This guide breaks down the key differences between markets like Japan, South Korea, and Southeast Asia.',
        thumbnail: 'images/blog/blog-2.jpg',
        heroImage: 'images/blog/blog-2.jpg',
        content: '<p>Content for A Marketer\'s Guide to Asian Gaming Markets is coming soon.</p>'
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
        content: '<p>Content for Effective Marketing in Regulated iGaming Sectors is coming soon.</p>'
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
        content: '<p>Content for The Power of Community is coming soon.</p>'
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
        content: '<p>Content for Maximizing ROI in Mobile User Acquisition is coming soon.</p>'
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
    
    // **FIX ADDED**: After adding the card, tell the observer to watch it.
    if (typeof animatedElementsObserver !== 'undefined') {
        const cardElement = featuredContainer.querySelector('.featured-article-card');
        if(cardElement) {
            // We give it the .blog-card class temporarily for the animation system to work
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

    // **FIX ADDED**: After adding all the cards, tell the observer to watch them.
    if (typeof animatedElementsObserver !== 'undefined') {
        gridContainer.querySelectorAll('.blog-card').forEach(card => {
            animatedElementsObserver.observe(card);
        });
    }
}


// --- Modal Functionality ---

function openBlogModal(articleId) {
    const article = blogArticles.find(a => a.id === articleId);
    const modal = document.getElementById('blog-modal');

    if (!article || !modal) {
        console.error('Article or modal not found.');
        return;
    }

    // Populate Modal Content
    document.getElementById('modal-hero-image').src = article.heroImage;
    document.getElementById('modal-hero-image').alt = article.title;
    document.getElementById('modal-title').textContent = article.title;
    document.getElementById('modal-meta').innerHTML = `
        <span><strong>By:</strong> ${article.author}</span>
        <span><strong>Date:</strong> ${article.date}</span>
    `;
    document.getElementById('modal-content').innerHTML = article.content;

    // Show Modal
    modal.classList.add('modal--is-open');
    document.body.style.overflow = 'hidden';

    modal.querySelector('.blog-modal-content').scrollTop = 0;
}

function closeBlogModal() {
    const modal = document.getElementById('blog-modal');
    if (modal) {
        modal.classList.remove('modal--is-open');
    }
    checkAndRestoreScroll();
}
