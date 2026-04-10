const newsAPIKey = '8905031f3526440990ef80d776a9e770'; 
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
            'x-textrazor-key': '1c230d59f14ecbb04c7fa56898dc09eda2e2bf64ef598978142de75d', 
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(data),
    });
    
    const result = await response.json();
    return result.response.sentiment;
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

    displaySentiment(articles); // Call sentiment analysis
};

// Display sentiment for each article
const displaySentiment = async (articles) => {
    for (let article of articles) {
        const sentiment = await analyzeSentiment(article.title);
        const sentimentElement = document.createElement('div');
        sentimentElement.classList.add('sentiment');
        sentimentElement.innerHTML = `
            <p>Sentiment: ${sentiment}</p>
        `;
        articleElement.appendChild(sentimentElement);
    }
};

displayNews();