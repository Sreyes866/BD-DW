import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const history = useHistory();
  const { setIsLoggedIn, setUserRole, setUserName, setUserEmail, setUserUsername, setUserPassword, setIsSubscribed, setExpiryDate } = useAuth();

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
        setUserName(response.data.user.name);  // Establece el nombre del usuario
        setUserEmail(response.data.user.email); // Establece el correo del usuario
        setUserPassword(response.data.user.password); // Establece la contraseña del usuario 
        setIsSubscribed(response.data.user.is_subscribed); // Establece el estado de la membresía 
        setExpiryDate(response.data.user.expiryDate); // Establece la fecha de expiración 
        setUserUsername(username); // Establece el username con el que se inició sesión
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
      <div className="forgot-password-container">
      <a href="/forgotPassword" className="forgot-password-link">¿Olvidaste la contraseña?</a>
    </div>
  </div>
  );
};

export default Login;
