// api/sentiment.js
export default async function handler(req, res) {
    const { text } = req.body; // Get the text from the frontend

    if (!text) {
        return res.status(400).json({ error: 'Text is required for sentiment analysis' });
    }

    const apiKey = process.env.TEXTRAZOR_API_KEY; // Access the API key from Vercel's environment variables
    const url = `https://api.textrazor.com/`;
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'x-textrazor-key': apiKey,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({ text }),
        });

        if (!response.ok) {
            throw new Error('Failed to fetch sentiment data');
        }

        const result = await response.json();
        return res.status(200).json({ sentiment: result.response.sentiment });
    } catch (error) {
        return res.status(500).json({ error: 'Error with sentiment analysis' });
    }
}