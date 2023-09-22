import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ListArticles = ({ articles }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState('asc'); // 'asc' o 'desc'

  const filteredArticles = articles.filter(article => 
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedArticles = filteredArticles.sort((a, b) => {
    if (sortType === 'asc') {
      return a.title.localeCompare(b.title);
    } else {
      return b.title.localeCompare(a.title);
    }
  });

  return (
    <div>
      <input 
        type="text" 
        placeholder="Buscar artículo" 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={() => setSortType('asc')}>Ascendente</button>
      <button onClick={() => setSortType('desc')}>Descendente</button>

      <ul>
        {sortedArticles.map((article, index) => (
          <li key={index}>
            <Link to={`/article/${article.id}`}>{article.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListArticles;
