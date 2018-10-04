import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserService } from './user.service';
import { switchMap, tap } from 'rxjs/operators';
import consts from '../consts';

@Injectable()
export class JournalistGuard implements CanActivate {
    constructor(private userService: UserService, private router: Router){}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        return this.userService.getCurrentUser()
        .pipe(
            tap(canActivate => {
                if (!canActivate) {
                    this.router.navigate(['/forbidden']);
                }
            }),
            switchMap(user => of(user.role === consts.roles.JOURNALIST))
        );
    }
}
