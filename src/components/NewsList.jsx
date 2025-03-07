import React from 'react';
/**
 * NewsList Component
 * ------------------
 * This component displays a list of cryptocurrency-related news articles.
 * It handles three states:
 * - `loading`: Shows a spinner while news articles are being fetched.
 * - `error`: Displays an error message if fetching news fails.
 * - `news`: Renders a list of articles if data is available.
 * 
 * Props:
 * - `news`: An array of news article objects containing details like title, image, and publication date.
 * - `loading`: Boolean indicating whether the news data is still being fetched.
 * - `error`: String containing an error message if the data fetch fails.
 */
const NewsList = ({ news, loading, error }) => {
    // Show a loading spinner if data is still being fetched
    if (loading) {
        return <div className="loading-spinner"><div className="spinner"></div></div>;
    }
    // Show an error message if fetching news fails
    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="news-grid">
            {news.map((article, index) => (
                <article key={index} className="news-card">
                    <img src={article.imageurl || "/api/placeholder/400/200"} alt={article.title} className="news-image" />
                    <div className="news-content">
                        <h3 className="news-title">{article.title}</h3>
                        <p className="news-description">{article.body.substring(0, 150)}...</p>
                        <div className="news-footer">
                            <span className="news-date">{new Date(article.published_on * 1000).toLocaleDateString()}</span>
                            <a href={article.url} target="_blank" rel="noopener noreferrer" className="read-more">Read More</a>
                        </div>
                    </div>
                </article>
            ))}
        </div>
    );
};

export default NewsList;
