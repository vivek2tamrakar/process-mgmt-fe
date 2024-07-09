import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  user: null,
  token: localStorage.getItem('token') || null,
  loading: false,
  error: null
};

export const login = createAsyncThunk('auth/login', async ({ username, password }, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_AUTH_URL}auth/login`, {
      username,
      password
    });
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('companyId', response.data.id);
    localStorage.setItem('LoggedInName', response.data.name);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const register = createAsyncThunk('users/company', async ({ name, email, password }, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_AUTH_URL}users/company`, {
      name,
      email,
      password
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const forgetPassword = createAsyncThunk('users/forgetPass', async ({ username }, { rejectWithValue }) => {
  try {
    const response = await axios.patch(`${process.env.REACT_APP_AUTH_URL}users/forget-password`, {
      email: username
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const logout = createAsyncThunk('auth/logout', async () => {
  localStorage.removeItem('token');
  localStorage.removeItem('companyId');
  localStorage.removeItem('LoggedInData');

  return null;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
      });
  }
});

export default authSlice.reducer;
