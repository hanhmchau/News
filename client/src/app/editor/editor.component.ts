import { SafeStylePipe } from './../safe-style.pipe';
import { PostService } from './../post.service';
import { CategoryService } from './../category.service';
import { Component, Input, ViewChild, ElementRef } from "@angular/core";
import Category from "../category";
import Post from '../post';
import { Router } from '@angular/router';

@Component({
    selector: "app-editor",
    templateUrl: "./editor.component.html",
    styleUrls: ["./editor.component.css"]
})
export class EditorComponent {
    @Input()
    post: Post = new Post();
    private categories: Category[];
    @ViewChild("content") contentBox: ElementRef;

    constructor(
        private postService: PostService,
        private categoryService: CategoryService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.categoryService
            .getCategories()
            .subscribe(categories => (this.categories = categories));
        this.post = this.post || new Post();
    }

    getImageUrl(fileName: string) {
        return `<img style="display: block; max-width: 300px;" src="${fileName}" />`;
    }

    getCursorPosition() {
        const element = this.contentBox.nativeElement;
        let caretOffset = 0;
        const doc = element.ownerDocument || element.document;
        const win = doc.defaultView || doc.parentWindow;
        let sel = win.getSelection();
        if (sel.rangeCount > 0) {
            var range = win.getSelection().getRangeAt(0);
            var preCaretRange = range.cloneRange();
            preCaretRange.selectNodeContents(element);
            preCaretRange.setEnd(range.endContainer, range.endOffset);
            caretOffset = preCaretRange.toString().length;
        }
        return caretOffset;
    }

    uploadPreviewImage(files: FileList): void {
        if (files.length) {
            const image = files.item(0);
            const postId = this.post.id || 0;
            this.postService
                .uploadPreviewImage(postId.toString(), image)
                .subscribe((data: any) => {
                    // const cursor = this.getCursorPosition();
                    // console.log(cursor);
                    // const innerHtml = this.contentBox.nativeElement.innerHTML;
                    this.contentBox.nativeElement.innerHTML += this.getImageUrl(data.fileName);
                    // this.contentBox.nativeElement.innerHTML = innerHtml.slice(0, cursor) + this.getImageUrl(data.fileName) + innerHtml.slice(cursor);
                });
        }
    }

    isValidated() {
        return (
            this.post &&
            this.post.name.length > 0 &&
            this.post.content &&
            this.post.categoryid > 0
        );
    }

    save() {
        this.updateContent();
        console.log(this.post);
        this.postService.saveOrUpdate(this.post).subscribe(data => {
            if (data && data.id) {
                this.router.navigate([`/manage-post/${data.id}`]);
            }
        });
    }

    updateContent() {
        this.post.content = this.contentBox.nativeElement.innerHTML;
    }
}
