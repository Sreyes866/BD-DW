import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [newUser, setNewUser] = useState({
    username: '',
    name: '',
    email: '',
    role: '',
    password: '',
    is_subscribed: '0',  // Valor predeterminado
    expiryDate: 'N/A',  // Valor predeterminado
});

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost/GetAllUsers.php');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleCreateUser = async () => {
    try {
      console.log("Sending Data:", newUser);  // Log the data being sent
      const response = await axios.post('http://localhost/UpdateUserProfile.php', { 
        action: 'createUser', 
        ...newUser
      });
      if (response.data.message === 'Usuario creado exitosamente') {
        fetchUsers();
        setNewUser({
          username: '', 
          name: '', 
          email: '', 
          role: '', 
          password: '', 
          is_subscribed: '', 
          expiryDate: '',
        });
      }
    } catch (error) {
      console.error('Error creating user:', error);
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error('Data:', error.response.data);
        console.error('Status:', error.response.status);
      }
    }
  };

  const handleDelete = async (username) => {
    try {
      const response = await axios.post('http://localhost/UpdateUserProfile.php', {
        action: 'deleteUser',
        username,
      });
      if (response.data.message === 'Usuario eliminado exitosamente') {
        fetchUsers();
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleSave = async (user) => {
    try {
      const { name, email, role, expiryDate } = user;
      const response = await axios.post('http://localhost/UpdateUserProfile.php', {
        action: 'updateUser',
        username: user.username,
        name,
        email,
        role,
        expiryDate,
      });
      if (response.data.message === 'Usuario actualizado exitosamente') {
        fetchUsers();
        setEditingIndex(null);
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="manage-users-container">
      <h1>Administrar Usuarios</h1>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Usuario</th>
            <th>Correo</th>
            <th>Rol</th>
            <th>Contraseña</th>
            <th>Membresía</th>
            <th>Fecha de expiración</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              {editingIndex === index ? (
                <>
                  <td><input defaultValue={user.name} onChange={(e) => user.name = e.target.value} /></td>
                  <td><input defaultValue={user.username} onChange={(e) => user.username = e.target.value} /></td>
                  <td><input defaultValue={user.email} onChange={(e) => user.email = e.target.value} /></td>
                  <td><input defaultValue={user.role} onChange={(e) => user.role = e.target.value} /></td>
                  <td>●●●●●●</td>
                  <td>{user.is_subscribed === '1' ? 'Activa' : 'Inactiva'}</td>
                  <td>
                    {user.is_subscribed === '1' ? 
                      <input type="date" defaultValue={user.expiryDate} onChange={(e) => user.expiryDate = e.target.value} /> 
                      : 'N/A'}
                  </td>
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
                  <td>●●●●●●</td>
                  <td>{user.is_subscribed === '1' ? 'Activa' : 'Inactiva'}</td>
                  <td>{user.expiryDate}</td>
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
      <input placeholder="Nombre" value={newUser.name} onChange={(e) => setNewUser({...newUser, name: e.target.value})} />
    <input placeholder="Usuario" value={newUser.username} onChange={(e) => setNewUser({...newUser, username: e.target.value})} />
    <input placeholder="Correo" value={newUser.email} onChange={(e) => setNewUser({...newUser, email: e.target.value})} />
    <input placeholder="Rol" value={newUser.role} onChange={(e) => setNewUser({...newUser, role: e.target.value})} />
    <input type="password" placeholder="Contraseña" value={newUser.password} onChange={(e) => setNewUser({...newUser, password: e.target.value})} />
    <select value={newUser.is_subscribed} onChange={(e) => setNewUser({...newUser, is_subscribed: e.target.value})}>
      <option value="0">Inactiva</option>
      <option value="1">Activa</option>
    </select>
    <input type="date" placeholder="Fecha de expiración" value={newUser.expiryDate} onChange={(e) => setNewUser({...newUser, expiryDate: e.target.value})} />
    <button onClick={handleCreateUser}>Crear Usuario</button>
  </div>
  );
};

export default ManageUsers;