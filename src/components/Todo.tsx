import { useOutletContext } from "react-router-dom";
import { ITodoList } from "../interfaces";

interface TodoContextType {
  todos: ITodoList[];
  toggleTodo: (id: string) => void;
}

function TodoItem({todo, onToggle }: {todo: ITodoList; onToggle: (id: string) => void}) {
    return (
        <li onClick={() => onToggle(todo.id)} style={{ cursor: 'pointer'}}>
          <input
            type="checkbox"
            checked={todo.done}
            onChange={() => {}}
            onClick={(e) => e.stopPropagation()}
          /> 
            <p>By: {todo.user}</p>
            <h3>{todo.name}</h3>
            <p>{todo.description}</p>
            <p>Created: {new Date(todo.date).toLocaleDateString()}</p>
            <p>Done: {todo.done ? 'Yes' : 'No'}</p>
        </li>
    );
}

export function TodoList() {
    const {todos, toggleTodo} = useOutletContext<TodoContextType>();

    return (
      <div className="container">
        <h2>Todo</h2>
        <ul>
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} onToggle={toggleTodo} />
          ))}
        </ul>
      </div>
    );
    
}