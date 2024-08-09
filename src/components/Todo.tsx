import { useState} from "react";
import { ITodoList } from "../interfaces";
import { todoFromData } from "../data";

function TodoItem({todo}: {todo: ITodoList}) {
    return (
        <li>
            <h3>{todo.name}</h3>
            <p>{todo.description}</p>
            <p>Done: {todo.done ? 'Yes' : 'No'}</p>
        </li>
    );
}

export function TodoList() {
    const [todos, setTodos] = useState<ITodoList[]>(todoFromData);
    const [newTodo, setNewTodo] = useState<ITodoList>({
        id: '',
        name: '',
        description: '',
        done: false,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewTodo((prev) => ({ ...prev, [name]: value }));
      };
    
      const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (newTodo.name && newTodo.description) {
          const updatedTodo = {
            ...newTodo,
            id: Date.now().toString(),
          };
          setTodos((prevTodos) => [...prevTodos, updatedTodo]);
          setNewTodo({ id: '', name: '', description: '', done: false }); // 
        }
      };

    return (
    <div className="container">
      <h2>Todo List</h2>
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={newTodo.name}
          onChange={handleInputChange}
          placeholder="Todo name"
        />
        <input
          type="text"
          name="description"
          value={newTodo.description}
          onChange={handleInputChange}
          placeholder="Todo description"
        />
        <button type="submit">
          Add Todo
        </button>
      </form>
      
      <ul>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
    );
}