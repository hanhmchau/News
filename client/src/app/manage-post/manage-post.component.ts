import { PostService } from './../post.service';
import { CategoryService } from './../category.service';
import { Component } from "@angular/core";
import Category from "../category";
import Post from '../post';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
    selector: "app-manage-post-container",
    templateUrl: "./manage-post.component.html",
    styleUrls: ["./manage-post.component.css"]
})
export class ManagePostComponent {

    post: Post;

    constructor(
        private postService: PostService,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.route.paramMap.pipe(
            switchMap((params: ParamMap) =>{
                const id = params.get("id");
                if (id) {
                    return this.postService.getPrivatePostById(id);
                }
                return of(null);
            }),
            tap(console.log)
        ).subscribe(post => this.post = post)
    }

}
