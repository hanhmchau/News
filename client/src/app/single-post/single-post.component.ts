import { UserService } from "./../user.service";
import { Component, Input, ViewChild, ElementRef } from "@angular/core";
import Post from "../post";
import { PostService } from "../post.service";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { Observable } from "rxjs";
import { switchMap, tap, zip } from "rxjs/operators";
import User from "../user";
import Comment from '../comment';

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
    private youLikedThis = false;
    private options: Object = {
        toolbarButtons: ["bold", "italic", "underline", "strikeThrough"]
    };
    @ViewChild('editor') editor: ElementRef

    constructor(
        private postService: PostService,
        private userService: UserService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.route.paramMap
            .pipe(
                switchMap((params: ParamMap) =>
                    this.postService.getPostById(params.get("id"))
                ),
                zip(this.userService.getCurrentUser())
            )
            .subscribe(data => {
                this.post = <Post>data[0];
                this.user = data[1];
                this.youLikedThis =
                    this.user && this.post.favorites.indexOf(this.user.id) > -1;
            });
    }

    toggleFavorite(): void {
        if (!this.user) {
            this.router.navigate(["/login"]);
        }

        if (this.youLikedThis) {
            this.unfavorite();
        } else {
            this.favorite();
        }
    }

    favorite(): void {
        this.postService.favorite(this.post.id, this.user.id).subscribe(p => {
            if (p) {
                this.post.favorites.push(this.user.id);
                this.youLikedThis = true;    
            }
        });
    }

    unfavorite(): void {
        this.postService
            .unfavorite(this.post.id, this.user.id)
            .subscribe(() => {
                this.post.favorites.splice(
                    this.post.favorites.indexOf(this.user.id),
                    1
                );
                this.youLikedThis = false;
            });
    }

    reply() {
        if (this.newReplyContent) {
            this.postService
                .comment(this.post.id, -1, this.newReplyContent)
                .subscribe(comment => {
                    comment.commentername = this.user.email;
                    comment.datecommented = new Date();
                    this.post.comments.push(comment);
                    this.newReplyContent = '';
                    this.post.commentcount++;
                });
        }
    }
}
