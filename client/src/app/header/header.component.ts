import { UserService } from './../user.service';
import { CategoryService } from './../category.service';
import { Component } from "@angular/core";
import Category from "../category";
import User from '../user';
import consts from '../../consts';

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.css"]
})
export class HeaderComponent {
    private categories: Category[] = [];
    private user: User;
    private isJournalist: boolean;

    constructor(private categoryService: CategoryService, private userService: UserService) {

    }

    ngOnInit(): void {
        this.categoryService.getCategories().subscribe(categories => this.categories = categories);
        this.userService.getCurrentUser()
            .subscribe(user => {
                this.user = user;
                this.isJournalist = user.role === consts.roles.JOURNALIST;
            });
    }

    logout(): void {
        this.user = null;
        this.userService.logout();
    }
}
