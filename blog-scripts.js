// --- Blog Content Management ---
// UPDATED: Changed placeholder image names for two articles to be more descriptive.
const blogArticles = [
    {
        id: 'effective-igaming-marketing',
        isFeatured: true,
        title: 'Effective Marketing in Regulated iGaming Sectors',
        excerpt: 'A deep dive into the high-risk, high-reward iGaming markets of Japan and South Korea, analyzing the Ohtani scandal and the strategies for navigating these regulatory minefields.',
        thumbnail: 'images/blog/igaming-article-hero.jpg',
        heroImage: 'images/blog/igaming-article-hero.jpg',
        contentUrl: 'blogs/articles/effective-igaming-marketing'
    },
    {
        id: 'latam-cultural-credibility',
        isFeatured: false,
        title: 'Cultural Credibility: What iGaming Brands Get Wrong in LATAM',
        excerpt: 'An honest look at why many global iGaming campaigns fall flat in Latin America and how to fix it through regional teams, slang fluency, and local content creation.',
        thumbnail: 'images/blog/latam-cultural-thumb.jpg',
        heroImage: 'images/blog/latam-cultural-hero.jpg',
        contentUrl: 'blogs/articles/latam-cultural-credibility'
    },
    {
        id: 'korea-igaming-potential',
        isFeatured: false,
        title: 'The Untapped Potential of Korea\'s iGaming Audience—And What\'s Holding It Back',
        excerpt: 'A deep dive into Korea\'s unique legal and cultural challenges around iGaming, why local interest still exists despite restrictions, and how global brands can engage Korean users responsibly.',
        thumbnail: 'images/blog/korea-igaming-thumb.jpg',
        heroImage: 'images/blog/korea-igaming-hero.jpg',
        contentUrl: 'blogs/articles/korea-igaming-potential'
    },
    {
        id: 'latam-learns-from-asia',
        isFeatured: false,
        title: 'What LATAM Gaming Companies Can Learn from Asia\'s Mobile Gaming Boom',
        excerpt: 'Latin America\'s booming mobile market can unlock its potential by adapting proven strategies from Asia\'s $40+ billion ecosystem on cultural integration, monetization, and community design.',
        thumbnail: 'images/blog/latam-asia-hero.jpg',
        heroImage: 'images/blog/latam-asia-hero.jpg',
        contentUrl: 'blogs/articles/latam-learns-from-asia'
    },
    {
        id: 'gaming-trends-2025',
        isFeatured: false,
        title: 'Gaming Market Trends 2025',
        excerpt: 'Discover the latest trends shaping the gaming industry and how to capitalize on emerging opportunities in global markets.',
        thumbnail: 'images/blog/gaming-trends-2025.jpg',
        heroImage: 'images/blog/gaming-trends-2025.jpg',
        contentUrl: 'blogs/articles/gaming-trends-2025'
    },
    {
        id: 'asian-gaming-markets',
        isFeatured: false,
        title: 'Asian Gaming Markets Guide',
        excerpt: 'Unlock the potential of the world\'s largest gaming region. This guide breaks down the key differences between markets like Japan, South Korea, and Southeast Asia.',
        thumbnail: 'images/blog/asian-gaming-markets.jpg',
        heroImage: 'images/blog/asian-gaming-markets.jpg',
        contentUrl: 'blogs/articles/asian-gaming-markets'
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

    modalTitle.textContent = articleData.title;
    modalHeroImage.src = articleData.heroImage;
    modalHeroImage.alt = articleData.title;
    modalMeta.innerHTML = '';
    modalContent.innerHTML = '<p>Loading article...</p>';

    modal.classList.add('modal--is-open');
    document.body.style.overflow = 'hidden';
    modal.querySelector('.blog-modal-content').scrollTop = 0;

    if (!articleData.contentUrl) {
        modalContent.innerHTML = '<p>Article content is not available yet. Please check back later.</p>';
        return;
    }

    try {
        const response = await fetch(articleData.contentUrl, { redirect: 'error' });

        if (!response.ok) {
            throw new Error(`Could not load article. Server responded with status: ${response.status}`);
        }
        
        const htmlString = await response.text();
        
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, 'text/html');

        const author = doc.querySelector('meta[name="author"]')?.getAttribute('content') || 'Unknown Author';
        const creationDateStr = doc.querySelector('meta[name="creation-date"]')?.getAttribute('content');
        
        let displayDate = 'Unknown Date';
        if (creationDateStr) {
            const date = new Date(creationDateStr + 'T00:00:00');
            displayDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
        }

        const articleBody = doc.querySelector('.article-content .article-body')?.innerHTML || doc.querySelector('.article-content')?.innerHTML || '<p>Could not find article content.</p>';

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
