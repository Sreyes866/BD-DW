import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom';
import './App.scss';
import CreateArticle from './components/CreateArticlePage.jsx';
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import ListArticles from './components/ListArticles.jsx';
import ArticleDetail from './components/ArticleDetail.jsx';
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
    newArticle.id = articles.length + 1; // Asignar un ID único
    setArticles([...articles, newArticle]);
  };

  return (
    <Router>
      <div className="App">
        <h1>Revista de Artículos</h1>
        {isLoggedIn && (
          <nav>
            <ul>
              <li><Link to="/home">Home</Link></li>
              <li><Link to="/create-article">Crear Artículo</Link></li>
              <li><Link to="/list-articles">Artículos Publicados</Link></li>
              <li><Link to="/profile">Perfil</Link></li>
              <li><Link to="/contact">Contacto</Link></li>
              <li><Link to="/history">Historia</Link></li>
              <li><Link to="/faq">Preguntas frecuentes</Link></li>
              <li><Link to="/announcements">Anuncios</Link></li>
            </ul>
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
  <Route path="/article/:id">
    {isLoggedIn ? <ArticleDetail articles={articles} /> : <Redirect to="/login" />}
  </Route>
  <Route path="/create-article">
    {isLoggedIn ? <CreateArticle addArticle={addArticle} /> : <Redirect to="/login" />}
  </Route>
  <Route path="/list-articles">
    {isLoggedIn ? <ListArticles articles={articles} /> : <Redirect to="/login" />}
  </Route>
</Switch>
      </div>
    </Router>
  );
};

export default App;