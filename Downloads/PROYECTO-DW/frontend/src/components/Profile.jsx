import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

const Profile = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="profile-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ display: 'flex', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', width: '80%' }}>
        
        {/* Parte izquierda */}
        <div style={{ flex: 1, padding: '20px' }}>
          <h2>John Doe</h2>
          <p>Rol: Usuario</p>
          <h3>Artículos Publicados</h3>
          {/* Tus artículos publicados */}
          <h3>Artículos sin Publicar (Drafts)</h3>
          {/* Tus drafts */}
        </div>
        
        {/* Parte derecha */}
        <div style={{ flex: 1, padding: '20px' }}>
          <h2>Perfil de Usuario</h2>
          <p>Nombre: Pablo Morales</p>
          <p>Usuario: pablo</p>
          <p>Email: john.doe@example.com</p>
          <p>Fecha de registro: 2021-01-01</p>
          <p>
            Contraseña: 
            <input 
              type={showPassword ? 'text' : 'password'} 
              value="db00" 
              readOnly 
              style={{border: 'none', outline: 'none'}}
            />
            <button onClick={togglePasswordVisibility}>{showPassword ? 'Ocultar' : 'Ver'}</button>
          </p>
          <p>Suscripción: Activa</p>
          <button className="btn btn-primary">Editar Perfil</button>
        </div>
        
      </div>
    </div>
  );
};

export default Profile;
