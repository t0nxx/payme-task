import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { User } from './User';
@Entity()
export class ToDo {

    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @Column()
    name: string;

    @Column({ default: false })
    isDone: boolean;

    @ManyToOne(type => User, user => user.todos)
    user: User;

}
