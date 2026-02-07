import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const saveNote = createAsyncThunk(
  'notes/saveNote',
  async (newNote) => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        title: newNote.title,
        body: newNote.description,
        userId: 1,
      }),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    });
    return await response.json(); 
  }
);

const notesSlice = createSlice({
  name: 'notes',
  initialState: { notesList: [], status: 'idle' },
  extraReducers: (builder) => {
    builder
      .addCase(saveNote.fulfilled, (state, action) => {
        state.notesList.push(action.payload);
      });
  },
});

export default notesSlice.reducer;