import { RoutingService } from './../routing.service';
import { CategoryService } from './../category.service';
import { Component, Input, Output, EventEmitter } from "@angular/core";
import Category from "../category";
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
    selector: "app-pagination",
    templateUrl: "./pagination.component.html",
    styleUrls: ["./pagination.component.css"]
})
export class PaginationComponent {
    @Input() total: number;
    @Input() pageSize: number;
    @Input() activePage = 1;
    @Output() pageChanged = new EventEmitter<number>();

    constructor() {}

    ngOnInit(): void {}

    maxPage() {
        return Math.ceil(this.total / this.pageSize);
    }

    maxPageArray() {
        return Array(this.maxPage());
    }

    changePage(page: string) {
        try {
            const parsedPage = parseInt(page);
            if (parsedPage >= 1 && parsedPage <= this.maxPage()) {
                this.activePage = parsedPage;
                this.pageChanged.emit(this.activePage);
            }
        } catch (e) {

        }
    }
}
