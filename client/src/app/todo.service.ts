import { Injectable } from '@angular/core';
import Todo from './todo';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import consts from '../consts';

@Injectable({
    providedIn: 'root'
})
export class TodoService {
    private todosUrl =  `${consts.API}/todos`;  // URL to web api
    constructor(private http: HttpClient) {
    }

    getTodos(): Observable<Todo[]> {
        return this.http.get<Todo[]>(this.todosUrl);
    }

    add(name: string): Observable<Todo> {
        return this.http.post<Todo>(this.todosUrl, {
            name
        });
    }

    update(todo: Todo): Observable<any> {
        return this.http.put<Todo>(`${this.todosUrl}/${todo.id}`, todo);
    }

    delete(todo: Todo): Observable<any> {
        return this.http.delete(`${this.todosUrl}/${todo.id}`);
    }
}
