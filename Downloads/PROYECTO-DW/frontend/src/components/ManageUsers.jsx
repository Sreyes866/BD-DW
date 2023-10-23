import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');  // estado para la búsqueda
  const [editingIndex, setEditingIndex] = useState(null);
  const [newUser, setNewUser] = useState({
    username: '',
    name: '',
    email: '',
    role: '',
    password: '',
    is_subscribed: '0',
    expiryDate: null,
    is_active: 1 // Default to active
  });

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost/GetAllUsers.php');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const toggleActive = async (username, isActive) => {
    try {
      const response = await axios.post('http://localhost/UpdateUserProfileAdmin.php', {
        action: 'toggleActive',
        username,
        is_active: isActive ? 1 : 0,
      });
      if (response.data.message === 'Usuario activado/desactivado exitosamente') {
        fetchUsers();
      }
    } catch (error) {
      console.error('Error al activar/desactivar usuario:', error);
    }
  };

  const handleCreateUser = async () => {
    try {
      const sendData = { 
        action: 'createUser', 
        ...newUser,
        expiryDate: newUser.is_subscribed === "1" ? newUser.expiryDate : null
      };
      const response = await axios.post('http://localhost/UpdateUserProfileAdmin.php', sendData);
      if (response.data.message === 'Usuario creado exitosamente') {
        fetchUsers();
        setNewUser({
          username: '', 
          name: '', 
          email: '', 
          role: '', 
          password: '', 
          is_subscribed: '0', 
          expiryDate: null,
          is_active: 1
        });
      }
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleDelete = async (username) => {
    try {
      const response = await axios.post('http://localhost/UpdateUserProfileAdmin.php', {
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
      const { name, email, role, expiryDate, is_active } = user;
      const response = await axios.post('http://localhost/UpdateUserProfileAdmin.php', {
        action: 'updateUser',
        username: user.username,
        name,
        email,
        role,
        expiryDate,
        is_active
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
  
  const filteredUsers = users.filter(user => {
    return user.username.toLowerCase().includes(search.toLowerCase());
  });


return (
  <div className="manage-users-container">
    <h1>Administrar Usuarios</h1>
    
    {/* Filtro de búsqueda */}
    <div className="search-bar">
      <input
        type="text"
        placeholder="Buscar por Usuario"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
    
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
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
        {filteredUsers.map((user, index) => (  
            <tr key={index}>
              {editingIndex === index ? (
                <>
                  <td><input defaultValue={user.name} onChange={(e) => user.name = e.target.value} /></td>
                  <td><input defaultValue={user.username} onChange={(e) => user.username = e.target.value} /></td>
                  <td><input defaultValue={user.email} onChange={(e) => user.email = e.target.value} /></td>
                  <td><input defaultValue={user.role} onChange={(e) => user.role = e.target.value} /></td>
                  <td>●●●●●●</td>
                  <td>{user.is_subscribed === '1' ? 'Activa' : 'Inactiva'}</td>
                  <td>{user.is_subscribed === '1' ? <input type="date" defaultValue={user.expiryDate} onChange={(e) => user.expiryDate = e.target.value} /> : 'N/A'}</td>
                  <td>{parseInt(user.is_active) === 1 ? 'Activo' : 'Inactivo'}</td>
                  <td>
                    <button onClick={() => handleSave(user)}>Guardar</button>
                    <button onClick={() => handleDelete(user.username)}>Eliminar</button>
                    <button onClick={() => toggleActive(user.username, user.is_active !== 1)}>{user.is_active === 1 ? 'Desactivar' : 'Activar'}</button>
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
                  <td>{parseInt(user.is_active) === 1 ? 'Activo' : 'Inactivo'}</td>
                  <td>
  <button onClick={() => setEditingIndex(index)}>Editar</button>
  <button onClick={() => handleDelete(user.username)}>Eliminar</button>
  <button onClick={() => toggleActive(user.username, parseInt(user.is_active) !== 1)}>
    {parseInt(user.is_active) === 1 ? 'Desactivar' : 'Activar'}
  </button>
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
      <select value={newUser.is_subscribed} onChange={(e) => setNewUser({...newUser, is_subscribed: e.target.value, expiryDate: e.target.value === "0" ? null : newUser.expiryDate})}>
        <option value="0">Inactiva</option>
        <option value="1">Activa</option>
      </select>
      {newUser.is_subscribed === "1" && (
        <input type="date" placeholder="Fecha de expiración" value={newUser.expiryDate || ''} onChange={(e) => setNewUser({...newUser, expiryDate: e.target.value})} />
      )}
      <select value={newUser.is_active} onChange={(e) => setNewUser({...newUser, is_active: parseInt(e.target.value)})}>
      <option value={1}>Activo</option>
        <option value={0}>Inactivo</option>
      </select>
      <button onClick={handleCreateUser}>Crear Usuario</button>
    </div>
  );
};

export default ManageUsers;