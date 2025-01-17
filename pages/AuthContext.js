import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedToken = sessionStorage.getItem('token');
      const storedUserId = sessionStorage.getItem('userId');

      const publicPages = ['/login', '/register'];
      const isPublicPage = publicPages.includes(router.pathname);

      if (!storedToken && !isPublicPage) {
        router.push('/login');
      } else {
        setToken(storedToken);
        setUserId(storedUserId);
      }
    }
  }, [router]);

  return (
    <AuthContext.Provider value={{ token, userId, setToken, setUserId }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
