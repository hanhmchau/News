import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import consts from '../consts';
import Category from './category';

@Injectable({
    providedIn: "root"
})
export class CategoryService {
    private categoryUrl = `${consts.API}/category`; // URL to web api
    constructor(private http: HttpClient) {}

    getCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(this.categoryUrl);
    }
}
