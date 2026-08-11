import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  users: null,
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk(
  "users/fetch",
  async (userId, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const currentUser = state.user?.user;
      const id = userId ?? currentUser?._id;

      if (!id) {
        return thunkAPI.rejectWithValue("Login First");
      }

      const response = await fetch(`/api/auth/get-users`);
      if (!response.ok) {
        throw new Error("Failed to fetch user");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message || "Failed to fetch user");
    }
  },
);

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUserStart: (state) => { 
      state.loading = true
      state.error = false
    },
    addUserSuccess: (state, action) => { 
      state.loading = false
        state.error = false
      state.users = action.payload
    },
    addUserFailed: (state,action) => { 
      state.loading = false,
      state.error = action.payload
    },
    deleteUserStart: (state) => { 
      state.loading = true
      state.error = false
    },
    deleteUserSuccess: (state, action) => { 
      state.loading = false;
      state.error = null;
        state.users.filter((user) => (
          user._id !== action.payload  
      ))
    },
    deleteUserFailed: (state, action) => { 
      state.loading = false;
      state.error = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || action.error.message || "Failed to fetch user";
      });
  },
});

export const {
  addUserStart, addUserFailed, addUserSuccess,
  deleteUserStart,deleteUserFailed,deleteUserSuccess
} = userSlice.actions;

export default userSlice.reducer;
