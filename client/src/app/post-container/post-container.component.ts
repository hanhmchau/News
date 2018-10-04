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
    private pageSize = 3;
    private page = 1;
    private search = "";
    private categoryId = 0;
    private categories: Category[] = [];

    constructor(
        private postService: PostService,
        private categoryService: CategoryService
    ) {}

    ngOnInit(): void {
        this.postService.getPosts().subscribe(posts => (this.posts = posts));
        this.categoryService
            .getCategories()
            .subscribe(categories => (this.categories = categories));
    }

    refresh(): void {
        this.page = 1;
    }

    pageCount(list: Post[]) {
        return Math.ceil(list.length / this.pageSize);
    }

    pageList(list: Post[]) {
        if (list) {
            return Array(this.pageCount(list));
        }
        return Array(this.pageCount(this.posts));
    }
}
