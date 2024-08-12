import { ITodoList } from "./interfaces";

export const todoFromData: ITodoList[] = [
    {
        id: "1",
        name: "Todo1",
        description: "Do this",
        done: false,
        date: Date.now(),
    },
    {
        id: "2",
        name: "Todo2",
        description: "Do that",
        done: false,
        date: Date.now(),
    },
];