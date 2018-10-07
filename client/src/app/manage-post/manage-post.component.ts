import { PostService } from './../post.service';
import { CategoryService } from './../category.service';
import { Component } from "@angular/core";
import Category from "../category";
import Post from '../post';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap, tap, zip, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { UserService } from '../user.service';

@Component({
    selector: "app-manage-post-container",
    templateUrl: "./manage-post.component.html",
    styleUrls: ["./manage-post.component.css"]
})
export class ManagePostComponent {

    post: Post;

    constructor(
        private postService: PostService,
        private userService: UserService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit(): void {
        if (this.router.url.indexOf('new-post') === -1) {
            this.route.paramMap.pipe(
                switchMap((params: ParamMap) =>{
                    const id = params.get("id");
                    if (id) {
                        return this.postService.getPrivatePostById(id);
                    }
                    return of(null);
                }),
                catchError(() => of(null))
            ).subscribe(post => {
                console.log(post);
                if (!post) {
                    this.router.navigate(['/not-found']);
                }
                this.post = post;
            });    
        }
    }

}
