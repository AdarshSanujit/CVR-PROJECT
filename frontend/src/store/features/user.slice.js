import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: false,
  error: null,
};

export const fetchUserById = createAsyncThunk(
  "users/fetchByIdStatus",
  async (userId, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const currentUser = state.user?.user;
      const id = userId ?? currentUser?._id;

      if (!id) {
        return thunkAPI.rejectWithValue("No user id available");
      }

      const response = await fetch(`/api/users/${id}`);
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
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signInSuccess: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signInOut: (state) => {
      state.loading = false;
      state.error = null;
      state.user = null;
    },
    updateStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateSuccess: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateFailure: (state, action) => {
      state.loading = false;
      state.user = null;
      state.error = action.payload;
    },
    deleteStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteSuccess: (state) => {
      state.loading = false;
      state.error = null;
      state.user = null;
    },
    deleteFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signoutStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signoutSuccess: (state) => {
      state.loading = false;
      state.error = null;
      state.user = null;
    },
    signoutFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message || "Failed to fetch user";
      });
  }
});

export const {
  signInFailure,
  signInStart,
  signInSuccess,
  signInOut,
  updateFailure,
  updateStart,
  updateSuccess,
  deleteStart,
  deleteFailure,
  deleteSuccess,
  signoutStart,
  signoutSuccess,
  signoutFailure,
} = userSlice.actions;

export default userSlice.reducer;
