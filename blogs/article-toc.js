document.addEventListener('DOMContentLoaded', () => {
    const tocPlaceholder = document.getElementById('toc-placeholder');
    const articleBody = document.querySelector('.article-body');

    if (!tocPlaceholder || !articleBody) {
        return;
    }

    const headings = articleBody.querySelectorAll('h2, h3');
    if (headings.length < 2) {
        // Don't generate a TOC if there are fewer than 2 headings
        return;
    }

    let tocHtml = `
        <div class="toc-container">
            <h3>On This Page</h3>
            <ul>
    `;

    headings.forEach((heading, index) => {
        const level = heading.tagName.toLowerCase() === 'h2' ? '1' : '2';
        const text = heading.textContent;
        const id = 'toc-heading-' + index;

        heading.id = id;

        tocHtml += `
            <li class="toc-level-${level}">
                <a href="#${id}">${text}</a>
            </li>
        `;
    });

    tocHtml += `
            </ul>
        </div>
    `;

    tocPlaceholder.innerHTML = tocHtml;

    // Smooth scroll for TOC links
    tocPlaceholder.addEventListener('click', (event) => {
        if (event.target.tagName === 'A') {
            event.preventDefault();
            const targetId = event.target.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});