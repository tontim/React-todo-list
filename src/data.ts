import { ITodoList } from "./interfaces";

export const todoFromData: ITodoList[] = [
    {
        id: "1",
        user: "Tomppa",
        name: "Wednesday",
        description: "Do this",
        done: false,
        date: Date.now() - 123456,
    },
    {
        id: "2",
        user: "Monika",
        name: "Thursday",
        description: "Do that",
        done: false,
        date: Date.now() - 1234,
    },
];