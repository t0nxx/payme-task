import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { MatCheckboxChange } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from '../login/login.component';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})
export class ToDoComponent implements OnInit {

  constructor(private todoService: TodoService, private userService: UserService) { }
  todos: [];

  nameFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
  ]);

  matcher = new MyErrorStateMatcher();

  ngOnInit() {
    this.getAll();
  }
  getAll() {
    this.todoService.getAll().subscribe(res => {
      this.todos = res['data'];
    }, err => {
      console.log('errrr');
      console.log(err);
    });
  }
  switchState(event: MatCheckboxChange, id) {
    if (event.checked) {
      this.todoService.setSate(true, id).subscribe(res => {
        this.getAll();
      })

    } else {
      this.todoService.setSate(false, id).subscribe(res => {
        this.getAll();
      })
      this.getAll();
    }
  }
  deleteTodo(id) {
    this.todoService.delete(id).subscribe(res => {
      this.getAll();
    });
  }
  create() {
    this.todoService.create(this.nameFormControl.value).subscribe(res => {
      this.getAll();
    })
  }
  logout() {
    this.userService.logout();
  }
}
