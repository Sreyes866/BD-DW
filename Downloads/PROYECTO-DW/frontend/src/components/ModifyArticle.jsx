import React, { useState, useEffect } from 'react';

const ModifyArticle = () => {
  const [article, setArticle] = useState({
    id: null,
    title: '',
    content: ''
  });

  useEffect(() => {
    // Aquí podrías hacer una llamada a la API para obtener el artículo a modificar
    // Simulamos una llamada a la API
    setArticle({ id: 1, title: 'Article 1', content: 'Content 1' });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticle({
      ...article,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí podrías hacer una llamada a la API para modificar el artículo
    console.log('Artículo modificado:', article);
  };

  return (
    <div>
      <h1>Modify Article</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={article.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            value={article.content}
            onChange={handleChange}
          ></textarea>
        </div>
        <button type="submit">Modify</button>
      </form>
    </div>
  );
};

export default ModifyArticle;
