import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const history = useHistory();
  const { userName, userUsername, userEmail, userRole, userPassword, isSubscribed, expiryDate } = useAuth();
  
  const [currentUser, setCurrentUser] = useState({
    username: userUsername,
    name: userName,
    email: userEmail,
    password: userPassword,
  });
  
  const [editMode, setEditMode] = useState(false);
  const [editDataMode, setEditDataMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Nuevo estado para mostrar/ocultar contraseña

  const fetchUserProfile = async () => {
    try {
      const response = await axios.post('http://localhost/GetUserProfile.php', { username: userName });
      if (response.data) {
        // Actualiza el estado según la respuesta del servidor
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, [userName]);

  const handleInputChange = (e, field) => {
    setCurrentUser({
      ...currentUser,
      [field]: e.target.value,
    });
  };

  const handleSaveChanges = async () => {
    try {
      const response = await axios.post('http://localhost/UpdateUserProfile.php', {
        action: 'updateUser',
        ...currentUser,
      });

      if (response.data.message === 'Usuario actualizado exitosamente') {
        setEditMode(false);
        setEditDataMode(false);
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="profile-container">
      <h1>Bienvenido, {userName}</h1>
      <div className="profile-card">
        {editMode ? (
          <div>
            <h1>Perfil</h1>
            {editDataMode ? (
              <>
                <label>Nombre completo:</label>
                <input defaultValue={userName} onChange={(e) => handleInputChange(e, 'name')} />
                <label>Email:</label>
                <input defaultValue={userEmail} type="email" onChange={(e) => handleInputChange(e, 'email')} />
                <label>Contraseña:</label>
                <input 
                  type={showPassword ? "text" : "password"} 
                  defaultValue={userPassword} 
                  onChange={(e) => handleInputChange(e, 'password')} 
                />
                <button onClick={togglePasswordVisibility}>
                  {showPassword ? 'Ocultar' : 'Mostrar'}
                </button>
                <button onClick={handleSaveChanges}>Guardar</button>
              </>
            ) : (
              <>
                <p>Nombre completo: {userName}</p>
                <p>Nombre de usuario: {userUsername}</p>
                <p>Email: {userEmail}</p>
                <p>Rol: {userRole}</p>
                <p>Contraseña: ******</p>
                <p>Membresía: {Number(isSubscribed) === 1 ? "Activa" : "Inactiva"}</p>
                {Number(isSubscribed) === 1 && <p>Fecha de expiración: {expiryDate}</p>}
              </>
            )}
            <button onClick={() => setEditMode(false)}>Cerrar Edición</button>
            <button onClick={() => setEditDataMode(true)}>Editar Datos</button>
          </div>
        ) : (
          <div>
            <h2>{userName}</h2>
            <p>{userRole}</p>
            <button onClick={() => setEditMode(true)}>Editar Perfil</button>
            <button onClick={() => history.push('/subscription')}>Administrar Suscripción</button>
            <button onClick={() => history.push('/manage-users')}>Administrar Usuarios</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;