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
        <p>The gaming landscape in 2025 is defined by unprecedented technological fusion...</p>
      </div>
    `
  },
  {
    id: 'asian-gaming-markets',
    title: 'Asian Gaming Markets Guide',
    date: '2025-03-08',
    author: 'Michael Park',
    tags: ['Asia', 'Market Entry', 'Localization'],
    excerpt: 'Navigate the complexities of marketing gaming products across diverse Asian markets...',
    heroImage: 'images/blog/blog-2.jpg',
    featured: false,
    fullContent: `
      <div class="article-content">
        <h2>A Continent of Gamers</h2>
        <p>Asia is not a monolithic market...</p>
      </div>
    `
  },
  // Add more articles as needed
]

document.addEventListener('DOMContentLoaded', () => {
  blogArticles.sort((a, b) => new Date(b.date) - new Date(a.date))
  displayFeaturedBlog()
  loadBlogPosts()
})

function displayFeaturedBlog() {
  const featured = blogArticles.find(article => article.featured)
  const container = document.getElementById('featured-blog-container')
  if (!featured || !container) return

  container.innerHTML = `
    <div class="featured-blog-card" onclick="openBlogArticle('${featured.id}')">
      <div class="featured-blog-image">
        <img src="${featured.heroImage}" alt="${featured.title}">
        <div class="featured-blog-overlay">
          <div class="featured-blog-info">
            <span class="featured-label">Featured Article</span>
            <h3>${featured.title}</h3>
            <p class="blog-meta">
              <span class="blog-date">${formatDate(featured.date)}</span>
              <span class="blog-author">by ${featured.author}</span>
            </p>
            <p class="blog-excerpt">${featured.excerpt}</p>
            <span class="view-details">Read Full Article →</span>
          </div>
        </div>
      </div>
    </div>
  `
}

function loadBlogPosts() {
  const grid = document.getElementById('blog-grid')
  if (!grid) return

  const posts = blogArticles.filter(article => !article.featured)
  grid.innerHTML = posts.map(article => `
    <div class="blog-card" onclick="openBlogArticle('${article.id}')">
      <div class="blog-image">
        <img src="${article.heroImage}" alt="${article.title}">
        <div class="blog-overlay">
          <h3>${article.title}</h3>
          <span class="blog-date">${formatDate(article.date)}</span>
          <p class="blog-excerpt">${article.excerpt}</p>
          <span class="view-details">Read More →</span>
        </div>
      </div>
    </div>
  `).join('')
}

function openBlogArticle(id) {
  const article = blogArticles.find(a => a.id === id)
  if (!article) return

  const modal = document.getElementById('blogModal')
  const hero = document.getElementById('modal-hero-image')
  const content = document.getElementById('blog-article-content')

  if (modal && hero && content) {
    hero.src = article.heroImage
    hero.alt = article.title
    content.innerHTML = `
      <h2>${article.title}</h2>
      <p class="blog-meta">
        <strong>${formatDate(article.date)}</strong> • by ${article.author}
      </p>
      ${article.fullContent}
    `
    modal.classList.add('modal--is-open')
    document.body.style.overflow = 'hidden'

    // Optional: GTM event hook
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'blogArticleOpened',
        articleId: article.id,
        title: article.title
      })
    }
  }
}

function closeBlogModal() {
  const modal = document.getElementById('blogModal')
  if (modal) {
    modal.classList.remove('modal--is-open')
    document.body.style.overflow = 'auto'
  }
}

function formatDate(dateStr) {
  const date = new Date(dateStr)
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
