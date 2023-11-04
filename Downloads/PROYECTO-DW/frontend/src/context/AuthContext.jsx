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
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
    const storedUserRole = localStorage.getItem('userRole');
    const storedUserUsername = localStorage.getItem('userUsername');
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(JSON.parse(storedUserId));
    }
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
    setUserPassword('');
    setIsSubscribed(0);
    setExpiryDate('');
    setUserId(null);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userUsername');
    localStorage.removeItem('userId');
  };

  useEffect(() => {
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
    localStorage.setItem('userRole', userRole);
    localStorage.setItem('userUsername', userUsername);
    localStorage.setItem('userId', JSON.stringify(userId));
  }, [isLoggedIn, userRole, userUsername, userId]);

  const obtenerEmailUsuario = async () => {
    try {
      const response = await axios.post('http://localhost/GetSingleUser.php', { username: userUsername });
      const data = response.data;
      if (data.user && data.user.email && data.user.name && data.user.id) {
        setUserEmail(data.user.email);
        setUserName(data.user.name);
        setUserId(data.user.id); // Ensure the id is an integer if necessary
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
      userId, setUserId,
      resetAuth
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
