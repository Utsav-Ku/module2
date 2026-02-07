import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = 'https://jsonplaceholder.typicode.com/todos';

/* -------------------- THUNKS (API CALLS) -------------------- */

// READ
export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async () => {
    const res = await fetch(`${API_URL}?_limit=5`);
    return res.json();
  }
);

// CREATE
export const addTodoApi = createAsyncThunk(
  'todos/addTodoApi',
  async (title) => {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        completed: false
      })
    });
    return res.json();
  }
);

// UPDATE
export const updateTodoApi = createAsyncThunk(
  'todos/updateTodoApi',
  async (todo) => {
    const res = await fetch(`${API_URL}/${todo.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(todo)
    });
    return res.json();
  }
);

// DELETE
export const deleteTodoApi = createAsyncThunk(
  'todos/deleteTodoApi',
  async (id) => {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    return id;
  }
);

/* -------------------- SLICE -------------------- */

const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // READ
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to load todos';
      })

      // CREATE
      .addCase(addTodoApi.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })

      // UPDATE
      .addCase(updateTodoApi.fulfilled, (state, action) => {
        const index = state.todos.findIndex(
          todo => todo.id === action.payload.id
        );
        state.todos[index] = action.payload;
      })

      // DELETE
      .addCase(deleteTodoApi.fulfilled, (state, action) => {
        state.todos = state.todos.filter(
          todo => todo.id !== action.payload
        );
      });
  }
});

export default todosSlice.reducer;
