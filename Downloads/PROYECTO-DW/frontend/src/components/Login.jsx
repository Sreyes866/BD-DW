import React from 'react';
import { useHistory } from 'react-router-dom';

const Login = ({ setIsLoggedIn }) => {
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    if (username === 'pablo' && password === 'db00') {
      setIsLoggedIn(true);
      history.push('/create-article');
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className="login-container">
      <h1 className="welcome-message">Bienvenido a ThinkSphere</h1>
      <p className="welcome-lema">Donde tus ideas toman forma</p>
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Usuario</label>
          <input type="text" id="username" name="username" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input type="password" id="password" name="password" />
        </div>
        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
};

export default Login;
