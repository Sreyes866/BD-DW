import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const CreateArticle = ({ addArticle }) => {
  // Estado para guardar los detalles del artículo
  const [article, setArticle] = useState({
    title: '',
    content: '',
    category: '',
    subCategory: ''
  });

  // Lista de categorías y subcategorías
  const categories = {
    'Tecnologia': ['Programación', 'Inteligencia Artificial', 'Ciberseguridad', 'IoT', 'Blockchain'],
    'Ciencia': ['Biología', 'Física', 'Química', 'Astronomía', 'Geología'],
    'Salud': ['Nutrición', 'Salud Mental', 'Cardiología', 'Pediatría', 'Neurología'],
    'Arte y cultura': ['Historia del Arte', 'Literatura Clásica', 'Música', 'Teatro', 'Cine'],
    'Negocios y finanzas': ['Inversión en Criptomonedas', 'Marketing Digital', 'Gestión de Proyectos', 'Finanzas Personales', 'Emprendimiento']
  };

  // Manejar cambios en los campos del formulario
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

  // Objeto de historia para navegar entre rutas
  const history = useHistory();

  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    addArticle(article);
    setArticle({
      title: '',
      content: '',
      category: '',
      subCategory: ''
    });

    // Redirigir al usuario a la página de selección de plantillas de artículo
    history.push('/article-templates');
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit} className="border p-4 rounded">
            <div className="form-group">
              <label htmlFor="title">Título</label>
              <input type="text" id="title" name="title" value={article.title} onChange={handleChange} className="form-control" />
            </div>
            <div className="form-group">
              <label htmlFor="content">Contenido</label>
              <textarea id="content" name="content" value={article.content} onChange={handleChange} className="form-control" rows="5"></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="category">Categoría</label>
              <select id="category" name="category" value={article.category} onChange={handleChange} className="form-control">
                <option value="" disabled>Seleccione una categoría</option>
                {Object.keys(categories).map((cat, index) => (
                  <option key={index} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="subCategory">Subcategoría</label>
              <select id="subCategory" name="subCategory" value={article.subCategory} onChange={handleChange} className="form-control">
                <option value="" disabled>Seleccione una subcategoría</option>
                {categories[article.category]?.map((subCat, index) => (
                  <option key={index} value={subCat}>{subCat}</option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn btn-primary">Crear</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateArticle;