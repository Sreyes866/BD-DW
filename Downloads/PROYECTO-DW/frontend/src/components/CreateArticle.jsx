import React, { useState } from 'react';

const CreateArticle = ({ addArticle }) => {  // Añade addArticle como prop
  const [article, setArticle] = useState({
    title: '',
    content: '',
    category: '',
    subCategory: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticle({
      ...article,
      [name]: value
    });
  };

const handleSubmit = (e) => {
  e.preventDefault();
  // Aquí puedes enviar 'article' a tu API o base de datos
  console.log('Artículo creado:', article);
  addArticle(article);  // Añade el artículo a la lista
  setArticle({  // Reinicia el estado del artículo
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
        <div>
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={article.category}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            <option value="Tech">Tech</option>
            <option value="Science">Science</option>
            {/* Add more categories */}
          </select>
        </div>
        <div>
          <label htmlFor="subCategory">Sub-Category</label>
          <select
            id="subCategory"
            name="subCategory"
            value={article.subCategory}
            onChange={handleChange}
          >
            <option value="">Select Sub-Category</option>
            <option value="React">React</option>
            <option value="Physics">Physics</option>
            {/* Add more sub-categories */}
          </select>
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateArticle;
