import React from 'react';
import { Link } from 'react-router-dom';

const Home = ({ articles }) => {
  // Ordena los artículos por id de forma descendente para mostrar los más recientes primero
  const sortedArticles = [...articles].sort((a, b) => b.id - a.id);

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
      <div className="col-12 col-md-8">
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
