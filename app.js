const newsAPIKey = '8905031f3526440990ef80d776a9e770'; 

// Function to fetch news
const fetchNews = async (category = 'general') => {
    const url = `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${newsAPIKey}`;

    const response = await fetch(url);
    const data = await response.json();
    return data.articles;
};

// Display news articles in the HTML
const displayNews = async () => {
    const articles = await fetchNews();
    const newsSection = document.getElementById('news-section');
    
    articles.forEach(article => {
        const articleElement = document.createElement('div');
        articleElement.classList.add('article');
        articleElement.innerHTML = `
            <h3>${article.title}</h3>
            <p>${article.description}</p>
            <a href="${article.url}" target="_blank">Read more</a>
        `;
        newsSection.appendChild(articleElement);
    });
};

displayNews();