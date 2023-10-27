import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('visitor');
  const [userName, setUserName] = useState('');  
  const [userUsername, setUserUsername] = useState('');  
  const [userEmail, setUserEmail] = useState('');  
  const [userPassword, setUserPassword] = useState(''); 
  const [isSubscribed, setIsSubscribed] = useState(0); 
  const [expiryDate, setExpiryDate] = useState(''); 

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
    const storedUserRole = localStorage.getItem('userRole');
    const storedUserUsername = localStorage.getItem('userUsername');

    if (storedIsLoggedIn && storedUserRole && storedUserUsername) {
      setIsLoggedIn(JSON.parse(storedIsLoggedIn));
      setUserRole(storedUserRole);
      setUserUsername(storedUserUsername);
    }
  }, []);

  const resetAuth = () => {
    setIsLoggedIn(false);
    setUserRole('visitor');
    setUserName('');
    setUserUsername('');
    setUserEmail('');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userUsername');
  };

  useEffect(() => {
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
    localStorage.setItem('userRole', userRole);
    localStorage.setItem('userUsername', userUsername);
  }, [isLoggedIn, userRole, userUsername]);

  const obtenerEmailUsuario = async () => {
    try {
      const response = await axios.post('http://localhost/GetSingleUser.php', { username: userUsername });
      const data = response.data;
      if (data.user && data.user.email && data.user.name) {
        setUserEmail(data.user.email);
        setUserName(data.user.name);
      }
    } catch (error) {
      console.error('Error al obtener el correo del usuario:', error);
    }
  };

  useEffect(() => {
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
      expiryDate, setExpiryDate,
      resetAuth 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};