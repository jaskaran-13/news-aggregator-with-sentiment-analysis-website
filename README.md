# news-aggregator-with-sentiment-analysis-website
# Project Overview

This is a News Aggregator application that allows users to filter news articles by category (e.g., Business, Technology, Sports, etc.) and perform sentiment analysis on the article titles using TextRazor API. The application aggregates news from the NewsAPI and displays it in a user-friendly interface. Additionally, sentiment scores are provided to help analyze the emotional tone of each article.

# Features
Category Filter: Users can filter news by various categories (e.g., General, Business, Technology, Health, Sports, Entertainment).
Sentiment Analysis: The application uses TextRazor API to perform sentiment analysis on article titles and display the result.
Responsive Design: The app is mobile-friendly, providing a seamless experience on devices of all screen sizes.
News Aggregation: News is fetched from the NewsAPI and displayed dynamically with a loading spinner during data retrieval.
# Tech Stack
Frontend: HTML, CSS, JavaScript
Backend: Vercel Serverless Functions (for API integration)
# APIs:
NewsAPI: Used for fetching the latest news articles.
TextRazor API: Used for performing sentiment analysis on news article titles.
Installation and Setup
Prerequisites

Make sure you have the following tools installed:

Node.js
 (if testing locally)
A Vercel
 account (for deployment)
Clone the Repository

Clone this repository to your local machine using Git:

git clone https://github.com/jaskaran-13/news-aggregator-with-sentiment-analysis-website.git
cd news-aggregator-with-sentiment-analysis
Install Dependencies

Install all the required dependencies for local development:

npm install
Environment Variables

To use the NewsAPI and TextRazor API, you need to set up the following environment variables:

NEWS_API_KEY=8905031f3526440990ef80d776a9e770
TEXTRAZOR_API_KEY=1c230d59f14ecbb04c7fa56898dc09eda2e2bf64ef598978142de75d

# Local Development:

Create a .env file in the root of your project and add the following:

NEWS_API_KEY=8905031f3526440990ef80d776a9e770
TEXTRAZOR_API_KEY=1c230d59f14ecbb04c7fa56898dc09eda2e2bf64ef598978142de75d

# Vercel Deployment:

For Vercel deployment, add these variables to your project’s environment variables on the Vercel dashboard:

NEWS_API_KEY=8905031f3526440990ef80d776a9e770
TEXTRAZOR_API_KEY=1c230d59f14ecbb04c7fa56898dc09eda2e2bf64ef598978142de75d

# Run Locally

To run the application locally, use the following command:

npm run dev

This will start a local server and you can access the app at http://localhost:3000.
Vercel live link: https://news-aggregator-with-sentiment-anal-ashy.vercel.app/ 
# Contributing
Contributions by Group Members
Vishal200406:
Worked on fetching news from NewsAPI, including API integration and category selection logic.
Handled UI improvements and displaying articles with sentiment analysis.
jaskaran-13:
Responsible for refactoring the code and making it modular for better readability and maintainability.
Added responsive design to ensure the app works well on mobile and tablet screens.
jaswinder792:
Focused on error handling and improving the user experience with loading states and error messages.
Contributed to final UI polish, including styling the articles and adding a footer with relevant links.