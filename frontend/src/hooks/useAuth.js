import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userService } from '../services/user.service';
import {
  signInStart,
  signInSuccess,
  signInFailure,
  signoutStart,
  signoutSuccess,
  signoutFailure,
  fetchUserById
} from '../store/features/user.slice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.user);

  // Check auth status on mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        dispatch(signInStart());
        const response = await userService.getMe();
        if (response.success) {
          dispatch(signInSuccess(response.user));
        }
      } catch (err) {
        dispatch(signInFailure(err.message || 'Authentication failed'));
      }
    };

    checkAuthStatus();
  }, [dispatch]);

  const login = async (credentials) => {
    dispatch(signInStart());
    try {
      const response = await userService.login(credentials);
      if (response.success) {
        // Set token in axios headers
        userService.setAuthToken(response.token);
        dispatch(signInSuccess(response.user));
        return response;
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Login failed';
      dispatch(signInFailure(errorMessage));
      throw err;
    }
  };

  const register = async (userData) => {
    dispatch(signInStart());
    try {
      const response = await userService.register(userData);
      if (response.success) {
        // Set token in axios headers
        userService.setAuthToken(response.token);
        dispatch(signInSuccess(response.user));
        return response;
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Registration failed';
      dispatch(signInFailure(errorMessage));
      throw err;
    }
  };

  const logout = async () => {
    dispatch(signoutStart());
    try {
      await userService.logout();
      // Remove token from axios headers
      userService.setAuthToken(null);
      dispatch(signoutSuccess());
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Logout failed';
      dispatch(signoutFailure(errorMessage));
      throw err;
    }
  };

  const fetchUserProfile = async (userId) => {
    try {
      const response = await userService.getUserById(userId);
      if (response.success) {
        dispatch(fetchUserById.fulfilled(response));
        return response;
      }
    } catch (err) {
      dispatch(fetchUserById.rejected(err.message || 'Failed to fetch user'));
      throw err;
    }
  };

  return {
    login,
    register,
    logout,
    fetchUserProfile,
    loading,
    error
  };
};

export default useAuth;