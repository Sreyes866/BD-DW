import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PremiumCategoriesManager from './PremiumCategoriesManager';
import AssignCategoriesToAuthor from './AssignCategoriesToAuthor';

const Profile = () => {
  const history = useHistory();
  const { userName, userUsername, userEmail, userRole, userPassword, isSubscribed, expiryDate } = useAuth();
  const { resetAuth } = useAuth(); // REINICIAR SESION

  const [currentUser, setCurrentUser] = useState({
    username: userUsername,
    name: userName,
    email: userEmail,
    password: userPassword,
  });

  const [editMode, setEditMode] = useState(false);
  const [editDataMode, setEditDataMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [changePasswordMode, setChangePasswordMode] = useState(false);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.post('http://localhost/GetUserProfile.php', { username: userName });
      if (response.data) {
        // Actualizar el estado según la respuesta del servidor
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
    if (field === 'password') {
      setConfirmPassword('');
    }
  };

  const handleSaveChanges = async () => {
    if (changePasswordMode && currentUser.password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    try {
      const response = await axios.post('http://localhost/UpdateUserProfile.php', {
        action: 'updateUser',
        ...currentUser,
      });
      if (response.data.message === 'Usuario actualizado exitosamente') {
        setEditMode(false);
        setEditDataMode(false);
        setChangePasswordMode(false);
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogout = () => {
    resetAuth(); 
    history.push('/home'); 
  };


  return (
    <div className="profile-container">
      <h1>Bienvenido, {currentUser.name}</h1>
      <div className="profile-card">
        {editMode ? (
          <div>
            <h1>Perfil</h1>
            {editDataMode ? (
              <>
                <div className="input-group">
                  <label>Nombre completo:</label>
                  <input 
                    readOnly={changePasswordMode}
                    defaultValue={currentUser.name} 
                    onChange={(e) => handleInputChange(e, 'name')} 
                  />
                </div>
                <div className="input-group">
                  <label>Email:</label>
                  <input 
                    readOnly={changePasswordMode}
                    defaultValue={currentUser.email} 
                    type="email" 
                    onChange={(e) => handleInputChange(e, 'email')} 
                  />
                </div>
                {changePasswordMode && (
                  <>
                    <div className="input-group">
                      <label>Contraseña:</label>
                      <input 
                        type={showPassword ? "text" : "password"} 
                        defaultValue={currentUser.password} 
                        onChange={(e) => handleInputChange(e, 'password')} 
                      />
                    </div>
                    <div className="input-group">
                      <label>Confirmar Contraseña:</label>
                      <input 
                        type="password" 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                      />
                    </div>
                    <button onClick={togglePasswordVisibility}>
                      {showPassword ? 'Ocultar' : 'Mostrar'}
                    </button>
                  </>
                )}
                { !changePasswordMode && <button onClick={() => setChangePasswordMode(true)}>Cambiar Contraseña</button> }
                <button onClick={handleSaveChanges}>Guardar</button>
                <button onClick={() => setEditMode(false)}>Cerrar Edición</button>
              </>
            ) : (
              <>
                <p>Nombre completo: {currentUser.name}</p>
                <p>Nombre de usuario: {currentUser.username}</p>
                <p>Email: {currentUser.email}</p>
                <p>Rol: {userRole}</p>
                <p>Contraseña: ******</p>
                <p>Membresía: {Number(isSubscribed) === 1 ? "Activa" : "Inactiva"}</p>
                {Number(isSubscribed) === 1 && <p>Fecha de expiración: {expiryDate}</p>}
                <button onClick={() => setEditDataMode(true)}>Editar Datos</button>
              </>
            )}
          </div>
        ) : (
          <div>
            <h2>{currentUser.name}</h2>
            <p>{userRole}</p>
            <button onClick={() => setEditMode(true)}>Editar Perfil</button>
            <button onClick={() => history.push('/subscription')}>Administrar Suscripción</button>
            {userRole === 'admin' && (
  <>
    <button onClick={() => history.push('/manage-users')}>Administrar Usuarios</button>
    <button onClick={() => history.push('/create-ad')}>Administrar Anuncios</button>
    <button onClick={() => history.push('/authors-articles')}>Administrar Autores</button>
  </>
)}

            {userRole === 'admin' && <PremiumCategoriesManager />}
            {userRole === 'admin' && <AssignCategoriesToAuthor />}
          </div>
        )}
      </div>
      <button className="logout-button" onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
};

export default Profile;