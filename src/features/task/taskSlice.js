import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


// Async thunk for adding a task
export const addTask = createAsyncThunk(
  'tasks/addTask',
  async (taskData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      let headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.post(`${process.env.REACT_APP_AUTH_URL}task` ,taskData, { headers });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.push(action.payload);
      })
      .addCase(addTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default taskSlice.reducer;
