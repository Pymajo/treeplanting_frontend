import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AuthState } from '../../state/auth-state';

@Injectable({
    providedIn: 'root'
})

export class SeedlingManagerGuard implements CanActivate {
    constructor(private store: Store) { }

    canActivate(): Observable<boolean> {
        return this.store.select(AuthState.seedlingManager);
    }

}