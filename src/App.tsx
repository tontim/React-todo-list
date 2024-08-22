import {useEffect, useState} from 'react';
import {Routes, Route, Link, Outlet } from 'react-router-dom';
import { AddTodo } from './pages';
import { TodoList } from './pages';
import { ITodoList } from './interfaces';
import { todoFromData } from './data';

function Layout() {
  const [todos, setTodos] = useState<ITodoList[]>(todoFromData);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch('/api/Todos');
        const data = await response.json();
        setTodos(data);
      } 
      catch (error) {
        console.error('Error fetching todos:', error);
      }
    };
    fetchTodos();
  }, []);

  const addTodo = async (newTodo: Omit<ITodoList, 'id' | 'date' | 'done'>) => {
    try {
      const response = await fetch('/api/Todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTodo),
      });
      const createdTodo = await response.json();
      setTodos((prevTodos) => [...prevTodos, createdTodo]);
    } catch (error) {
      console.error('Error loading todo:', error);
    }
  };

  const toggleTodo = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
      todo.id === id ? {...todo, done: !todo.done} : todo )
    );
  };

  return (
    <>
      <nav>
        <ul>
          <li><Link to="/">Todo</Link></li>
          <li><Link to="/add">Add Todo</Link></li>
        </ul>
      </nav>
      <Outlet context={{todos, addTodo, toggleTodo}} />
    </>
  );
}

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<TodoList />} />
        <Route path="add" element={<AddTodo />} />
      </Route>
    </Routes>
  );
}
