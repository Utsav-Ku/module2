import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveNote } from '../redux/notesSlice';

export default function NotesComponent() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes.notesList);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(saveNote({ title, description }));
    setTitle(''); setDescription('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
        <button type="submit">Save Note</button>
      </form>
      <ul>
        {notes.map((note, index) => (
          <li key={index}><strong>{note.title}</strong>: {note.body}</li>
        ))}
      </ul>
    </div>
  );
}
