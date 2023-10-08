import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import EditProfile from './EditProfile.jsx';  // Importar el nuevo componente

const Profile = () => {
  const history = useHistory();
  const { username, userName } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [showTable, setShowTable] = useState(false);
  const [showArticles, setShowArticles] = useState({ published: false, drafts: false, review: false });

  const publishedArticles = ['Articulo 1', 'Articulo 2'];
  const draftArticles = ['Draft 1', 'Draft 2'];
  const reviewArticles = ['Review 1', 'Review 2'];

  const fetchUserProfile = async () => {
    try {
      const response = await axios.post('http://localhost/GetUserProfile.php', { username });
      if (response.data) {
        setName(response.data.name || '');
        setEmail(response.data.email || '');
        setPassword(response.data.password || '');
        setRole(response.data.role || '');
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, [username]);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  
  const toggleEditMode = () => {
    setShowTable(!showTable);  
    setEditMode(!editMode);
  };
  const toggleShowArticles = (type) => setShowArticles({ ...showArticles, [type]: !showArticles[type] });
  const handleSubscription = () => history.push('/subscription');
  const manageUsers = () => history.push('/manage-users');

  const saveChanges = async () => {
    try {
      const response = await axios.post('http://localhost/UpdateUserProfile.php', { username, name, email, password });
      if (response.data.message === 'Perfil actualizado exitosamente') {
        alert('Perfil actualizado exitosamente');
        fetchUserProfile();
        toggleEditMode();
      } else {
        alert('No se pudo actualizar el perfil');
        console.log('Error:', response.data.error);
      }
    } catch (error) {
      alert('Error al actualizar el perfil');
    }
  };


  return (
    <div className="profile-container">
      <h1>Bienvenido, {userName}</h1>
      <div className="profile-card">
        {showTable ? (
          <EditProfile username={username} /> // Mostrar la tabla si showTable es verdadero
        ) : (
          editMode ? (
            <div className="right-section">
              <h2>Editar Perfil</h2>
              <label>Nombre:</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} />
              <label>Correo:</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
              <label>Contraseña:</label>
              <input 
                type={showPassword ? 'text' : 'password'} 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
              />
              <button onClick={togglePasswordVisibility}>{showPassword ? 'Ocultar' : 'Ver'}</button>
              <button className="btn btn-primary" onClick={saveChanges}>Guardar Cambios</button>
              <button className="btn btn-primary" onClick={handleSubscription}>Administrar Suscripción</button>
              <button className="btn btn-primary" onClick={manageUsers}>Administrar Usuarios</button>
            </div>
          ) : (
            <div className="left-section">
              <h2>{name}</h2>
              <p>{role}</p>
              <div className="article-section">
                <h3 onClick={() => toggleShowArticles('published')}>Artículos Publicados</h3>
                <div className={`article-list ${showArticles.published ? 'show' : ''}`}>
                  {publishedArticles.map(article => <div key={article}>{article}</div>)}
                </div>
              </div>
              <div className="article-section">
                <h3 onClick={() => toggleShowArticles('drafts')}>Artículos sin Publicar (Drafts)</h3>
                <div className={`article-list ${showArticles.drafts ? 'show' : ''}`}>
                  {draftArticles.map(article => <div key={article}>{article}</div>)}
                </div>
              </div>
              <div className="article-section">
                <h3 onClick={() => toggleShowArticles('review')}>Artículos en Revisión</h3>
                <div className={`article-list ${showArticles.review ? 'show' : ''}`}>
                  {reviewArticles.map(article => <div key={article}>{article}</div>)}
                </div>
              </div>
              <button className="btn btn-primary" onClick={toggleEditMode}>Editar Perfil</button>
              <button className="btn btn-primary" onClick={handleSubscription}>Administrar Suscripción</button>
              <button className="btn btn-primary" onClick={manageUsers}>Administrar Usuarios</button>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Profile;