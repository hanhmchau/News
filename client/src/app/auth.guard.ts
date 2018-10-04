import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private userService: UserService){}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        return this.userService.getCurrentUser().pipe(
            switchMap(user => !!user)
        );
    }
}
