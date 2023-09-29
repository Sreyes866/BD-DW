import React, { useState } from 'react';

const Profile = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState('Pablo Morales');
  const [username, setUsername] = useState('pablo');
  const [email, setEmail] = useState('pablo.m@example.com');
  const [password, setPassword] = useState('db00');

  // Simulación de artículos
  const [publishedArticles, setPublishedArticles] = useState(['Articulo 1', 'Articulo 2']);
  const [draftArticles, setDraftArticles] = useState(['Draft 1', 'Draft 2']);
  const [reviewArticles, setReviewArticles] = useState(['Review 1', 'Review 2']);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleSubscription = () => {
    // Lógica para manejar la suscripción
  };

  return (
    <div className="profile-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ display: 'flex', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', width: '80%' }}>
        
        <div style={{ flex: 1, padding: '20px' }}>
          <h2>{name}</h2>
          <p>Rol: Usuario</p>
          <h3>Artículos Publicados</h3>
          {publishedArticles.map(article => (
            <div key={article}>{article}</div>
          ))}
          <h3>Artículos sin Publicar (Drafts)</h3>
          {draftArticles.map(article => (
            <div key={article}>{article}</div>
          ))}
          <h3>Artículos en Revisión</h3>
          {reviewArticles.map(article => (
            <div key={article}>{article}</div>
          ))}
        </div>

        <div style={{ flex: 1, padding: '20px' }}>
          <h2>Perfil de Usuario</h2>
          {editMode ? (
            <div>
              <input type="text" value={name} onChange={e => setName(e.target.value)} />
              <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
              <button onClick={toggleEditMode}>Guardar</button>
            </div>
          ) : (
            <div>
              <p>Nombre: {name}</p>
              <p>Usuario: {username}</p>
              <p>Email: {email}</p>
              <p>Fecha de registro: 2023-05-05</p>
              <p>
                Contraseña: 
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  value={password} 
                  readOnly 
                  style={{border: 'none', outline: 'none'}}
                />
                <button onClick={togglePasswordVisibility}>{showPassword ? 'Ocultar' : 'Ver'}</button>
              </p>
              <p>Suscripción: Activa</p>
              <button className="btn btn-primary" onClick={toggleEditMode}>Editar Perfil</button>
              <button onClick={handleSubscription}>Administrar Suscripción</button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Profile;