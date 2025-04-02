const NewsList = ({ news }) => {
    return (
        <div>
            {news.length > 0 ? (
                news.map((article, index) => (
                    <div key={index} className="news-card">
                        <h3>{article.title}</h3>
                        <p>{article.description}</p>
                        <img src={article.urlToImage} alt="News" />
                    </div>
                ))
            ) : (
                <p>No news available.</p>
            )}
        </div>
    );
};

export default NewsList;
