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

    return (
        <div className="container">
            <h2>Todo List</h2>
            <ul>
                {todos.map((todo) => (
                    <TodoItem key={todo.id} todo={todo} />
                ))}
            </ul>
        </div>
    );
}