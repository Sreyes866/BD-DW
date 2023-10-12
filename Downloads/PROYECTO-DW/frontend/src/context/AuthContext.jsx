import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('visitor');
  const [userName, setUserName] = useState('');  
  const [userUsername, setUserUsername] = useState('');  
  const [userEmail, setUserEmail] = useState('');  
  const [userPassword, setUserPassword] = useState(''); // Añadido
  const [isSubscribed, setIsSubscribed] = useState(0); // Añadido
  const [expiryDate, setExpiryDate] = useState(''); // Añadido


  const obtenerEmailUsuario = async () => {
    console.log('userUsername antes de la llamada axios:', userUsername);
    try {
      const response = await axios.post('http://localhost/GetSingleUser.php', { username: userUsername });
      console.log('Data recibida:', response.data);
      const data = response.data;
      if (data.user && data.user.email && data.user.name) {
        setUserEmail(data.user.email);
        setUserName(data.user.name);  // Establecer el nombre aquí
        console.log('Correo electrónico y nombre establecidos');
      } else {
        console.log('Correo electrónico o nombre no recibidos en la respuesta.');
      }
    } catch (error) {
      console.error('Error al obtener el correo del usuario:', error);
    }
  };

  useEffect(() => {
    console.log('userUsername ha cambiado, obteniendo email...');
    if (userUsername) {
      obtenerEmailUsuario();
    }
  }, [userUsername]);

  return (
    <AuthContext.Provider value={{
      isLoggedIn, setIsLoggedIn,
      userRole, setUserRole,
      userName, setUserName,
      userUsername, setUserUsername,
      userEmail, setUserEmail,
      userPassword, setUserPassword, 
      isSubscribed, setIsSubscribed, 
      expiryDate, setExpiryDate 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};