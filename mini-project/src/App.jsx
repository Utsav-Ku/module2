import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Provider } from 'react-redux';
import './App.css'
import { appStore } from './redux/store'
import Bank from './components/BankingComponent'
import TodoList from './components/TodoList';
import NotesComponent from './components/Notes';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Provider store={appStore}>
        <NotesComponent />
      </Provider>
    </>
  )
}

export default App
