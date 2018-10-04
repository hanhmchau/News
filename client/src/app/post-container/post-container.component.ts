import { PostService } from './../post.service';
import { CategoryService } from './../category.service';
import { Component } from "@angular/core";
import Category from "../category";
import Post from '../post';

@Component({
    selector: "app-post-container",
    templateUrl: "./post-container.component.html",
    styleUrls: ["./post-container.component.css"]
})
export class PostContainerComponent {
    private posts: Post[] = [];

    constructor(private postService: PostService) {
    }

    ngOnInit(): void {
        this.postService.getPosts().subscribe(posts => this.posts = posts);
    }
}
