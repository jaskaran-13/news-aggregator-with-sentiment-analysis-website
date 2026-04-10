// api/news.js
export default async function handler(req, res) {
    const { category = 'general' } = req.query; // Get category from query params, default to 'general'
    const apiKey = process.env.NEWS_API_KEY; // Store your API key in environment variables for security
    const url = `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${apiKey}`;

    try {
        // Make the request to NewsAPI
        const response = await fetch(url);
        const data = await response.json();

        // Check if the response is OK
        if (response.ok) {
            res.status(200).json(data); // Send the data to the frontend
        } else {
            res.status(response.status).json({ error: 'Failed to fetch news' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching news' });
    }
}