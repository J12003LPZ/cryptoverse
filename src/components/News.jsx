import React, { useState, useEffect } from "react";
import { Card, Button } from "antd"; // import the Card and Button components from Ant Design
import "antd/dist/antd.css"; // import Ant Design CSS
import { Link } from "react-router-dom";

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
    <Card className="w-full max-w-md mx-auto bg-white rounded-md shadow-md overflow-hidden">
      <div className="px-6 py-4">
        <div className="articles-container">
          {articles.map((article) => (
            <Card
              className="bg-gray-100 border border-gray-200 p-4 mb-4 rounded-md"
              key={article.title}
            >
              <div className="text-sm text-gray-600 mb-2">{article.date}</div>
              <h3 className="font-bold text-lg mb-2">
                <strong>{article.title}</strong>
              </h3>
              <p className="text-gray-700">
                {article.description}{" "}
                <Link
                  href={article.url}
                  style={{ marginBottom: "30px", color: "blue" }}
                >
                  Read More
                </Link>
              </p>
            </Card>
          ))}
        </div>
      </div>
    </Card>
  );
}

export default News;
