import React from 'react';
import { Link } from 'react-router-dom';

const ArticleTemplates = () => {
  return (
    <div>
      <h1>Elige una Plantilla</h1>
      <Link to="/template/1">Plantilla 1</Link>
      <Link to="/template/2">Plantilla 2</Link>
      <Link to="/template/3">Plantilla 3</Link>
    </div>
  );
};

export default ArticleTemplates;
