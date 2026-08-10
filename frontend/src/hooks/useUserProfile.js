import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userService } from '../services/user.service';
import {
  updateStart,
  updateSuccess,
  updateFailure,
  deleteStart,
  deleteSuccess,
  deleteFailure
} from '../store/features/user.slice';

export const useUserProfile = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.user);

  const updateProfile = async (userData) => {
    dispatch(updateStart());
    try {
      const response = await userService.updateProfile(userData);
      if (response.success) {
        dispatch(updateSuccess(response.user));
        return response;
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Profile update failed';
      dispatch(updateFailure(errorMessage));
      throw err;
    }
  };

  const deleteProfile = async () => {
    dispatch(deleteStart());
    try {
      const response = await userService.deleteProfile();
      if (response.success) {
        dispatch(deleteSuccess());
        return response;
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Profile deletion failed';
      dispatch(deleteFailure(errorMessage));
      throw err;
    }
  };

  return {
    updateProfile,
    deleteProfile,
    loading,
    error
  };
};

export default useUserProfile;