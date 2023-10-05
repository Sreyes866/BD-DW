import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const history = useHistory();
  const { setIsLoggedIn, setUserRole, setUserName } = useAuth();  // Añadido setUserName

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    try {
      const response = await axios.post('http://localhost/login.php', {
        username,
        password,
      });

      console.log("Respuesta del servidor: ", response.data);

      if (response.data.message === 'Usuario autenticado') {
        setIsLoggedIn(true);
        setUserRole(response.data.user.role);
        setUserName(response.data.user.name);  // Nuevo - establece el nombre del usuario
        history.push('/home');
      } else {
        alert('Usuario o contraseña incorrectos');
      }
    } catch (error) {
      console.error("Error al realizar la petición:", error);
      alert('Error al realizar la petición');
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