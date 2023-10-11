import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import EditProfile from './EditProfile.jsx';

const Profile = () => {
  const history = useHistory();
  const { userName, userUsername, userEmail, userRole, userPassword, isSubscribed, expiryDate } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [showArticles, setShowArticles] = useState({ published: false, drafts: false, review: false });

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

  return (
    <div className="profile-container">
      <h1>Bienvenido, {userName}</h1>
      <div className="profile-card">
        {editMode ? (
          <div>
            <h1>Perfil</h1>
            <p>Nombre completo: {userName}</p>
            <p>Nombre de usuario: {userUsername}</p>
            <p>Email: {userEmail}</p>
            <p>Rol: {userRole}</p>
            <p>Contraseña: {userPassword}</p>
            <p>Membresía: {Number(isSubscribed) === 1 ? "Activa" : "Inactiva"}</p>
            {Number(isSubscribed) === 1 && <p>Fecha de expiración: {expiryDate}</p>}
            <button onClick={() => setEditMode(false)}>Cerrar Edición</button>
          </div>
        ) : (
          <div>
            <h2>{userName}</h2>
            <p>{userRole}</p>
            <div className="article-section">
              <h3 onClick={() => setShowArticles({ ...showArticles, published: !showArticles.published })}>Artículos Publicados</h3>
              <div className={`article-list ${showArticles.published ? 'show' : ''}`}>
                {/* Lista de artículos publicados */}
              </div>
            </div>
            <div className="article-section">
              <h3 onClick={() => setShowArticles({ ...showArticles, drafts: !showArticles.drafts })}>Artículos sin Publicar (Drafts)</h3>
              <div className={`article-list ${showArticles.drafts ? 'show' : ''}`}>
                {/* Lista de artículos en borradores */}
              </div>
            </div>
            <div className="article-section">
              <h3 onClick={() => setShowArticles({ ...showArticles, review: !showArticles.review })}>Artículos en Revisión</h3>
              <div className={`article-list ${showArticles.review ? 'show' : ''}`}>
                {/* Lista de artículos en revisión */}
              </div>
            </div>
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