import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AuthState } from 'src/app/state/auth-state';

@Injectable({
    providedIn: 'root'
})

export class TreecoinsDeterminerGuard implements CanActivate {
    constructor(private store: Store) { }

    canActivate(): Observable<boolean> {
        return this.store.select(AuthState.treecoinsDeterminer);
    }

}
