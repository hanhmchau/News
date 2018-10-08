import { PostService } from "./../post.service";
import { Component } from "@angular/core";
import Post from "../post";
import { UserService } from "../user.service";

@Component({
    selector: "app-author-post",
    templateUrl: "./author-post.component.html",
    styleUrls: ["./author-post.component.css"]
})
export class AuthorPostComponent {
    private posts: Post[] = [];
    private loaded = false;

    constructor(
        private postService: PostService,
        private userService: UserService
    ) {}

    ngOnInit(): void {
        this.userService.getCurrentUser().subscribe(user => {
            this.postService.getPostsByAuthor(user.id.toString())
            .subscribe(posts => {
                this.posts = posts;
                this.loaded = true;
            });
        });
    }

    getPrivatePosts(): Post[] {
        return this.posts.filter(post => !post.public);
    }

    getPublicPosts(): Post[] {
        return this.posts.filter(post => post.public);
    }
}
