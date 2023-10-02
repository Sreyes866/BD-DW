import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = ({ articles }) => {
  //const [data, setData] = useState([]);
  //const [recentArticles, setRecentArticles] = useState([]); // Añadido para manejar artículos recientes

  const sortedArticles = [...articles].sort((a, b) => b.id - a.id);

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8">
          {/* Sección de Artículos */}
          <h2 className="text-center mb-4">Artículos Recientes</h2>
          <div className="list-group">
            {sortedArticles.map((article, index) => (
              <Link to={`/article/${article.id}`} key={index} className="list-group-item list-group-item-action">
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">{article.title}</h5>
                  <small>Categoría: {article.category}</small>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
