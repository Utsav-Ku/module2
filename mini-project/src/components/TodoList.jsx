import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchTodos,
  addTodoApi,
  updateTodoApi,
  deleteTodoApi
} from '../redux/thunk.js';

function TodoList() 
{
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const { todos, loading, error } = useSelector(
    (state) => state.todos
  );

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleAdd = () => {
    if (text.trim()) {
      dispatch(addTodoApi(text));
      setText('');
    }
  };

  const toggleTodo = (todo) => {
    dispatch(
      updateTodoApi({
        ...todo,
        completed: !todo.completed
      })
    );
  };

  if (loading) return <h3>Loading...</h3>;
  if (error) return <h3>{error}</h3>;

  return (
    <div>
      <h2>Todo CRUD (Redux Toolkit + Thunk)</h2>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="New todo"
      />
      <button onClick={handleAdd}>Add</button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
                cursor: 'pointer'
              }}
              onClick={() => toggleTodo(todo)}
            >
              {todo.title}
            </span>

            <button onClick={() => dispatch(deleteTodoApi(todo.id))}>
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
