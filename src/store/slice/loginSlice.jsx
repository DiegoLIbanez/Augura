import { createSlice } from "@reduxjs/toolkit";
import { loginService } from "../services/loginService";

import { getUsers, createUser, updateUser, deleteUser } from "../../api/apiService";

// Obtener usuarios (asyncThunk)
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  return await getUsers();
});

// Agregar usuario
export const addUser = createAsyncThunk("users/addUser", async (userData) => {
  return await createUser(userData);
});

// Actualizar usuario
export const editUser = createAsyncThunk("users/editUser", async ({ id, userData }) => {
  return await updateUser(id, userData);
});

// Eliminar usuario
export const removeUser = createAsyncThunk("users/removeUser", async (id) => {
  await deleteUser(id);
  return id;
});

const loginSlice = createSlice({
  name: "login",
  initialState: {
    users: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(editUser.fulfilled, (state, action) => {
        const index = state.users.findIndex(user => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(removeUser.fulfilled, (state, action) => {
        state.users = state.users.filter(user => user.id !== action.payload);
      });
  },
});

export default loginSlice.reducer;