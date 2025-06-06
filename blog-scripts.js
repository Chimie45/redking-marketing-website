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
        featured: true,
        fullContent: `
            <div class="article-content">
                <h2>The Convergence of Technology and Entertainment</h2>
                <p>The gaming landscape in 2025 is defined by unprecedented technological fusion. Cloud gaming is no longer a niche but a mainstream reality...</p>
                <!-- Additional content trimmed for brevity -->
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
                <p>Asia is not a monolithic market; it's a vibrant tapestry of diverse cultures, languages, and gaming preferences...</p>
            </div>
        `
    }
    // Add more articles as needed...
]

// Initialize blog page
document.addEventListener('DOMContentLoaded', function () {
    blogArticles.sort((a, b) => new Date(b.date) - new Date(a.date))
    displayFeaturedBlog()
    loadBlogPosts()
})

// Display featured blog
function displayFeaturedBlog() {
    const featuredContainer = document.getElementById('featured-blog-container')
    const featuredArticle = blogArticles.find(article => article.featured)

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
        `
    }
}

// Load all non-featured blog posts into the grid
function loadBlogPosts() {
    const blogGrid = document.getElementById('blog-grid')
    if (!blogGrid) return

    const regularArticles = blogArticles.filter(article => !article.featured)

    blogGrid.innerHTML = regularArticles.map(article => `
        <div class="blog-card" onclick="openBlogArticle('${article.id}')">
            <div class="blog-image">
                <img src="${article.heroImage}" alt="${article.title}" onerror="this.src='https://placehold.co/800x220/1a1a1a/c9b037?text=Image+Not+Found'">
                <div class="blog-overlay">
                    <h3>${article.title}</h3>
                    <span class="blog-date">${formatDate(article.date)}</span>
                    <p class="blog-excerpt">${article.excerpt}</p>
                    <span class="view-details">Read Full Article →</span>
                </div>
            </div>
        </div>
    `).join('')
}

// Open blog article modal
function openBlogArticle(articleId) {
    const article = blogArticles.find(a => a.id === articleId)
    if (!article) return

    const modal = document.getElementById('blogModal')
    const modalHeroImage = document.getElementById('modal-hero-image')
    const modalHeader = modal.querySelector('.blog-modal-header')
    const modalContent = document.getElementById('blog-article-content')

    if (modalHeroImage) {
        modalHeroImage.src = article.heroImage
        modalHeroImage.alt = article.title
    }

    if (modalHeader) {
        modalHeader.style.backgroundImage = `url(${article.heroImage})`
    }

    if (modalContent) {
        modalContent.innerHTML = article.fullContent
    }

    modal.classList.add('modal--is-open')
    document.body.style.overflow = 'hidden'
}

// Close blog modal
function closeBlogModal() {
    const modal = document.getElementById('blogModal')
    if (modal) {
        modal.classList.remove('modal--is-open')
        modal.style.display = 'none'
        document.body.style.overflow = 'auto'
    }
}

// Utility: Format date to readable string
function formatDate(dateStr) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' }
    return new Date(dateStr).toLocaleDateString(undefined, options)
}
