import { RoutingService } from './../routing.service';
import { Component } from "@angular/core";
import { UserService } from '../user.service';

@Component({
    selector: "app-register",
    templateUrl: "./register.component.html",
    styleUrls: ["./register.component.css"]
})
export class RegisterComponent {
    private invalidated = false;
    private failed = false;

    private email = "";
    private password = "";

    constructor(private userService: UserService, private routingService: RoutingService) {}

    ngOnInit(): void {}

    register() {
        this.invalidated = false;
        this.failed = false;
        if (!this.email || !this.password) {
            this.invalidated = true;
            return;
        }

        this.userService.register(this.email, this.password)
        .subscribe(succeeded => {
            if (succeeded) {
                this.routingService.returnToLastUrl();
            } else {
                this.failed = true;
            }
        });
    }
}
