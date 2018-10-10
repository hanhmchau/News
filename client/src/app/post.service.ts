import { switchMap, zip } from "rxjs/operators";
import { UserService } from "./user.service";
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import consts from "../consts";
import Category from "./category";
import Post from "./post";
import Comment from "./comment";
import Tag from "./tag";

@Injectable({
    providedIn: "root"
})
export class PostService {
    private postUrl = `${consts.API}/post`; // URL to web api
    constructor(private http: HttpClient, private userService: UserService) {}

    getPosts(): Observable<Post[]> {
        return this.http.get<Post[]>(this.postUrl);
    }

    getPostsByAuthor(id: string): Observable<Post[]> {
        return this.http.get<Post[]>(`${this.postUrl}/user/${id}`);
    }

    getPostById(id: string): Observable<Post> {
        return this.http.get<Post>(`${this.postUrl}/${id}`);
    }

    getPrivatePostById(id: string): Observable<Post> {
        return this.http.get<Post>(`${this.postUrl}/${id}/private`);
    }

    getUploadImageURL() {
        return 'https://api.cloudinary.com/v1_1/dd7m2qcf4/upload';
        // return `${this.postUrl}/preview-image`;
    }

    uploadImage(image: File): any {
        const formData: FormData = new FormData();
        formData.append("file", image, image.name);
        formData.append('upload_preset', consts.UPLOAD_PRESET);
        return this.http.post<Post>(this.getUploadImageURL(), formData);
    }

    favorite(postId: number, userId: number): Observable<any> {
        return this.http.post<any>(
            `${this.postUrl}/${postId}/favorite/${userId}`,
            {}
        );
    }

    unfavorite(postId: number, userId: number): any {
        return this.http.delete<Post[]>(
            `${this.postUrl}/${postId}/favorite/${userId}`
        );
    }

    saveOrUpdate(post: Post): Observable<Post> {
        return this.userService.getCurrentUser().pipe(
            switchMap(author => {
                post.authorid = author.id;
                if (post.id) {
                    return this.http.put<any>(
                        `${this.postUrl}/${post.id}`,
                        post
                    );
                }
                return this.http.post<any>(this.postUrl, post);
            })
        );
    }

    comment(
        postId: number,
        parentId: number,
        content: string
    ): Observable<Comment> {
        return this.http.post<Comment>(`${this.postUrl}/${postId}/comment`, {
            postId,
            parentId,
            content
        });
    }

    getTagSuggestions(phrase: string): Observable<Tag[]> {
        const params = new HttpParams().set("phrase", phrase);
        return this.http.get<Tag[]>(`${this.postUrl}/tags`, {
            params
        });
    }

    createNewTag(name: string): Observable<Tag> {
        return this.http.post<Tag>(`${this.postUrl}/tags`, {
            name
        });
    }

    searchPosts(
        categoryid: number,
        phrase: string,
        tag: string,
        page: number,
        pageSize: number
    ): Observable<any> {
        let params = new HttpParams()
            .append("categoryid", categoryid.toString())
            .append("phrase", phrase)
            .append("page", page.toString())
            .append("pageSize", pageSize.toString());
        if (tag) {
            params = params.append('tag', tag);
        }
        return this.http.get<any>(`${this.postUrl}`, {
            params
        });
    }
}
