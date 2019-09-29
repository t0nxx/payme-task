import { Injectable } from '@angular/core';
import { ApiLink } from 'src/api';
import { HttpClient } from '@angular/common/http';

const api = ApiLink;
@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(api + '/todos');
  }
  setSate(state: boolean, id) {
    return this.http.put(api + `/todos/${id}`, { isDone: state });
  }
  create(name) {
    return this.http.post(api + `/todos`, { name, isDone: false });
  }
  delete(id) {
    return this.http.delete(api + `/todos/${id}`);
  }
}
