import { UserService } from "./../user.service";
import { Component, Input } from "@angular/core";
import Post from "../post";
import { PostService } from "../post.service";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Observable } from "rxjs";
import { switchMap, tap } from "rxjs/operators";
import User from "../user";

@Component({
    selector: "app-single-post",
    templateUrl: "./single-post.component.html",
    styleUrls: ["./single-post.component.css"]
})
export class SinglePostComponent {
    private post: Post;
    private favorited = false;
    private user: User;
    private showReplyBox = false;
    private newReplyContent = "";
    private options: Object = {
        toolbarButtons: [
            "bold",
            "italic",
            "underline",
            "strikeThrough",
        ]
    };

    constructor(
        private postService: PostService,
        private userService: UserService,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.route.paramMap
            .pipe(
                switchMap((params: ParamMap) =>
                    this.postService.getPostById(params.get("id"))
                )
            )
            .subscribe(post => (this.post = post));
        this.userService.getCurrentUser().subscribe(user => (this.user = user));
    }

    favorite(): void {
        this.postService
            .favorite(this.post.id, this.user.id)
            .subscribe(() => this.post.favorites.push(this.user.id));
    }

    unfavorite(): void {
        this.postService
            .unfavorite(this.post.id, this.user.id)
            .subscribe(() =>
                this.post.favorites.splice(
                    this.post.favorites.indexOf(this.user.id),
                    1
                )
            );
    }

    reply() {
        if (this.newReplyContent) {
            this.postService.comment(this.post.id, -1, this.newReplyContent)
                .subscribe(comment => this.post.comments.push(comment));
        }
    }
}
