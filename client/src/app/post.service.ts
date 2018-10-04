import { switchMap } from 'rxjs/operators';
import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import consts from '../consts';
import Category from './category';
import Post from './post';

@Injectable({
    providedIn: "root"
})
export class PostService {
    private postUrl = `${consts.API}/post`; // URL to web api
    constructor(private http: HttpClient, private userService: UserService) { }

    getPosts(): Observable<Post[]> {
        return this.http.get<Post[]>(this.postUrl);
    }

    getPostById(id: string): Observable<Post> {
        return this.http.get<Post>(`${this.postUrl}/${id}`);
    }

    getPrivatePostById(id: string): Observable<Post> {
        return this.http.get<Post>(`${this.postUrl}/${id}/private`);
    }

    uploadPreviewImage(id: string, image: File): any {
        const formData: FormData = new FormData();
        formData.append("preview-image", image, image.name);
        // if (id !== "0") {
        //     return this.http.put<Post>(`${this.postUrl}/${id}/preview-image`, formData);
        // }
        return this.http.post<Post>(`${this.postUrl}/preview-image`, formData);
    }

    saveOrUpdate(post: Post): Observable<Post> {
        return this.userService.getCurrentUser().pipe(
            switchMap(
                author => {
                    post.authorid = author.id;
                    if (post.id) {
                        return this.http.put<any>(`${this.postUrl}/${post.id}`, post);
                    }
                    return this.http.post<any>(this.postUrl, post);
                }
            )
        );
    }
}
