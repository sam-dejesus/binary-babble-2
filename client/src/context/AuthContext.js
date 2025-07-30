// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../graphQL/queries';

export const AuthContext = createContext();

export const AuthProvider = ({ children, client }) => {
  const [loggedIn, setLoggedIn] = useState(Auth.loggedIn());
  const [user, setUser] = useState(null);

  const { data, loading } = useQuery(QUERY_ME, {
    skip: !loggedIn
  });

  useEffect(() => {
    if (data && data.me) {
      setUser(data.me); // assume backend sends { username, role, email, etc }
    } else {
      setUser(null);
    }
  }, [data]);

  const login = (token) => {
    Auth.login(token);
    setLoggedIn(true);
    client.resetStore();
  };

  const logout = () => {
    Auth.logout();
    setLoggedIn(false);
    setUser(null);
  };

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ loggedIn, user, isAdmin, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
