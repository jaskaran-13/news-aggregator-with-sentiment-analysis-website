const newsAPIKey = '8905031f3526440990ef80d776a9e770'; // NewsAPI key

const textRazorAPIKey = '1c230d59f14ecbb04c7fa56898dc09eda2e2bf64ef598978142de75d'; // TextRazor API key (your provided key)

// Helper function to handle API requests
const fetchAPIData = async (url, method = 'GET', body = null) => {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
    };
    
    if (body) {
        options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);
    return response.json();
};

// Function to fetch news
const fetchNews = async (category = 'general') => {
    const url = `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${newsAPIKey}`;
    
    document.getElementById('loading').style.display = 'block'; // Show loading

    try {
        const data = await fetchAPIData(url);
        console.log(data);  // Log the response to see what's returned

        document.getElementById('loading').style.display = 'none'; // Hide loading
        if (data && data.articles) {
            return data.articles;
        } else {
            throw new Error('No articles found.');
        }
    } catch (error) {
        document.getElementById('loading').style.display = 'none'; // Hide loading
        console.error('Error fetching news:', error);  // Log the error
        document.getElementById('news-section').innerHTML = `<p class="error">${error.message}</p>`;
        return [];
    }
};

// Function to analyze sentiment of text using TextRazor
const analyzeSentiment = async (text) => {
    const url = 'https://api.textrazor.com';
    const data = {
        text: text,
    };

    try {
        const result = await fetchAPIData(url, 'POST', data);
        return result.response.sentiment; // Return the sentiment analysis result
    } catch (error) {
        return 'Error in sentiment analysis'; // In case of error
    }
};

// Display news articles in the HTML
const displayNews = async (category) => {
    const articles = await fetchNews(category);
    const newsSection = document.getElementById('news-section');
    newsSection.innerHTML = '';  // Clear previous articles

    // Show message if no articles are found
    if (articles.length === 0) {
        newsSection.innerHTML = '<p>No news found for this category. Please try another category or check back later.</p>';
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
    const categoryToUse = customCategory || selectedCategory || 'general';  // Use 'general' if no valid category
    displayNews(categoryToUse);
});

// Initial display with default category
displayNews('general');