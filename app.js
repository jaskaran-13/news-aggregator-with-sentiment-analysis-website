require('dotenv').config();  // Load environment variables from the .env file

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

// Function to fetch news from the backend proxy
const fetchNews = async (category = 'general') => {
    const url = `/api/news?category=${category}`; // Call the backend serverless function

    document.getElementById('loading').style.display = 'block'; // Show loading spinner

    try {
        const data = await fetchAPIData(url);  // Fetch data from the backend proxy
        console.log(data);  // Log the response to check what is returned

        document.getElementById('loading').style.display = 'none'; // Hide loading spinner

        if (data && data.articles) {
            return data.articles;  // Return the articles data
        } else {
            throw new Error('No articles found.');
        }
    } catch (error) {
        document.getElementById('loading').style.display = 'none'; // Hide loading spinner
        console.error('Error fetching news:', error);  // Log the error
        document.getElementById('news-section').innerHTML = `<p class="error">${error.message}</p>`;
        return [];
    }
};

// Function to analyze sentiment of text using TextRazor
const analyzeSentiment = async (text) => {
    const url = `https://api.textrazor.com/`;
    const data = { text: text };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'x-textrazor-key': process.env.TEXTRAZOR_API_KEY,  // Use the environment variable
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(data),
        });

        if (!response.ok) {
            throw new Error('TextRazor API error: ' + response.statusText);
        }

        const result = await response.json();

        if (result.response && result.response.sentiment) {
            return result.response.sentiment;
        } else {
            throw new Error('Sentiment analysis result not available');
        }
    } catch (error) {
        console.error('Sentiment analysis error:', error);  // Log detailed error
        return `Error: ${error.message}`;  // Return the error message to the UI
    }
};

// Display news articles in the HTML
const displayNews = async (category) => {
    const articles = await fetchNews(category);
    const newsSection = document.getElementById('news-section');
    newsSection.innerHTML = '';  // Clear previous articles

    // Show message if no articles are found
    if (articles.length === 0) {
        newsSection.innerHTML = '<p class="no-results">No news found for this category. Please try another category or check back later.</p>';
        return;
    }

    // Loop through each article
    for (const article of articles) {
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
    }
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