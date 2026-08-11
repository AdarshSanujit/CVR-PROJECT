import {  useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userService } from '../services/user.service';
import { fetchUsers } from "../store/features/users.slice";
export const useUsers = () => {
  const dispatch = useDispatch();
  const { loading, error,users } = useSelector(state => state.user);

  const fetchAllUsers = async () => {
    try {
     
      const response = (await userService.getAllUsers)
        ? await userService.getAllUsers()
        : { success: false, message: "Not implemented" };
      if (response.success) {
        dispatch(fetchUsers.fulfilled(response));
        return response
      }
    } catch (err) {
      dispatch(fetchUsers.rejected(err.message || "Failed to fetch user"));
      throw err;
    }
  };

  const addUser = async (userData) => {
    try {
      // This would need to be implemented in the backend
      const response = await userService.createUser ? await userService.createUser(userData) : { success: false, message: 'Not implemented' };
      if (response.success) {
        dispatch(fetchUsers.fulfilled(prev => [...prev, response.user]));
      }
      return response;
    } catch (err) {
      dispatch(fetchUsers.rejected(err.message || "Failed to fetch user"));
      throw err;
    }
  };

  // Load users on mount
  useEffect(() => {
    fetchAllUsers();
  }, []);

  return {
    users,
    loading,
    error,
    fetchAllUsers,
    addUser,
  };
};

export default useUsers;