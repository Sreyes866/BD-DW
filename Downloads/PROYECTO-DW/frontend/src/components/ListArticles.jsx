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
    <div className="container">
      <input 
        type="text" 
        className="form-control"
        placeholder="Buscar artículo" 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button className="btn btn-primary" onClick={() => setSortType('asc')}>Ascendente</button>
      <button className="btn btn-secondary" onClick={() => setSortType('desc')}>Descendente</button>

      <div className="row">
        {sortedArticles.map((article, index) => (
          <div className="col-md-3" key={index}>
            <Link to={`/article/${article.id}`} className="text-decoration-none">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{article.title}</h5>
                  <p className="card-text">{article.content.substring(0, 50)}...</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListArticles;
