// CreateArticlePage.jsx

import React from 'react';
import CreateArticle from './CreateArticle';


const CreateArticlePage = ({ addArticle }) => {
  return (
    <div>
      <h2>Crear un nuevo artículo</h2>
      <CreateArticle addArticle={addArticle} />
    </div>
  );
};

export default CreateArticlePage;
