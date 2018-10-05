import { PostService } from './../post.service';
import { UserService } from './../user.service';
import { CategoryService } from './../category.service';
import { Component, Input } from "@angular/core";
import Category from "../category";
import User from '../user';
import consts from '../../consts';
import Comment from '../comment';

@Component({
    selector: "app-comment",
    templateUrl: "./comment.component.html",
    styleUrls: ["./comment.component.css"]
})
export class CommentComponent {
    @Input() comment: Comment;
    private newReplyContent = "";
    private showReplyBox = false;
    private options: Object = {
        toolbarButtons: [
            "bold",
            "italic",
            "underline",
            "strikeThrough",
        ]
    };

    constructor(private postService: PostService) {}

    ngOnInit(): void {}

    reply() {
        if (this.newReplyContent) {
            this.postService.comment(this.comment.postid, this.comment.id, this.newReplyContent)
                .subscribe(c => this.comment.children.push(c));
        }
    }
}