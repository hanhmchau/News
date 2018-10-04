import { RoutingService } from './routing.service';
import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'Simple To Do';
    constructor(private routingService: RoutingService) {
        this.routingService.startObservingUrls();
    }
}