import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const EditProfile = () => {
  const [user, setUser] = useState(null);
  const { userName } = useAuth();

  const fetchUser = async () => {
    try {
      const response = await axios.post('http://localhost/GetSingleUser.php', { username: userName });
      if (response.data && response.data.message === 'Información del usuario') {
        console.log(response.data.user);  // Debugging
        setUser(response.data.user);
      } else {
        console.error('Unexpected server response:', response.data);
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleSave = async () => {
    try {
      const updatedUser = { ...user, username: userName };
      const response = await axios.post('http://localhost/UpdateUserProfile.php', { action: 'updateUser', ...updatedUser });
      if (response.data.message === 'Usuario actualizado exitosamente') {
        fetchUser();
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  if (!user) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="edit-profile-container">
      <h1>Editar Perfil</h1>
      <div>
        <div>
          <label>Nombre:</label>
          <input defaultValue={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} />
        </div>
        <div>
          <label>Email:</label>
          <input defaultValue={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" defaultValue={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
        </div>
        <button onClick={handleSave}>Guardar</button>
      </div>
    </div>
  );
};

export default EditProfile;
      