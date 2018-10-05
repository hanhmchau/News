import { SafeStylePipe } from "./../safe-style.pipe";
import { PostService } from "./../post.service";
import { CategoryService } from "./../category.service";
import { Component, Input, ViewChild, ElementRef } from "@angular/core";
import Category from "../category";
import Post from "../post";
import { Router } from "@angular/router";

@Component({
    selector: "app-editor",
    templateUrl: "./editor.component.html",
    styleUrls: ["./editor.component.css"]
})
export class EditorComponent {
    @Input()
    post: Post = new Post();
    private categories: Category[];
    private options: Object = {
        charCounterCount: true,
        imageUpload: true,
        imageUploadMethod: 'POST',
        imageUploadParam: 'preview-image',
        imageUploadURL: this.postService.getUploadImageURL(),
        toolbarButtons: [
            "bold",
            "italic",
            "underline",
            "strikeThrough",
            "subscript",
            "superscript",
            "|",
            "fontFamily",
            "fontSize",
            "color",
            "|",
            "insertImage",
            "insertLink",
            "insertTable"
        ]
    };

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

    uploadPreviewImage(files: FileList): void {
        if (files.length) {
            const image = files.item(0);
            this.postService.uploadImage(image).subscribe((data: any) => {
                this.post.previewimage = data.fileName;
            });
        }
    }

    uploadImage(files: FileList): void {
        if (files.length) {
            const image = files.item(0);
            this.postService.uploadImage(image).subscribe((data: any) => {
                // const cursor = this.getCursorPosition();
                // console.log(cursor);
                // const innerHtml = this.contentBox.nativeElement.innerHTML;
                // this.contentBox.nativeElement.innerHTML += this.getImageElement(data.fileName);
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
        // this.updateContent();
        console.log(this.post);
        this.postService.saveOrUpdate(this.post).subscribe(data => {
            if (data && data.id) {
                this.router.navigate([`/manage-post/${data.id}`]);
            }
        });
    }
}
