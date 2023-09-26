import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import './App.css';
import CreateArticle from './components/CreateArticle.jsx';
import Home from './components/Home.jsx'; 
import Login from './components/Login.jsx';
import ListArticles from './components/ListArticles.jsx';
import ArticleDetail from './components/ArticleDetail.jsx';

import ArticleTemplates from './components/ArticleTemplates.jsx'; 
import Template1 from './components/Template1.jsx'; 
import Template2 from './components/Template2.jsx';
import Template3 from './components/Template3.jsx';

import PublishArticle from './components/PublishArticle.jsx';
import Profile from './components/Profile.jsx';
import Contact from './components/Contact.jsx';
import History from './components/History.jsx';
import FAQ from './components/FAQ.jsx';
import Announcements from './components/Announcements.jsx';



const App = () => {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [articles, setArticles] = useState([]);

  const addArticle = (newArticle) => {
    newArticle.id = articles.length + 1;
    setArticles([...articles, newArticle]);
  };

  // Añadiendo la funcionalidad para eliminar un artículo
  const deleteArticle = (id) => {
    const newArticles = articles.filter(article => article.id !== id);
    setArticles(newArticles);
  };

  // Añadiendo la funcionalidad para actualizar un artículo
  const updateArticle = (updatedArticle) => {
    const newArticles = articles.map(article =>
      article.id === updatedArticle.id ? updatedArticle : article
    );
    setArticles(newArticles);
  };
  return (
    <Router>
      <div className="App">
        {isLoggedIn && (
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              <Link className="navbar-brand" to="/home">ThinkSphere</Link>
              <div className="collapse navbar-collapse">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item"><Link className="nav-link" to="/home">Home</Link></li>
                  <li className="nav-item"><Link className="nav-link" to="/create-article">Crear Artículo</Link></li>
                  <li className="nav-item"><Link className="nav-link" to="/list-articles">Artículos Publicados</Link></li>
                  <li className="nav-item"><Link className="nav-link" to="/profile">Perfil</Link></li>
                  <li className="nav-item"><Link className="nav-link" to="/contact">Contacto</Link></li>
                  <li className="nav-item"><Link className="nav-link" to="/history">Historia</Link></li>
                  <li className="nav-item"><Link className="nav-link" to="/faq">Preguntas frecuentes</Link></li>
                  <li className="nav-item"><Link className="nav-link" to="/announcements">Anuncios</Link></li>
                </ul>
              </div>
            </div>
          </nav>
        )}
        <Switch>
          <Route path="/login">
            <Login setIsLoggedIn={setIsLoggedIn} />
          </Route>
          <Route exact path="/">
            {isLoggedIn ? <Redirect to="/home" /> : <Login setIsLoggedIn={setIsLoggedIn} />}
          </Route>
          <Route path="/home">
            {isLoggedIn ? <Home articles={articles} /> : <Redirect to="/login" />}
          </Route>
          <Route path="/create-article">
            {isLoggedIn ? <CreateArticle addArticle={addArticle} /> : <Redirect to="/login" />}
          </Route>
          <Route path="/list-articles">
            {isLoggedIn ? <ListArticles articles={articles} /> : <Redirect to="/login" />}
          </Route>
          <Route path="/article-templates">
            {isLoggedIn ? <ArticleTemplates /> : <Redirect to="/login" />}
          </Route>
          <Route path="/template/1">
            {isLoggedIn ? <Template1 /> : <Redirect to="/login" />}
          </Route>
          <Route path="/template/2">
            {isLoggedIn ? <Template2 /> : <Redirect to="/login" />}
          </Route>
          <Route path="/template/3">
            {isLoggedIn ? <Template3 /> : <Redirect to="/login" />}
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