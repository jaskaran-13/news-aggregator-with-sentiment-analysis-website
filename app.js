const newsAPIKey = '8905031f3526440990ef80d776a9e770'; // Replace with your actual key

// Function to fetch news
const fetchNews = async (category = 'general') => {
    const url = `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${newsAPIKey}`;

    const response = await fetch(url);
    const data = await response.json();
    return data.articles;
};

// Function to analyze sentiment of text
const analyzeSentiment = async (text) => {
    const url = 'https://api.textrazor.com';
    const data = {
        text: text,
    };

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'x-textrazor-key': '1c230d59f14ecbb04c7fa56898dc09eda2e2bf64ef598978142de75d', // Replace with your actual key
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(data),
    });
    
    const result = await response.json();
    return result.response.sentiment;
};

// Display news articles in the HTML
const displayNews = async (category) => {
    const articles = await fetchNews(category);
    const newsSection = document.getElementById('news-section');
    newsSection.innerHTML = '';  // Clear previous articles

    // Loop through each article
    articles.forEach(async (article) => {
        const sentiment = await analyzeSentiment(article.title); // Get sentiment of article title
        const articleElement = document.createElement('div');
        articleElement.classList.add('article');
        
        articleElement.innerHTML = `
            <h3>${article.title}</h3>
            <p>${article.description}</p>
            <a href="${article.url}" target="_blank">Read more</a>
            <div class="sentiment">
                <p>Sentiment: ${sentiment}</p>
            </div>
        `;
        newsSection.appendChild(articleElement);
    });
};

// Handle category selection and button click
document.getElementById('filter-button').addEventListener('click', () => {
    const selectedCategory = document.getElementById('category').value;
    displayNews(selectedCategory);
});

// Initial display with default category
displayNews('general');