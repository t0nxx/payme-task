import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, OneToMany } from 'typeorm';
import { IsNotEmpty, IsEmail, MinLength } from 'class-validator';
import { hash } from 'bcryptjs';
import { ToDo } from './ToDo';
@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @Column()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    @Column()
    email: string;

    @IsNotEmpty()
    @MinLength(6)
    @Column()
    password: string;

    @BeforeInsert()
    async hashPass() {
        this.password = await hash(this.password, 10);
    }

    @OneToMany(type => ToDo, todo => todo.user)
    todos: ToDo[];

}
