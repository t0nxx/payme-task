import { ToDo } from './ToDo';
export declare class User {
    id: number;
    name: string;
    email: string;
    password: string;
    hashPass(): Promise<void>;
    todos: ToDo[];
}
