import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; 
import { useEffect, useState } from 'react';

const Home = ({ articles }) => {
  const [data, setData] = useState([])

  const sortedArticles = [...articles].sort((a, b) => b.id - a.id);
  
  useEffect(() => {prueba()}, [])
  
  console.log(data)
  
  async function prueba(){
    const prueba1 =  await axios.get('http://localhost/api.php')
    setData(prueba1.data);
  }

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8">
          {/* Cuadro de texto estático */}

          
          {data.map(function(article) {
            return (
              <div>
                <div>{article.image_url}</div>
                <div>{article.link_url}</div>
              </div>
            )
          })}

          <div className="static-text-box">
            <h3>Título del Cuadro Estático</h3>
            <p>Contenido del cuadro estático.</p>
          </div>
          
          {/* Sección de Artículos */}
          <h2 className="text-center mb-4">Artículos Recientes</h2>
          <div className="list-group">
            {sortedArticles.map((article, index) => (
              <Link to={`/article/${article.id}`} key={index} className="list-group-item list-group-item-action">
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">{article.title}</h5>
                  <small>Categoría: {article.category}</small>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
