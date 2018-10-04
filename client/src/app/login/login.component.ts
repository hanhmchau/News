import { RoutingService } from './../routing.service';
import { CategoryService } from './../category.service';
import { Component } from "@angular/core";
import Category from "../category";
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"]
})
export class LoginComponent {
    private invalidated = false;
    private logInFail = false;

    private email = "";
    private password = "";

    constructor(private userService: UserService, private routingService: RoutingService) {}

    ngOnInit(): void {}

    login() {
        this.invalidated = false;
        this.logInFail = false;
        if (!this.email || !this.password) {
            this.invalidated = true;
            return;
        }

        this.userService.login(this.email, this.password)
        .subscribe(succeeded => {
            if (succeeded) {
                this.routingService.returnToLastUrl();
            } else {
                this.logInFail = true;
            }
        });
    }
}
