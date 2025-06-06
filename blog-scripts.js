// --- Blog Content Management ---
// The array now only holds data needed for the blog index page.
// The modal will fetch all content, including metadata, from the article files.
const blogArticles = [
    {
        id: 'gaming-trends-2025',
        isFeatured: true,
        title: 'Top 5 Gaming Market Trends to Watch in 2025',
        excerpt: 'From the rise of cloud gaming to the impact of Web3, discover the key trends shaping the future of the gaming industry and how your marketing can adapt.',
        thumbnail: 'images/blog/blog-1.jpg',
        heroImage: 'images/blog/blog-1.jpg',
        contentUrl: 'blog/articles/gaming-trends-2025.html'
    },
    {
        id: 'asian-gaming-markets',
        isFeatured: false,
        title: 'A Marketer\'s Guide to Asian Gaming Markets',
        excerpt: 'Unlock the potential of the world\'s largest gaming region. This guide breaks down the key differences between markets like Japan, South Korea, and Southeast Asia.',
        thumbnail: 'images/blog/blog-2.jpg',
        heroImage: 'images/blog/blog-2.jpg',
        contentUrl: 'blog/articles/asian-gaming-markets.html'
    },
    {
        id: 'igaming-strategies',
        isFeatured: false,
        title: 'Effective Marketing in Regulated iGaming Sectors',
        excerpt: 'Navigating the complex regulations of iGaming requires a specialized approach. Learn advanced strategies for player acquisition and retention while ensuring compliance.',
        thumbnail: 'images/blog/blog-3.jpg',
        heroImage: 'images/blog/blog-3.jpg',
        contentUrl: '' // Add URL when available
    },
    {
        id: 'community-management-power',
        isFeatured: false,
        title: 'The Power of Community: Building a Brand Beyond the Game',
        excerpt: 'Your game is just the beginning. Discover how strategic community management on platforms like Discord and Reddit can build lasting player loyalty and drive organic growth.',
        thumbnail: 'images/blog/blog-4.jpg',
        heroImage: 'images/blog/blog-4.jpg',
        contentUrl: '' // Add URL when available
    },
    {
        id: 'user-acquisition-roi',
        isFeatured: false,
        title: 'Maximizing ROI in Mobile User Acquisition Campaigns',
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
// These functions build the cards on the main blog page using the data above.
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
 * NEW: Opens the modal and fetches all content, including metadata, from the article's HTML file.
 * @param {string} articleId - The ID of the article to display.
 */
async function openBlogModal(articleId) {
    const articleData = blogArticles.find(a => a.id === articleId);
    const modal = document.getElementById('blog-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalMeta = document.getElementById('modal-meta');
    const modalContent = document.getElementById('modal-content');
    const modalHeroImage = document.getElementById('modal-hero-image');

    if (!articleData || !modal) {
        console.error('Article data or modal element not found.');
        return;
    }

    // Pre-populate with card data and show a loading state
    modalTitle.textContent = articleData.title;
    modalHeroImage.src = articleData.heroImage;
    modalHeroImage.alt = articleData.title;
    modalMeta.innerHTML = '';
    modalContent.innerHTML = '<p>Loading article...</p>';

    // Show the modal
    modal.classList.add('modal--is-open');
    document.body.style.overflow = 'hidden';
    modal.querySelector('.blog-modal-content').scrollTop = 0;

    // Check if there is a URL to fetch
    if (!articleData.contentUrl) {
        modalContent.innerHTML = '<p>Article content is not available yet. Please check back later.</p>';
        return;
    }

    try {
        // Fetch with redirect prevention to stop it from loading the homepage on a 404 error
        const response = await fetch(articleData.contentUrl, { redirect: 'error' });

        if (!response.ok) {
            throw new Error(`Could not load article. Server responded with status: ${response.status}`);
        }
        
        const htmlString = await response.text();
        
        // Use DOMParser to safely parse the fetched HTML string
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, 'text/html');

        // Extract metadata from the parsed HTML document's meta tags
        const author = doc.querySelector('meta[name="author"]')?.getAttribute('content') || 'Unknown Author';
        const creationDateStr = doc.querySelector('meta[name="creation-date"]')?.getAttribute('content');
        
        // Format the date for display
        let displayDate = 'Unknown Date';
        if (creationDateStr) {
            const date = new Date(creationDateStr + 'T00:00:00'); // Assume UTC date
            displayDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
        }

        // Extract the main article content
        const articleBody = doc.querySelector('.article-content')?.innerHTML || '<p>Could not find article content.</p>';

        // Populate the modal with the extracted, definitive content
        modalTitle.textContent = doc.querySelector('title')?.textContent || articleData.title;
        modalMeta.innerHTML = `
            <span><strong>By:</strong> ${author}</span>
            <span><strong>Date:</strong> ${displayDate}</span>
        `;
        modalContent.innerHTML = articleBody;

    } catch (error) {
        console.error('Error fetching article content:', error);
        modalContent.innerHTML = `<p>Sorry, there was an error loading the article. Please check that the file path is correct or try again later.</p>`;
    }
}


function closeBlogModal() {
    const modal = document.getElementById('blog-modal');
    if (modal) {
        modal.classList.remove('modal--is-open');
    }
    checkAndRestoreScroll();
}
