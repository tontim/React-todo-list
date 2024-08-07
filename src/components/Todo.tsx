import { useState} from "react";
import { ITodo } from "../interfaces";

export function TodoList() {
    const [todos, setTodos] = useState<ITodo[]>([
        { id: '1', name:'Todo1', list: ['Do this', 'Do that']},
        { id: '2', name: 'Todo2', list: ['And this', 'And that']},
    ]);

    return (
        <div>
            <h1>Todo List</h1>
            {todos.map((todo) => (
                <div key={todo.id}>
                    <h3>{todo.name}</h3>
                    <ul>
                        {todo.list.map((task, index) => (
                            <li key={index}>{task}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}