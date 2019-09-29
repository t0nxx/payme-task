import { Injectable } from '@angular/core';
import { ApiLink } from '../../api';
import { HttpClient } from '@angular/common/http';
import { Observable, observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

const api = ApiLink;
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private router: Router, private snackBar: MatSnackBar) { }

  login(email, password): any {
    this.http.post(api + '/users/login', { email, password })
      .subscribe(res => {
        if (res['data'].error != false) {
          const { id, token, name } = res['data'];
          localStorage.setItem('token', token);
          this.router.navigate(['/todos']);
          this.snackBar.open(`Welcome ${name}`, 'close', { duration: 5000, });
        }
      }, err => {
        console.log('errrrrrrrr'); console.log(err['error'].data);
        this.snackBar.open(err['error'].data, 'close', { duration: 5000, });
      })
  }
  register(email, password, name): any {
    this.http.post(api + '/users/register', { email, password, name })
      .subscribe(res => {
        if (res['data'].error != false) {
          const { id, token, name } = res['data'];
          localStorage.setItem('token', token);
          this.router.navigate(['/todos']);
          /** toaster  */
          this.snackBar.open(`Welcome ${name}`, 'close', { duration: 5000 * 100, });
        }
      }, err => {
        console.log('errrrrrrrrkkkkkkkkk'); console.log(err['error'].data);
        this.snackBar.open(err['error'].data, 'close', { duration: 5000, });
      })
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
