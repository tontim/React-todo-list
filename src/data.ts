import { ITodoList } from "./interfaces";

export const todoFromData: ITodoList[] = [
    {
        id: 1,
        user: "Tomppa",
        title: "gör det här",
        done: false,
        date: new Date(Date.now() - 123456).toISOString(),
    },
    {
        id: 2,
        user: "Monika",
        title:"och det här",
        done: false,
        date: new Date(Date.now() - 1234).toISOString()
    }
];