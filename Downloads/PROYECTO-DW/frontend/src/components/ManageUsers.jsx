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
    nationality: '',
    is_subscribed: '0',
    expiryDate: null,
    is_active: 1
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
          nationality: '',
          is_subscribed: '0', 
          expiryDate: null,
          is_active: 1 // Añadido el campo nationality
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
      const { name, email, role, expiryDate, is_active, nationality } = user; // Añadido nationality
      const response = await axios.post('http://localhost/UpdateUserProfileAdmin.php', {
        action: 'updateUser',
        username: user.username,
        name,
        email,
        role,
        nationality,
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
            <th>Nacionalidad</th>
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
                  <td>
  <select defaultValue={user.role} onChange={(e) => user.role = e.target.value}>
    <option value="logged_in_visitor">Visitante Registrado</option>
    <option value="moderator">Moderador</option>
    <option value="author">Autor</option>
    <option value="admin">Admin</option>
  </select>
</td>
                  <td>●●●●●●</td>
<td>
  <select defaultValue={user.nationality} onChange={(e) => user.nationality = e.target.value}>
  <option value="Afganistán">Afganistán</option>
<option value="Albania">Albania</option>
<option value="Alemania">Alemania</option>
<option value="Andorra">Andorra</option>
<option value="Angola">Angola</option>
<option value="Antigua y Barbuda">Antigua y Barbuda</option>
<option value="Arabia Saudita">Arabia Saudita</option>
<option value="Argelia">Argelia</option>
<option value="Argentina">Argentina</option>
<option value="Armenia">Armenia</option>
<option value="Australia">Australia</option>
<option value="Austria">Austria</option>
<option value="Azerbaiyán">Azerbaiyán</option>
<option value="Bahamas">Bahamas</option>
<option value="Bangladés">Bangladés</option>
<option value="Barbados">Barbados</option>
<option value="Baréin">Baréin</option>
<option value="Bélgica">Bélgica</option>
<option value="Belice">Belice</option>
<option value="Benín">Benín</option>
<option value="Bielorrusia">Bielorrusia</option>
<option value="Birmania">Birmania</option>
<option value="Bolivia">Bolivia</option>
<option value="Bosnia y Herzegovina">Bosnia y Herzegovina</option>
<option value="Botsuana">Botsuana</option>
<option value="Brasil">Brasil</option>
<option value="Brunéi">Brunéi</option>
<option value="Bulgaria">Bulgaria</option>
<option value="Burkina Faso">Burkina Faso</option>
<option value="Burundi">Burundi</option>
<option value="Bután">Bután</option>
<option value="Cabo Verde">Cabo Verde</option>
<option value="Camboya">Camboya</option>
<option value="Camerún">Camerún</option>
<option value="Canadá">Canadá</option>
<option value="Catar">Catar</option>
<option value="Chad">Chad</option>
<option value="Chile">Chile</option>
<option value="China">China</option>
<option value="Chipre">Chipre</option>
<option value="Ciudad del Vaticano">Ciudad del Vaticano</option>
<option value="Colombia">Colombia</option>
<option value="Comoras">Comoras</option>
<option value="Corea del Norte">Corea del Norte</option>
<option value="Corea del Sur">Corea del Sur</option>
<option value="Costa de Marfil">Costa de Marfil</option>
<option value="Costa Rica">Costa Rica</option>
<option value="Croacia">Croacia</option>
<option value="Cuba">Cuba</option>
<option value="Dinamarca">Dinamarca</option>
<option value="Dominica">Dominica</option>
<option value="Ecuador">Ecuador</option>
<option value="Egipto">Egipto</option>
<option value="El Salvador">El Salvador</option>
<option value="Emiratos Árabes Unidos">Emiratos Árabes Unidos</option>
<option value="Eritrea">Eritrea</option>
<option value="Eslovaquia">Eslovaquia</option>
<option value="Eslovenia">Eslovenia</option>
<option value="España">España</option>
<option value="Estados Unidos">Estados Unidos</option>
<option value="Estonia">Estonia</option>
<option value="Etiopía">Etiopía</option>
<option value="Filipinas">Filipinas</option>
<option value="Finlandia">Finlandia</option>
<option value="Fiyi">Fiyi</option>
<option value="Francia">Francia</option>
<option value="Gabón">Gabón</option>
<option value="Gambia">Gambia</option>
<option value="Georgia">Georgia</option>
<option value="Ghana">Ghana</option>
<option value="Granada">Granada</option>
<option value="Grecia">Grecia</option>
<option value="Guatemala">Guatemala</option>
<option value="Guyana">Guyana</option>
<option value="Guinea">Guinea</option>
<option value="Guinea-Bisáu">Guinea-Bisáu</option>
<option value="Guinea Ecuatorial">Guinea Ecuatorial</option>
<option value="Haití">Haití</option>
<option value="Honduras">Honduras</option>
<option value="Hungría">Hungría</option>
<option value="India">India</option>
<option value="Indonesia">Indonesia</option>
<option value="Irak">Irak</option>
<option value="Irán">Irán</option>
<option value="Irlanda">Irlanda</option>
<option value="Islandia">Islandia</option>
<option value="Islas Marshall">Islas Marshall</option>
<option value="Islas Salomón">Islas Salomón</option>
<option value="Israel">Israel</option>
<option value="Italia">Italia</option>
<option value="Jamaica">Jamaica</option>
<option value="Japón">Japón</option>
<option value="Jordania">Jordania</option>
<option value="Kazajistán">Kazajistán</option>
<option value="Kenia">Kenia</option>
<option value="Kirguistán">Kirguistán</option>
<option value="Kiribati">Kiribati</option>
<option value="Kuwait">Kuwait</option>
<option value="Laos">Laos</option>
<option value="Lesoto">Lesoto</option>
<option value="Letonia">Letonia</option>
<option value="Líbano">Líbano</option>
<option value="Liberia">Liberia</option>
<option value="Libia">Libia</option>
<option value="Liechtenstein">Liechtenstein</option>
<option value="Lituania">Lituania</option>
<option value="Luxemburgo">Luxemburgo</option>
<option value="Macedonia del Norte">Macedonia del Norte</option>
<option value="Madagascar">Madagascar</option>
<option value="Malaui">Malaui</option>
<option value="Malasia">Malasia</option>
<option value="Maldivas">Maldivas</option>
<option value="Malí">Malí</option>
<option value="Malta">Malta</option>
<option value="Marruecos">Marruecos</option>
<option value="Mauricio">Mauricio</option>
<option value="Mauritania">Mauritania</option>
<option value="México">México</option>
<option value="Micronesia">Micronesia</option>
<option value="Moldavia">Moldavia</option>
<option value="Mónaco">Mónaco</option>
<option value="Mongolia">Mongolia</option>
<option value="Montenegro">Montenegro</option>
<option value="Mozambique">Mozambique</option>
<option value="Namibia">Namibia</option>
<option value="Nauru">Nauru</option>
<option value="Nepal">Nepal</option>
<option value="Nicaragua">Nicaragua</option>
<option value="Níger">Níger</option>
<option value="Nigeria">Nigeria</option>
<option value="Noruega">Noruega</option>
<option value="Nueva Zelanda">Nueva Zelanda</option>
<option value="Omán">Omán</option>
<option value="Países Bajos">Países Bajos</option>
<option value="Pakistán">Pakistán</option>
<option value="Palaos">Palaos</option>
<option value="Panamá">Panamá</option>
<option value="Papúa Nueva Guinea">Papúa Nueva Guinea</option>
<option value="Paraguay">Paraguay</option>
<option value="Perú">Perú</option>
<option value="Polonia">Polonia</option>
<option value="Portugal">Portugal</option>
<option value="Reino Unido">Reino Unido</option>
<option value="República Centroafricana">República Centroafricana</option>
<option value="República Checa">República Checa</option>
<option value="República del Congo">República del Congo</option>
<option value="República Dominicana">República Dominicana</option>
<option value="Ruanda">Ruanda</option>
<option value="Rumania">Rumania</option>
<option value="Rusia">Rusia</option>
<option value="Samoa">Samoa</option>
<option value="San Cristóbal y Nieves">San Cristóbal y Nieves</option>
<option value="San Marino">San Marino</option>
<option value="San Vicente y las Granadinas">San Vicente y las Granadinas</option>
<option value="Santa Lucía">Santa Lucía</option>
<option value="Santo Tomé y Príncipe">Santo Tomé y Príncipe</option>
<option value="Senegal">Senegal</option>
<option value="Serbia">Serbia</option>
<option value="Seychelles">Seychelles</option>
<option value="Sierra Leona">Sierra Leona</option>
<option value="Singapur">Singapur</option>
<option value="Siria">Siria</option>
<option value="Somalia">Somalia</option>
<option value="Sri Lanka">Sri Lanka</option>
<option value="Suazilandia">Suazilandia</option>
<option value="Sudáfrica">Sudáfrica</option>
<option value="Sudán">Sudán</option>
<option value="Sudán del Sur">Sudán del Sur</option>
<option value="Suecia">Suecia</option>
<option value="Suiza">Suiza</option>
<option value="Surinam">Surinam</option>
<option value="Tailandia">Tailandia</option>
<option value="Tanzania">Tanzania</option>
<option value="Tayikistán">Tayikistán</option>
<option value="Timor Oriental">Timor Oriental</option>
<option value="Togo">Togo</option>
<option value="Tonga">Tonga</option>
<option value="Trinidad y Tobago">Trinidad y Tobago</option>
<option value="Túnez">Túnez</option>
<option value="Turkmenistán">Turkmenistán</option>
<option value="Turquía">Turquía</option>
<option value="Tuvalu">Tuvalu</option>
<option value="Ucrania">Ucrania</option>
<option value="Uganda">Uganda</option>
<option value="Uruguay">Uruguay</option>
<option value="Uzbekistán">Uzbekistán</option>
<option value="Vanuatu">Vanuatu</option>
<option value="Venezuela">Venezuela</option>
<option value="Vietnam">Vietnam</option>
<option value="Yemen">Yemen</option>
<option value="Yibuti">Yibuti</option>
<option value="Zambia">Zambia</option>
<option value="Zimbabue">Zimbabue</option>  </select>
</td>
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
                  <td>{user.nationality}</td>
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
      <select value={newUser.role} onChange={(e) => setNewUser({...newUser, role: e.target.value})}>
  <option value="">Seleccionar rol</option>
  <option value="logged_in_visitor">Visitante Registrado</option>
  <option value="moderator">Moderador</option>
  <option value="author">Autor</option>
  <option value="admin">Admin</option>
</select>
      <input type="password" placeholder="Contraseña" value={newUser.password} onChange={(e) => setNewUser({...newUser, password: e.target.value})} />
      <select value={newUser.nationality} onChange={(e) => setNewUser({...newUser, nationality: e.target.value})}>
  <option value="">Seleccionar nacionalidad</option>
  <option value="Afganistán">Afganistán</option>
<option value="Albania">Albania</option>
<option value="Alemania">Alemania</option>
<option value="Andorra">Andorra</option>
<option value="Angola">Angola</option>
<option value="Antigua y Barbuda">Antigua y Barbuda</option>
<option value="Arabia Saudita">Arabia Saudita</option>
<option value="Argelia">Argelia</option>
<option value="Argentina">Argentina</option>
<option value="Armenia">Armenia</option>
<option value="Australia">Australia</option>
<option value="Austria">Austria</option>
<option value="Azerbaiyán">Azerbaiyán</option>
<option value="Bahamas">Bahamas</option>
<option value="Bangladés">Bangladés</option>
<option value="Barbados">Barbados</option>
<option value="Baréin">Baréin</option>
<option value="Bélgica">Bélgica</option>
<option value="Belice">Belice</option>
<option value="Benín">Benín</option>
<option value="Bielorrusia">Bielorrusia</option>
<option value="Birmania">Birmania</option>
<option value="Bolivia">Bolivia</option>
<option value="Bosnia y Herzegovina">Bosnia y Herzegovina</option>
<option value="Botsuana">Botsuana</option>
<option value="Brasil">Brasil</option>
<option value="Brunéi">Brunéi</option>
<option value="Bulgaria">Bulgaria</option>
<option value="Burkina Faso">Burkina Faso</option>
<option value="Burundi">Burundi</option>
<option value="Bután">Bután</option>
<option value="Cabo Verde">Cabo Verde</option>
<option value="Camboya">Camboya</option>
<option value="Camerún">Camerún</option>
<option value="Canadá">Canadá</option>
<option value="Catar">Catar</option>
<option value="Chad">Chad</option>
<option value="Chile">Chile</option>
<option value="China">China</option>
<option value="Chipre">Chipre</option>
<option value="Ciudad del Vaticano">Ciudad del Vaticano</option>
<option value="Colombia">Colombia</option>
<option value="Comoras">Comoras</option>
<option value="Corea del Norte">Corea del Norte</option>
<option value="Corea del Sur">Corea del Sur</option>
<option value="Costa de Marfil">Costa de Marfil</option>
<option value="Costa Rica">Costa Rica</option>
<option value="Croacia">Croacia</option>
<option value="Cuba">Cuba</option>
<option value="Dinamarca">Dinamarca</option>
<option value="Dominica">Dominica</option>
<option value="Ecuador">Ecuador</option>
<option value="Egipto">Egipto</option>
<option value="El Salvador">El Salvador</option>
<option value="Emiratos Árabes Unidos">Emiratos Árabes Unidos</option>
<option value="Eritrea">Eritrea</option>
<option value="Eslovaquia">Eslovaquia</option>
<option value="Eslovenia">Eslovenia</option>
<option value="España">España</option>
<option value="Estados Unidos">Estados Unidos</option>
<option value="Estonia">Estonia</option>
<option value="Etiopía">Etiopía</option>
<option value="Filipinas">Filipinas</option>
<option value="Finlandia">Finlandia</option>
<option value="Fiyi">Fiyi</option>
<option value="Francia">Francia</option>
<option value="Gabón">Gabón</option>
<option value="Gambia">Gambia</option>
<option value="Georgia">Georgia</option>
<option value="Ghana">Ghana</option>
<option value="Granada">Granada</option>
<option value="Grecia">Grecia</option>
<option value="Guatemala">Guatemala</option>
<option value="Guyana">Guyana</option>
<option value="Guinea">Guinea</option>
<option value="Guinea-Bisáu">Guinea-Bisáu</option>
<option value="Guinea Ecuatorial">Guinea Ecuatorial</option>
<option value="Haití">Haití</option>
<option value="Honduras">Honduras</option>
<option value="Hungría">Hungría</option>
<option value="India">India</option>
<option value="Indonesia">Indonesia</option>
<option value="Irak">Irak</option>
<option value="Irán">Irán</option>
<option value="Irlanda">Irlanda</option>
<option value="Islandia">Islandia</option>
<option value="Islas Marshall">Islas Marshall</option>
<option value="Islas Salomón">Islas Salomón</option>
<option value="Israel">Israel</option>
<option value="Italia">Italia</option>
<option value="Jamaica">Jamaica</option>
<option value="Japón">Japón</option>
<option value="Jordania">Jordania</option>
<option value="Kazajistán">Kazajistán</option>
<option value="Kenia">Kenia</option>
<option value="Kirguistán">Kirguistán</option>
<option value="Kiribati">Kiribati</option>
<option value="Kuwait">Kuwait</option>
<option value="Laos">Laos</option>
<option value="Lesoto">Lesoto</option>
<option value="Letonia">Letonia</option>
<option value="Líbano">Líbano</option>
<option value="Liberia">Liberia</option>
<option value="Libia">Libia</option>
<option value="Liechtenstein">Liechtenstein</option>
<option value="Lituania">Lituania</option>
<option value="Luxemburgo">Luxemburgo</option>
<option value="Macedonia del Norte">Macedonia del Norte</option>
<option value="Madagascar">Madagascar</option>
<option value="Malaui">Malaui</option>
<option value="Malasia">Malasia</option>
<option value="Maldivas">Maldivas</option>
<option value="Malí">Malí</option>
<option value="Malta">Malta</option>
<option value="Marruecos">Marruecos</option>
<option value="Mauricio">Mauricio</option>
<option value="Mauritania">Mauritania</option>
<option value="México">México</option>
<option value="Micronesia">Micronesia</option>
<option value="Moldavia">Moldavia</option>
<option value="Mónaco">Mónaco</option>
<option value="Mongolia">Mongolia</option>
<option value="Montenegro">Montenegro</option>
<option value="Mozambique">Mozambique</option>
<option value="Namibia">Namibia</option>
<option value="Nauru">Nauru</option>
<option value="Nepal">Nepal</option>
<option value="Nicaragua">Nicaragua</option>
<option value="Níger">Níger</option>
<option value="Nigeria">Nigeria</option>
<option value="Noruega">Noruega</option>
<option value="Nueva Zelanda">Nueva Zelanda</option>
<option value="Omán">Omán</option>
<option value="Países Bajos">Países Bajos</option>
<option value="Pakistán">Pakistán</option>
<option value="Palaos">Palaos</option>
<option value="Panamá">Panamá</option>
<option value="Papúa Nueva Guinea">Papúa Nueva Guinea</option>
<option value="Paraguay">Paraguay</option>
<option value="Perú">Perú</option>
<option value="Polonia">Polonia</option>
<option value="Portugal">Portugal</option>
<option value="Reino Unido">Reino Unido</option>
<option value="República Centroafricana">República Centroafricana</option>
<option value="República Checa">República Checa</option>
<option value="República del Congo">República del Congo</option>
<option value="República Dominicana">República Dominicana</option>
<option value="Ruanda">Ruanda</option>
<option value="Rumania">Rumania</option>
<option value="Rusia">Rusia</option>
<option value="Samoa">Samoa</option>
<option value="San Cristóbal y Nieves">San Cristóbal y Nieves</option>
<option value="San Marino">San Marino</option>
<option value="San Vicente y las Granadinas">San Vicente y las Granadinas</option>
<option value="Santa Lucía">Santa Lucía</option>
<option value="Santo Tomé y Príncipe">Santo Tomé y Príncipe</option>
<option value="Senegal">Senegal</option>
<option value="Serbia">Serbia</option>
<option value="Seychelles">Seychelles</option>
<option value="Sierra Leona">Sierra Leona</option>
<option value="Singapur">Singapur</option>
<option value="Siria">Siria</option>
<option value="Somalia">Somalia</option>
<option value="Sri Lanka">Sri Lanka</option>
<option value="Suazilandia">Suazilandia</option>
<option value="Sudáfrica">Sudáfrica</option>
<option value="Sudán">Sudán</option>
<option value="Sudán del Sur">Sudán del Sur</option>
<option value="Suecia">Suecia</option>
<option value="Suiza">Suiza</option>
<option value="Surinam">Surinam</option>
<option value="Tailandia">Tailandia</option>
<option value="Tanzania">Tanzania</option>
<option value="Tayikistán">Tayikistán</option>
<option value="Timor Oriental">Timor Oriental</option>
<option value="Togo">Togo</option>
<option value="Tonga">Tonga</option>
<option value="Trinidad y Tobago">Trinidad y Tobago</option>
<option value="Túnez">Túnez</option>
<option value="Turkmenistán">Turkmenistán</option>
<option value="Turquía">Turquía</option>
<option value="Tuvalu">Tuvalu</option>
<option value="Ucrania">Ucrania</option>
<option value="Uganda">Uganda</option>
<option value="Uruguay">Uruguay</option>
<option value="Uzbekistán">Uzbekistán</option>
<option value="Vanuatu">Vanuatu</option>
<option value="Venezuela">Venezuela</option>
<option value="Vietnam">Vietnam</option>
<option value="Yemen">Yemen</option>
<option value="Yibuti">Yibuti</option>
<option value="Zambia">Zambia</option>
<option value="Zimbabue">Zimbabue</option></select>
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