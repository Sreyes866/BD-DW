// JsonTemplate.jsx
import React, { useEffect, useState } from 'react';

const JsonTemplate = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const jsonData = {
      title: 'Título del artículo',
      content: 'Contenido aquí',
      // ...
    };

    setData(jsonData);
  }, []);

  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.content}</p>
    </div>
  );
};

export default JsonTemplate;
