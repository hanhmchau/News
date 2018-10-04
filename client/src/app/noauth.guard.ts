import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserService } from './user.service';
import { switchMap, tap } from 'rxjs/operators';

@Injectable()
export class NoAuthGuard implements CanActivate {
    constructor(private userService: UserService, private router: Router){}

    canActivate(): Observable<boolean> | Promise<boolean> | boolean {
        return this.userService.getCurrentUser()
            .pipe(
                tap(user => {
                    if (user) {
                        this.router.navigate(['/']);
                    }
                }),
                switchMap(user => of(!user))
            );
    }
}
