import { ActivatedRoute } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { PostService } from "./../post.service";
import { CategoryService } from "./../category.service";
import { Component, ViewChild, ElementRef } from "@angular/core";
import Category from "../category";
import Post from "../post";
import { FilterCategoryPipe } from "../filterCategory.pipe";
import { PaginatePipe } from "../paginate.pipe";
import { SearchPipe } from "../search.pipe";
import {
    trigger,
    state,
    style,
    animate,
    transition
    // ...
} from "@angular/animations";

@Component({
    selector: "app-post-container",
    templateUrl: "./post-container.component.html",
    styleUrls: ["./post-container.component.css"],
    animations: [
        trigger('showHideSearch', [
            state('cover', style({
                width: '70px',
                opacity: 1
            })),
            state('show', style({
                display: 'inline-block',
                width: '140px',
                opacity: 1
            })),
            state('hide', style({
                display: 'none',
                width: '0',
                opacity: 0
            })),
            transition('hide => show, hide => cover, cover => hide, show => hide', [
                animate('.3s ease-in-out')
            ])
        ])
        // animation triggers go here
    ]
})
export class PostContainerComponent {
    private posts: Post[] = [];
    private filteredPosts: Post[] = [];
    private paginatedPosts: Post[] = [];
    private pageSize = 5;
    private page = 1;
    private search = "";
    private categoryId = 0;
    private categories: Category[] = [];
    private showSearch = false;
    private loaded = false;
    private tag: string;
    @ViewChild('searchInput') searchInput: ElementRef;

    constructor(
        private postService: PostService,
        private categoryService: CategoryService,
        private searchPipe: SearchPipe,
        private filterCategoryPipe: FilterCategoryPipe,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit(): void {
        const snapshot = this.activatedRoute.snapshot;
        this.tag = snapshot.paramMap.get('tag');
        this.postService.getPosts().subscribe(posts => {
            this.loaded = true;
            this.posts = posts;
            if (this.tag) {
                this.posts = this.filterTag(posts, this.tag);
            }
            this.refilter();
        });
        this.categoryService
            .getCategories()
            .subscribe(categories => (this.categories = categories));
    }

    filterTag(posts: Post[], tagName: string): Post[] {
        return posts.filter(post => post.tags.map(tag => tag.name.toLowerCase()).indexOf(tagName) > -1);
    }

    refilter() {
        this.filteredPosts = this.searchPipe.transform(
            this.filterCategoryPipe.transform(this.posts, this.categoryId),
            this.search
        );
        this.repaginate(1); // return to first page
    }

    repaginate(page: number) {
        this.page = page;
    }

    onBlurSearch() {
        if (!this.search) {
            this.showSearch = false;
        }
    }

    toggleSearch() {
        this.showSearch = !this.showSearch;
        if (this.showSearch) {
            setTimeout(() => {
                this.searchInput.nativeElement.focus();
            }, 300);
        }
    }
}
