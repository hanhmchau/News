import { SafeStylePipe } from "./../safe-style.pipe";
import { PostService } from "./../post.service";
import { CategoryService } from "./../category.service";
import { Component, Input, ViewChild, ElementRef } from "@angular/core";
import Category from "../category";
import Post from "../post";
import { Router } from "@angular/router";
import { Observable, concat, of, Subject } from "rxjs";
import Tag from "../tag";
import consts from '../../consts';
import { debounceTime, distinctUntilChanged, switchMap, catchError } from "rxjs/operators";

@Component({
    selector: "app-editor",
    templateUrl: "./editor.component.html",
    styleUrls: ["./editor.component.css"]
})
export class EditorComponent {
    @Input()
    post: Post = new Post();
    @ViewChild('imageBox') imageBox: ElementRef;
    private categories: Category[];
    private options: Object = {
        heightMin: 300,
        charCounterCount: true,
        imageUpload: true,
        imageUploadMethod: 'POST',
        imageUploadParam: 'file',
        imageUploadParams: {
            "upload_preset": consts.UPLOAD_PRESET
        },
        imageUploadURL: this.postService.getUploadImageURL(),
        events: {
            'froalaEditor.image.uploaded': (e: any, editor: any, response: any) => {
                response = JSON.parse(response);
                editor.image.insert(response.secure_url, true, null, editor.image.get(), null)
                return false
            }
        },
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
    private tagSuggestions$: Observable<Tag[]>;
    private tagTypeahead = new Subject<string>();
    private showSaved = false;

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
        this.loadTagSuggestions();
    }

    getCurrentCategoryName(): string {
        const cat = this.categories.filter(c => c.id === this.post.categoryid);
        if (cat.length) return cat[0].name;
    }

    uploadPreviewImage(files: FileList): void {
        if (files.length) {
            const image = files.item(0);
            this.postService.uploadImage(image).subscribe((data: any) => {
                this.post.previewimage = data.secure_url;
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
        this.postService.saveOrUpdate(this.post).subscribe(data => {
            this.showSaved = true;
            setTimeout(() => {
                this.showSaved = false;
            }, 2000);
            if (data && data.id) {
                this.router.navigate([`/manage-post/${data.id}`]);
            }
        });
    }

    triggerImageBox() {
        this.imageBox.nativeElement.click();
    }

    loadTagSuggestions() {
        this.tagSuggestions$ = concat(
            of([]),
            this.tagTypeahead.pipe(
                debounceTime(150),
                distinctUntilChanged(),
                switchMap(phrase => this.postService.getTagSuggestions(phrase).pipe(
                    catchError(() => of([]))
                ))
            )
        )
    }

    createNewTag(tag: any) {
        if (!tag.id) {
            let tagName = typeof tag === "string" ? tag : tag.name;
            this.postService
                .createNewTag(tagName)
                .subscribe(result => {
                    this.post.tags.push({
                        id: result.id,
                        name: tagName
                    });
                    this.post.tags = this.post.tags.filter(t => t !== tag);
                });
        }
    }
}
