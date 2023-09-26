import React, { useState } from 'react';

const CreateArticle = ({ addArticle }) => {
  const [article, setArticle] = useState({
    title: '',
    content: '',
    category: '',
    subCategory: ''
  });

  const categories = {
    'Tecnología': ['Inteligencia Artificial', 'Seguridad Informática'],
    'Ciencia': ['Biología Molecular', 'Física Cuántica'],
    'Salud': ['Nutrición', 'Salud Mental'],
    'Arte y Cultura': ['Historia del Arte', 'Literatura Clásica'],
    'Negocios y Finanzas': ['Inversión en Criptomonedas', 'Marketing Digital'],
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticle({
      ...article,
      [name]: value
    });
    if (name === 'category') {
      setArticle({ ...article, category: value, subCategory: '' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addArticle(article);
    setArticle({
      title: '',
      content: '',
      category: '',
      subCategory: ''
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Título</label>
          <input type="text" id="title" name="title" value={article.title} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="content">Contenido</label>
          <textarea id="content" name="content" value={article.content} onChange={handleChange}></textarea>
        </div>
        <div>
          <label htmlFor="category">Categoría</label>
          <select id="category" name="category" value={article.category} onChange={handleChange}>
            <option value="" disabled>Seleccione una categoría</option>
            {Object.keys(categories).map((cat, index) => (
              <option key={index} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="subCategory">Subcategoría</label>
          <select id="subCategory" name="subCategory" value={article.subCategory} onChange={handleChange}>
            <option value="" disabled>Seleccione una subcategoría</option>
            {categories[article.category]?.map((subCat, index) => (
              <option key={index} value={subCat}>{subCat}</option>
            ))}
          </select>
        </div>
        <button type="submit">Crear</button>
      </form>
    </div>
  );
};

export default CreateArticle;
