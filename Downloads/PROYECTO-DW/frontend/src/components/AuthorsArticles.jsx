import React, { useState, useEffect } from 'react';

const AuthorsArticles = () => {
  const [authors, setAuthors] = useState([]);
  const [showAuthors, setShowAuthors] = useState(false);

  useEffect(() => {
    // Realizar la solicitud al archivo PHP para obtener los autores
    const fetchAuthors = async () => {
      try {
        const response = await fetch('http://localhost/AuthorsArticles.php');
        const data = await response.json();
        setAuthors(data);
      } catch (error) {
        console.error('Error fetching authors:', error);
      }
    };

    if (showAuthors) {
      fetchAuthors();
    }
  }, [showAuthors]);

  return (
    <div className="authors-container">
      <h1>Listado de Autores</h1>
      <button
        className="toggle-button"
        onClick={() => setShowAuthors(!showAuthors)}
      >
        {showAuthors ? 'Ocultar Autores' : 'Ver Autores'}
      </button>
      {showAuthors && (
        <table className="authors-table">
          <thead>
            <tr>
              <th>Nombre de Usuario</th>
              <th>Nombre Completo</th>
              <th>¿Ha Publicado?</th>
            </tr>
          </thead>
          <tbody>
            {authors.map((author, index) => (
              <tr key={index}>
                <td>{author.username}</td>
                <td>{author.name}</td>
                <td>{author.has_published}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AuthorsArticles;
