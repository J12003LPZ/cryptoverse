import React, { useState, useEffect } from "react"; // import the News.css file for styling

function News() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "7a284d65e0msh0fa103e48002e68p1e256cjsnb5c46bd5217b",
        "X-RapidAPI-Host": "crypto-news16.p.rapidapi.com",
      },
    };

    fetch("https://crypto-news16.p.rapidapi.com/news/top/10", requestOptions)
      .then((response) => response.json())
      .then((data) => setArticles(data));
  }, []);

  return (
    <div class="w-full max-w-md mx-auto bg-white rounded-md shadow-md overflow-hidden">
      <div class="px-6 py-4">
        <div class="articles-container">
          {articles.map((article) => (
            <div
              class="bg-gray-100 border border-gray-200 p-4 mb-4 rounded-md"
              key={article.title}
            >
              <div class="text-sm text-gray-600 mb-2">{article.date}</div>
              <h3 class="font-bold text-lg mb-2">{article.title}</h3>
              <p class="text-gray-700">
                {article.description}{" "}
                <a
                  href={article.url}
                  class="mt-2 inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                  style={{ marginBottom: "30px" }}
                >
                  Read More
                </a>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default News;
