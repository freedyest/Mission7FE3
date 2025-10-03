import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { registerUser, getUsers } from "../services/api/authApi";

// Register user
export const register = createAsyncThunk("auth/register", async (user) => {
  const res = await registerUser(user);
  return res.data;
});

// validasi login
export const fetchUsers = createAsyncThunk("auth/fetchUsers", async () => {
  const res = await getUsers();
  return res.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    users: [],
    currentUser: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.currentUser = null;
      localStorage.removeItem("currentUser");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
