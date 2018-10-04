import { Component, Input } from '@angular/core';
import Post from '../post';
import { PostService } from '../post.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, tap } from "rxjs/operators";

@Component({
    selector: "app-single-post",
    templateUrl: "./single-post.component.html",
    styleUrls: ["./single-post.component.css"]
})
export class SinglePostComponent {
    private post$: Observable<Post>;

    constructor(
        private postService: PostService,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.post$ = this.route.paramMap.pipe(
            switchMap((params: ParamMap) =>
                this.postService.getPostById(params.get("id")),
            ),
            tap(console.log)
        );
    }
}
