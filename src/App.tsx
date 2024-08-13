import React, {useState} from 'react';
import {Routes, Route, Link, Outlet } from 'react-router-dom';
import { TodoList, AddToDo } from ".";
import { ITodoList } from './interfaces';
import { todoFromData } from './data';

function Layout() {
  const [todos, setTodos] = useState<ITodoList[]>(todoFromData);

  const addTodo = (newTodo: Omit<ITodoList, 'id' | 'date' | 'done'>) => {
    const todoToAdd: ITodoList = {
      ...newTodo,
      id: Date.now().toString(),
      date: Date.now(),
      done:false,
    };
    setTodos((prevTodos) => [...prevTodos, todoToAdd]);
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
        <Route path="add" element={<AddToDo />} />
      </Route>
    </Routes>
  );
}
