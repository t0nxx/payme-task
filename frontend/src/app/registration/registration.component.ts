import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from '../login/login.component';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) { }

  // tslint:disable-next-line: member-ordering
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);

  nameFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
  ]);

  matcher = new MyErrorStateMatcher();

  ngOnInit() {
  }

  reg() {
    return this.userService.register(this.emailFormControl.value, this.passwordFormControl.value, this.emailFormControl.value);
    //   if (this.email == 'admin' && this.password == 'admin') {
    //     this.router.navigate(['user']);
    //   } else {
    //     alert('Invalid credentials');
    //   }
  }

}
