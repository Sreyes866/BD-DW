import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Register = () => {
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const name = e.target.name.value;
      const username = e.target.username.value;
      const email = e.target.email.value;
      const password = e.target.password.value;
  
      const response = await axios.post('http://localhost/register.php', {
        name,
        username,
        email,
        password,
      });

      if (response.status === 200 && response.data.message === 'Usuario registrado') {
        alert('Se ha enviado un correo electrónico de confirmación. Por favor, confirma tu registro.');
        history.push('/login');
      } else {
        alert('Error al registrar usuario');
      }
    } catch (error) {
      console.error("Error en la petición:", error);
      alert('Error al realizar la petición');
    }
  };

  return (
    <div className="register-container">
      <h1>Registrarse</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nombre</label>
          <input type="text" id="name" name="name" />
        </div>
        <div className="form-group">
          <label htmlFor="username">Usuario</label>
          <input type="text" id="username" name="username" />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input type="password" id="password" name="password" />
        </div>
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default Register;