import { NextFunction, Response } from 'express';
export declare class ToDoController {
    all(request: any, response: Response, next: NextFunction): Promise<void>;
    update(request: any, response: Response, next: NextFunction): Promise<void>;
    add(request: any, response: Response, next: NextFunction): Promise<void>;
    remove(request: any, response: Response, next: NextFunction): Promise<void>;
}
