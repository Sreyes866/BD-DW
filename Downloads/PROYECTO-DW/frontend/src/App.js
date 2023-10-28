import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom';
import axios from 'axios';
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
import Announcements from './components/Announcements.jsx';
import ArticlesByCategory from './components/ArticlesByCategory.jsx';
import Subscription from './components/Subscription';
import ManageCategories from './components/Managecategories.jsx';
import ManageSubcategories from './components/ManageSubcategories.jsx';
import CreatePage from './components/CreatePage';
import Register from './components/Register.jsx';
import { AuthProvider, useAuth } from './context/AuthContext';
import ManageUsers from './components/ManageUsers';
import ProcessSubscription from './components/ProcessSubscription';
import EditProfile from './components/EditProfile';
import CreateAd from './components/CreateAd';
import ModerateArticles from './components/ModerateArticles';
import ConfirmationPage from './components/ConfirmationPage';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import Employees from "./components/Employees";
import Search from "./components/Search";
import MyArticles from './components/MyArticles';
import OnDemandOffer from './components/OnDemandOffer';
import AutomaticOffer from './components/AutomaticOffer';


const App = () => {
  const { isLoggedIn, userRole } = useAuth();


  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [fetchedArticles, setFetchedArticles] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost/Categories.php');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    const fetchSubcategories = async () => {
      try {
        const response = await axios.get('http://localhost/Subcategories.php');
        setSubcategories(response.data);
      } catch (error) {
        console.error('Error fetching subcategories:', error);
      }
    };

    const fetchArticles = async () => {
      try {
        const response = await axios.get('http://localhost/Articles.php');
        setFetchedArticles(response.data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
    fetchCategories();
    fetchSubcategories();
  }, []);

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

  const routesForRole = {
    admin: ['/home', '/contact', '/history', '/faq', '/announcements', '/list-articles', '/profile', '/ManageCategories', '/ManageSubcategories', '/automatic-offer', '/on-demand-offer'],
    moderator: ['/home', '/contact', '/history', '/faq', '/announcements', '/list-articles', '/profile', '/moderate-articles'],
    author: ['/home', '/contact', '/history', '/faq', '/announcements', '/create-article', '/list-articles', '/profile', '/my-articles'],
    logged_in_visitor: ['/home', '/contact', '/history', '/faq', '/announcements', '/list-articles', '/profile'],
    visitor: ['/home', '/contact', '/history', '/faq', '/announcements', '/list-articles']
  };

  const isRouteAllowed = (route) => {
    return routesForRole[userRole]?.includes(route);
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
                <button className="nav-link dropdown-toggle" id="categoriesDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Categorías
                </button>
                <ul className="dropdown-menu" aria-labelledby="categoriesDropdown">
                  {categories.map((category, index) => (
                    <li key={index} className="dropdown-submenu">
                      <button className="dropdown-item dropdown-toggle">{category.name}</button>
                      <ul className="dropdown-menu">
                        <li><Link className="dropdown-item" to={`/articles/${category.name}/all`}>Todas las Subcategorías</Link></li>
                        {subcategories.filter(sub => sub.category_id === category.id).map((subCategory, subIndex) => (
                          <li key={subIndex}><Link className="dropdown-item" to={`/articles/${category.name}/${subCategory.name}`}>{subCategory.name}</Link></li>
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
              <li className="nav-item"><Link className="nav-link" to="/list-articles">Artículos Publicados</Link></li>          
              {isLoggedIn ? (
                <>
              {isLoggedIn && userRole === 'admin' && (
                      <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="offersDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                          Ofertas
                        </a>
                        <ul className="dropdown-menu" aria-labelledby="offersDropdown">
                          <li><Link className="dropdown-item" to="/automatic-offer">Oferta Automática</Link></li>
                          <li><Link className="dropdown-item" to="/on-demand-offer">Oferta On Demand</Link></li>
                        </ul>
                      </li>
                    )}
  {isRouteAllowed('/create-article') && <li className="nav-item"><Link className="nav-link" to="/create-article">Crear Artículo</Link></li>}
  {isRouteAllowed('/profile') && <li className="nav-item"><Link className="nav-link" to="/profile">Perfil</Link></li>}
  {isRouteAllowed('/ManageCategories') && <li className="nav-item"><Link className="nav-link" to="/ManageCategories">Gestionar Categorías</Link></li>}
  {isRouteAllowed('/ManageSubcategories') && <li className="nav-item"><Link className="nav-link" to="/ManageSubcategories">Gestionar Subcategorías</Link></li>}
  {isRouteAllowed('/moderate-articles') && <li className="nav-item"><Link className="nav-link" to="/moderate-articles">Moderar Artículos</Link></li>}
  {isRouteAllowed('/my-articles') && <li className="nav-item"><Link className="nav-link" to="/my-articles">Mis Artículos</Link></li>}s
</>
              ) : (
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Ingresar
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li><Link className="dropdown-item" to="/login">Iniciar sesión</Link></li>
                    <li><Link className="dropdown-item" to="/register">Registrarse</Link></li>
                  </ul>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <Switch>
      <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route exact path="/">
            <Home articles={articles} />
          </Route>
          <Route path="/home">
            {isRouteAllowed('/home') ? <Home articles={articles} /> : <Redirect to="/login" />}
          </Route>
          <Route path="/create-article">
  {isRouteAllowed('/create-article') ? <CreateArticle addArticle={addArticle} /> : <Redirect to="/login" />}
</Route>
<Route path="/list-articles">
  {isRouteAllowed('/list-articles') ? <ListArticles articles={articles} /> : <Redirect to="/login" />}
</Route>
        <Route path="/contact"><Contact /></Route>
        <Route path="/history"><History /></Route>
        <Route path="/faq"><FAQ /></Route>
        <Route path="/articles/:category/:subCategory"><ArticlesByCategory fetchedArticles={fetchedArticles} /></Route>
        <Route path="/announcements"><Announcements /></Route>
        <Route path="/profile">{isLoggedIn ? <Profile /> : <Redirect to="/login" />}</Route>
        <Route path="/manage-users">{isLoggedIn && userRole === 'admin' ? <ManageUsers /> : <Redirect to="/login" />}</Route>
        <Route path="/article/:id">
  <ArticleDetail articles={articles} deleteArticle={deleteArticle} updateArticle={updateArticle} />
</Route>
        <Route path="/my-articles">
          {isRouteAllowed('/my-articles') ? <MyArticles /> : <Redirect to="/login" />}
        </Route>
        <Route path="/subscription" component={Subscription} />
        <Route path="/Managecategories">
          {isRouteAllowed('/ManageCategories') ? <ManageCategories /> : <Redirect to="/login" />}
        </Route>
        <Route path="/Managesubcategories">
          {isRouteAllowed('/ManageSubcategories') ? <ManageSubcategories /> : <Redirect to="/login" />}
        </Route>
        <Route path="/automatic-offer">
          {isRouteAllowed('/automatic-offer') ? <AutomaticOffer /> : <Redirect to="/login" />}
        </Route>
        <Route path="/on-demand-offer">
          {isRouteAllowed('/on-demand-offer') ? <OnDemandOffer /> : <Redirect to="/login" />}
        </Route>
        <Route path="/process-subscription" component={ProcessSubscription} />
        <Route path="/EditProfile" component={EditProfile} />
        <Route path="/create-ad" component={CreateAd} />
        <Route path="/confirm" component={ConfirmationPage} />
        <Route path="/ForgotPassword" component={ForgotPassword} />
        <Route path="/ResetPassword" component={ResetPassword} />
                <Route path="/moderate-articles">
          {isRouteAllowed('/moderate-articles') ? <ModerateArticles /> : <Redirect to="/login" />}
        </Route>
        <Route path="/Employees"><Employees /></Route>
        <Route path="/Search"><Search /></Route>
      </Switch>
    </div>
  </Router>
);
};

export default App; 