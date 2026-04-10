const newsAPIKey = '8905031f3526440990ef80d776a9e770'; // Replace with your actual key

// Function to fetch news
const fetchNews = async (category = 'general') => {
    const url = `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${newsAPIKey}`;
    
    document.getElementById('loading').style.display = 'block'; // Show loading

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch news articles. Please try again later.');
        }
        const data = await response.json();
        return data.articles;
    } catch (error) {
        document.getElementById('loading').style.display = 'none'; // Hide loading
        document.getElementById('news-section').innerHTML = `<p class="error">${error.message}</p>`;
        return [];
    }
};

// Function to analyze sentiment of text
const analyzeSentiment = async (text) => {
    const url = 'https://api.textrazor.com';
    const data = {
        text: text,
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'x-textrazor-key': '1c230d59f14ecbb04c7fa56898dc09eda2e2bf64ef598978142de75d', // Replace with your actual key
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(data),
        });
        
        if (!response.ok) {
            throw new Error('Sentiment analysis failed. Please try again later.');
        }

        const result = await response.json();
        return result.response.sentiment;
    } catch (error) {
        return 'Error in sentiment analysis';
    }
};

// Display news articles in the HTML
const displayNews = async (category) => {
    const articles = await fetchNews(category);
    const newsSection = document.getElementById('news-section');
    newsSection.innerHTML = '';  // Clear previous articles

    // If no articles, show a message
    if (articles.length === 0) {
        newsSection.innerHTML = '<p>No news available at the moment.</p>';
        return;
    }

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
    const customCategory = document.getElementById('custom-category').value.trim();

    // If custom category is provided, use that, else use the selected one
    const categoryToUse = customCategory || selectedCategory;
    displayNews(categoryToUse);
});

// Initial display with default category
displayNews('general');