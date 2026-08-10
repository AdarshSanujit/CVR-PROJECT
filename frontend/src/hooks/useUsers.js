import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userService } from '../services/user.service';

export const useUsers = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.user);
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
     
      const response = await userService.getAllUsers ? await userService.getAllUsers() : { success: false, message: 'Not implemented' };
      if (response.success) {
        setUsers(response.users || []);
      }
    } catch (err) {
      // Error is handled by the global state via the thunk or action
      console.error('Failed to fetch users:', err.message || 'Failed to fetch users');
    }
  };

  const addUser = async (userData) => {
    try {
      // This would need to be implemented in the backend
      const response = await userService.createUser ? await userService.createUser(userData) : { success: false, message: 'Not implemented' };
      if (response.success) {
        setUsers(prev => [...prev, response.user]);
      }
      return response;
    } catch (err) {
      // Error is handled by the global state via the thunk or action
      console.error('Failed to create user:', err.message || 'Failed to create user');
      throw err;
    }
  };

  // Load users on mount
  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    loading,
    error,
    fetchUsers,
    addUser
  };
};

export default useUsers;