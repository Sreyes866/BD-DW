import React, { useState } from 'react';

const Profile = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState('Pablo Morales');
  const [username, setUsername] = useState('pablo');
  const [email, setEmail] = useState('pablo.m@example.com');
  const [password, setPassword] = useState('db00');
  const [showArticles, setShowArticles] = useState({ published: false, drafts: false, review: false });

  const publishedArticles = ['Articulo 1', 'Articulo 2'];
  const draftArticles = ['Draft 1', 'Draft 2'];
  const reviewArticles = ['Review 1', 'Review 2'];

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const toggleShowArticles = (type) => {
    setShowArticles({ ...showArticles, [type]: !showArticles[type] });
  };

  const handleSubscription = () => {
    // Lógica para manejar la suscripción
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        {editMode ? (
          <div className="right-section">
            <h2>Editar Perfil</h2>
            <label>Nombre:</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} />
            <label>Usuario:</label>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
            <div className="email-password-field">
              <label>Correo:</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="email-password-field">
              <label>Contraseña:</label>
              <input 
                type={showPassword ? 'text' : 'password'} 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
              />
              <button onClick={togglePasswordVisibility}>{showPassword ? 'Ocultar' : 'Ver'}</button>
            </div>
            <button className="btn btn-primary" onClick={toggleEditMode}>Guardar Cambios</button>
            <button className="btn btn-primary" onClick={handleSubscription}>Administrar Suscripción</button>
          </div>
        ) : (
          <div className="left-section">
            <h2>{name}</h2>
            <p>Rol: Usuario</p>
            <div className="article-section">
              <h3>Artículos Publicados</h3>
              <div className="article-list">
                {publishedArticles.map(article => <div key={article}>{article}</div>)}
              </div>
            </div>
            <div className="article-section">
              <h3>Artículos sin Publicar (Drafts)</h3>
              <div className="article-list">
                {draftArticles.map(article => <div key={article}>{article}</div>)}
              </div>
            </div>
            <div className="article-section">
              <h3>Artículos en Revisión</h3>
              <div className="article-list">
                {reviewArticles.map(article => <div key={article}>{article}</div>)}
              </div>
            </div>
            <button className="btn btn-primary" onClick={toggleEditMode}>Editar Perfil</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;