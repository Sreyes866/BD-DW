import React from 'react';

const Home = ({ articles }) => {
  // Ordena los artículos por id de forma descendente para mostrar los más recientes primero
  const sortedArticles = [...articles].sort((a, b) => b.id - a.id);

  return (
    <div>
      
      <h2>Artículos Recientes</h2>
      <ul>
        {sortedArticles.map((article, index) => (
          <li key={index}>
            {article.title} - Categoría: {article.category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;