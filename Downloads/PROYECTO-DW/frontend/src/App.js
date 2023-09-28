import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './index.css';
import './App.css';
import CreateArticle from './components/CreateArticle.jsx';
import Home from './components/Home.jsx'; 
import Login from './components/Login.jsx';
import Profile from './components/Profile.jsx';  
import ListArticles from './components/ListArticles.jsx';
import ArticleDetail from './components/ArticleDetail.jsx';
import Contact from './components/Contact.jsx';
import History from './components/History.jsx';
import FAQ from './components/FAQ.jsx';
import Announcements from './components/Announcements.jsx'


const App = () => {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [articles, setArticles] = useState([]);

  const categories = {
    'Tecnologia': ['Programación', 'Inteligencia Artificial', 'Ciberseguridad', 'IoT', 'Blockchain'],
    'Ciencia': ['Biología', 'Física', 'Química', 'Astronomía', 'Geología'],
    'Salud': ['Nutrición', 'Salud Mental', 'Cardiología', 'Pediatría', 'Neurología'],
    'Arte y cultura': ['Historia del Arte', 'Literatura Clásica', 'Música', 'Teatro', 'Cine'],
    'Negocios y finanzas': ['Inversión en Criptomonedas', 'Marketing Digital', 'Gestión de Proyectos', 'Finanzas Personales', 'Emprendimiento']
  };

  const addArticle = (newArticle) => {
    newArticle.id = articles.length + 1;
    setArticles([...articles, newArticle]);
  };

  const deleteArticle = (id) => {
    const newArticles = articles.filter(article => article.id !== id);
    setArticles(newArticles);
  };

  const updateArticle = (updatedArticle) => {
    const newArticles = articles.map(article =>
      article.id === updatedArticle.id ? updatedArticle : article
    );
    setArticles(newArticles);
  };

  return (
      <Router>
        <div className="App">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              <Link className="navbar-brand" to="/home">ThinkSphere</Link>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item"><Link className="nav-link" to="/home">Home</Link></li>
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="categoriesDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Categorías
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="categoriesDropdown">
  {Object.keys(categories).map((category, index) => (
    <li key={index} className="dropdown-submenu">
      <a className="dropdown-item dropdown-toggle" href="#">{category}</a>
      <ul className="dropdown-menu">
        {categories[category].map((subCategory, subIndex) => (
          <li key={subIndex}>
            <Link className="dropdown-item" to={`/articles/${category}/${subCategory}`}>{subCategory}</Link>
          </li>
        ))}
      </ul>
    </li>
  ))}
</ul>
                  </li>
                  <li className="nav-item"><Link className="nav-link" to="/contact">Contacto</Link></li>
                  <li className="nav-item"><Link className="nav-link" to="/history">Historia</Link></li>
                  <li className="nav-item"><Link className="nav-link" to="/faq">Preguntas frecuentes</Link></li>
                  <li className="nav-item"><Link className="nav-link" to="/announcements">Anuncios</Link></li>
                  {isLoggedIn ? (
                    <>
                      <li className="nav-item"><Link className="nav-link" to="/create-article">Crear Artículo</Link></li>
                      <li className="nav-item"><Link className="nav-link" to="/list-articles">Artículos Publicados</Link></li>
                      <li className="nav-item"><Link className="nav-link" to="/profile">Perfil</Link></li>
                    </>
                  ) : (
                    <li className="nav-item dropdown">
                      <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Ingresar
                      </a>
                      <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <li><Link className="dropdown-item" to="/login">Iniciar sesión</Link></li>
                        <li><a className="dropdown-item" href="#">Registrarse</a></li>
                      </ul>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </nav>
          <Switch>
            <Route path="/login">
              <Login setIsLoggedIn={setIsLoggedIn} />
            </Route>
            <Route exact path="/">
              <Home articles={articles} />
            </Route>
            <Route path="/home">
              <Home articles={articles} />
            </Route>
            <Route path="/create-article">
              {isLoggedIn ? <CreateArticle addArticle={addArticle} /> : <Redirect to="/login" />}
            </Route>
            <Route path="/list-articles">
              {isLoggedIn ? <ListArticles articles={articles} /> : <Redirect to="/login" />}
            </Route>
            <Route path="/contact">
              <Contact />
            </Route>
            <Route path="/history">
              <History />
            </Route>
            <Route path="/faq">
              <FAQ />
            </Route>
            <Route path="/announcements">
              <Announcements />
            </Route>
            <Route path="/profile">
              {isLoggedIn ? <Profile /> : <Redirect to="/login" />}
            </Route>
            <Route path="/article/:id">
              {isLoggedIn ? <ArticleDetail articles={articles} deleteArticle={deleteArticle} updateArticle={updateArticle} /> : <Redirect to="/login" />}
            </Route>
          </Switch>
        </div>
      </Router>
  );
};

export default App;
