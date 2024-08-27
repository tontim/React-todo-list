import { useEffect, useState } from 'react';
import { Routes, Route, Link, Outlet } from 'react-router-dom';
import { AddTodo } from './pages';
import { ITodoList } from './interfaces';
import { todoFromData } from './data';

function Layout() {
  const [todos, setTodos] = useState<ITodoList[]>(todoFromData);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch('https://localhost:7262/api/Todo');
        const data = await response.json();
        setTodos(data);
      } 
      catch (error) {
        console.error('Error fetching todos:', error);
      }
    };
    fetchTodos();
  }, []);

  const addTodo = async (newTodo: Omit<ITodoList, 'id' | 'timestamp' | 'isCompleted'>) => {
    try {
      const response = await fetch('https://localhost:7262/api/Todo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newTodo,
          isCompleted: false,
          timestamp: new Date().toISOString()
        }),
      });
      const createdTodo = await response.json();
      setTodos((prevTodos) => [...prevTodos, createdTodo]);
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const toggleTodo = async (id: number) => {
    try {
      const todo = todos.find((t) => t.id === id);
      if (todo) {
        const response = await fetch(`https://localhost:7262/api/Todo/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({...todo, done: !todo.done}),
        });
        const updatedTodo = await response.json();
        setTodos((prevTodos) =>
        prevTodos.map((t) => (t.id === id ? updatedTodo : t))
      );
    }
  }
  catch (error) {
    console.error('Error updating', error);
  }
};
  return ( 
    <>
    <nav>
      <ul>
        <li><Link to="/"></Link></li>
        <li><Link to="/add"></Link></li>
      </ul>
    </nav>
    <Outlet context={{todos, addTodo, toggleTodo}} />
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<AddTodo />} />
      </Route>
    </Routes>
  );
}

export default App;