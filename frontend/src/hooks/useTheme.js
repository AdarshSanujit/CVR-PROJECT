import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../store/features/theme.slice";

export const useTheme = () => {
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();

  const handleToggleTheme = useCallback(() => {
    dispatch(toggleTheme());
  }, [dispatch]);

  return {
    theme,
    toggleTheme: handleToggleTheme,
  };
};

export default useTheme