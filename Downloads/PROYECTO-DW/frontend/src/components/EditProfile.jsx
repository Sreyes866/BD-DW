import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EditProfile = () => {
  const [users, setUsers] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const loggedInUsername = localStorage.getItem('username');

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost/GetAllUsers.php');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleSave = async (user) => {
    try {
      const response = await axios.post('http://localhost/UpdateUserProfile.php', { action: 'updateUser', ...user });
      if (response.data.message === 'Usuario actualizado exitosamente') {
        fetchUsers();
        setEditingIndex(null);
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDelete = async (username) => {
    try {
      const response = await axios.post('http://localhost/UpdateUserProfile.php', { action: 'deleteUser', username });
      if (response.data.message === 'Usuario eliminado exitosamente') {
        fetchUsers();
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="edit-profile-container">
      <h1>Editar Perfil</h1>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Usuario</th>
            <th>Correo</th>
            <th>Rol</th>
            <th>Contraseña</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              {editingIndex === index ? (
                <>
                  <td><input defaultValue={user.name} onChange={(e) => user.name = e.target.value} /></td>
                  <td>{user.username}</td>
                  <td><input defaultValue={user.email} onChange={(e) => user.email = e.target.value} /></td>
                  <td>{user.role}</td>
                  <td><input defaultValue={user.password} onChange={(e) => user.password = e.target.value} /></td>
                  <td>
                    <button onClick={() => handleSave(user)}>Guardar</button>
                    <button onClick={() => handleDelete(user.username)}>Eliminar</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.password}</td>
                  <td>
                    <button onClick={() => setEditingIndex(index)}>Editar</button>
                    <button onClick={() => handleDelete(user.username)}>Eliminar</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EditProfile;
