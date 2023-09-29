import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ListArticles = ({ articles }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState('asc');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');

  const categories = {
    'Tecnologia': ['Programación', 'Inteligencia Artificial', 'Ciberseguridad', 'IoT', 'Blockchain'],
    'Ciencia': ['Biología', 'Física', 'Química', 'Astronomía', 'Geología'],
    'Salud': ['Nutrición', 'Salud Mental', 'Cardiología', 'Pediatría', 'Neurología'],
    'Arte y cultura': ['Historia del Arte', 'Literatura Clásica', 'Música', 'Teatro', 'Cine'],
    'Negocios y finanzas': ['Inversión en Criptomonedas', 'Marketing Digital', 'Gestión de Proyectos', 'Finanzas Personales', 'Emprendimiento']
  };

  const filteredArticles = articles.filter(article => {
    return article.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
           (!selectedCategory || article.category === selectedCategory) &&
           (!selectedSubCategory || article.subCategory === selectedSubCategory);
  });

  const sortedArticles = filteredArticles.sort((a, b) => {
    return sortType === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
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

      <select onChange={(e) => {
        setSelectedCategory(e.target.value);
        setSelectedSubCategory('');
      }}>
        <option value="">--Seleccionar Categoría--</option>
        {Object.keys(categories).map((category, index) => (
          <option value={category} key={index}>{category}</option>
        ))}
      </select>

      {selectedCategory && (
        <select onChange={(e) => setSelectedSubCategory(e.target.value)}>
          <option value="">--Seleccionar Subcategoría--</option>
          {categories[selectedCategory].map((subCategory, index) => (
            <option value={subCategory} key={index}>{subCategory}</option>
          ))}
        </select>
      )}

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