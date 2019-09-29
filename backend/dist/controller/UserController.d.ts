import { NextFunction, Request, Response } from 'express';
export declare class UserController {
    all(request: Request, response: Response, next: NextFunction): Promise<void>;
    one(request: Request, response: Response, next: NextFunction): Promise<void>;
    login(request: Request, response: Response, next: NextFunction): Promise<void>;
    add(request: Request, response: Response, next: NextFunction): Promise<void>;
    remove(request: Request, response: Response, next: NextFunction): Promise<void>;
}
