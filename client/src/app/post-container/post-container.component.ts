import { PostService } from './../post.service';
import { CategoryService } from './../category.service';
import { Component } from "@angular/core";
import Category from "../category";
import Post from '../post';
import { FilterCategoryPipe } from '../filterCategory.pipe';
import { PaginatePipe } from '../paginate.pipe';
import { SearchPipe } from '../search.pipe';

@Component({
    selector: "app-post-container",
    templateUrl: "./post-container.component.html",
    styleUrls: ["./post-container.component.css"]
})
export class PostContainerComponent {
    private posts: Post[] = [];
    private filteredPosts: Post[] = [];
    private pageSize = 3;
    private page = 1;
    private search = "";
    private categoryId = 0;
    private categories: Category[] = [];
    private total = 0;

    constructor(
        private postService: PostService,
        private categoryService: CategoryService,
        private paginatePipe: PaginatePipe,
        private searchPipe: SearchPipe,
        private filterCategoryPipe: FilterCategoryPipe

    ) {}

    ngOnInit(): void {
        this.postService.getPosts().subscribe(posts => {this.posts = posts; this.refresh()});
        this.categoryService
            .getCategories()
            .subscribe(categories => (this.categories = categories));
    }

    reset() {
        const filtered = this.searchPipe.transform(this.filterCategoryPipe.transform(this.posts, this.categoryId), this.search);
        this.total = filtered.length;
        console.log(this.page);
        this.filteredPosts = this.paginatePipe.transform(filtered, this.page, this.pageSize); 
    }

    refresh(): void {
        this.page = 1;
        this.reset();
    }

    pageCount(list: Post[]) {
        return Math.ceil(list.length / this.pageSize);
    }

    pageList(count: number) {
        return Array(Math.ceil(count / this.pageSize));
    }
}
