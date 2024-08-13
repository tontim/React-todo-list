import React, {useState} from 'react';
import { useOutletContex, useNavigate } from 'react-router-dom';
import { ITodoList } from '../interfaces';

interface AddTodoContextType {
    addTodo: (newTodo: Omit<ITodoList, 'id' | 'date' | 'done'>) => void;
}

export function AddTodo() {
    const {addTodo } = useOutletContex<AddTodoContextType>();
    const navigate = useNavigate();
    const [newTodo, setNewTodo] = useState({
        name: '',
        description:'',
        author:'',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setNewTodo((prev) => ({...prev, [name]: value}));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (newTodo.name && newTodo.description && newTodo.author) {
            addTodo(newTodo);
            setNewTodo({name: '', description: '', author: ''});
            navigate('/');
        }
    };

    return (
        <div className="container">
            <h2>Add Todo</h2>
            <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="user"
                value={newTodo.user}
                onChange={handleInputChange}
                placeholder="User"
                />
                <input
                type="text"
                name="name"
                value={newTodo.name}
                onChange={handleInputChange}
                placeholder="Todo title"
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
        </div>
    );
}
