// context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../config/api';
import { DEFAULT_ID_LOCACION } from '../config/constants';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null);

  const [nombreLocacion, setNombreLocacion] = useState('');
  const [locacionError, setLocacionError] = useState(null);

  // Verifica token y obtiene perfil al iniciar la app
  const checkAuth = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        setUserToken(token);
        // Obtener perfil y rol del backend usando el token
        const perfilRes = await fetch(`${BASE_URL}/usuarios/perfil`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const perfilData = await perfilRes.json();
        console.log('📨 Texto completo de respuesta (login):', perfilData);
        
        setUser(perfilData);
        setUserRole(perfilData.tipo_usuario);
        setUserId(perfilData.id);
      } else {
        setUserToken(null);
        setUserRole(null);
        setUserId(null);
      }
    } catch (error) {
      console.error('Error en checkAuth:', error);
      setUserToken(null);
      setUserRole(null);
      setUserId(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const fetchNombreLocacion = async () => {
    try {
      const res = await fetch(`${BASE_URL}/locaciones/todas`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      if (!res.ok) throw new Error('Error al obtener locaciones');

      const data = await res.json();
      const locacionEncontrada = data.find(loc => loc.id === DEFAULT_ID_LOCACION);

      if (locacionEncontrada) {
        setNombreLocacion(locacionEncontrada.nombre);
      } else {
        console.warn('Locación no encontrada');
        setNombreLocacion('No encontrada');
      }

    } catch (err) {
      console.error('Error al obtener locación:', err);
      setLocacionError('No se pudo cargar la locación.');
    }
  };

  useEffect(() => {
    if (userToken) {
      fetchNombreLocacion();
    }
  }, [userToken]);

  // Función para login
  const login = async (email, password) => {
    try {
      const res = await fetch(`${BASE_URL}/usuarios/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, contrasenia: password }),
      });

      if (!res.ok) throw new Error('Credenciales inválidas');

      const data = await res.json();
      await AsyncStorage.setItem('token', data.token);
      setUserToken(data.token);

      // Obtener perfil después de login
      const perfilRes = await fetch(`${BASE_URL}/usuarios/perfil`, {
        headers: { Authorization: `Bearer ${data.token}` },
      });
      const perfilData = await perfilRes.json();

      setUser(perfilData);
      setUserRole(perfilData.tipo_usuario);
      setUserId(perfilData.id);

      return true;
    } catch (error) {
      console.error('Error en login:', error);
      return false;
    }
  };

  // Función para logout
  const logout = async () => {
    await AsyncStorage.removeItem('token');
    setUser(null);
    setUserToken(null);
    setUserRole(null);
    setUserId(null);
  };

  return (
    <AuthContext.Provider
      value={{
        loading,
        userToken,
        userRole,
        userId,
        user,
        login,
        logout,
        nombreLocacion,
        locacionError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
