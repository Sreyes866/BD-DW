import React, { useState } from 'react';

const ArticleFilter = ({ articles, setFilteredArticles }) => {
  const [filterBy, setFilterBy] = useState('');  // Puede ser 'author', 'category', 'subCategory'
  const [searchTerm, setSearchTerm] = useState('');
  const [orderBy, setOrderBy] = useState(''); // Puede ser 'asc' o 'desc'

  const applyFilter = () => {
    let filtered = [...articles];
    
    if (filterBy) {
      filtered = filtered.filter(article => article[filterBy].toLowerCase().includes(searchTerm.toLowerCase()));
    }

    if (orderBy) {
      filtered = filtered.sort((a, b) => {
        const nameA = a.title.toLowerCase();
        const nameB = b.title.toLowerCase();
        
        if (nameA < nameB) return orderBy === 'asc' ? -1 : 1;
        if (nameA > nameB) return orderBy === 'asc' ? 1 : -1;
        return 0;
      });
    }

    setFilteredArticles(filtered);
  };

  return (
    <div>
      <select onChange={(e) => setFilterBy(e.target.value)}>
        <option value="">Filtrar por</option>
        <option value="author">Autor</option>
        <option value="category">Categoría</option>
        <option value="subCategory">Subcategoría</option>
      </select>
      
      <input 
        type="text" 
        placeholder="Buscar..." 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <select onChange={(e) => setOrderBy(e.target.value)}>
        <option value="">Ordenar por</option>
        <option value="asc">Ascendente</option>
        <option value="desc">Descendente</option>
      </select>

      <button onClick={applyFilter}>Aplicar</button>
    </div>
  );
};

export default ArticleFilter;
