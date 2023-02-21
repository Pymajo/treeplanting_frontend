import { State, Selector, StateContext, Action, Store } from '@ngxs/store';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { LoginService } from 'src/app/service/login-service';
import { Login, Logout } from 'src/app/actions/auth-actions/login.actions';
import { Injectable, NgZone } from '@angular/core';
import { Route, Router } from '@angular/router';
import { UserService } from '../service/user/user-service';
import { LoginData } from '../entity/login-data';
import { ApiResponse } from './models/api-response.model';
import { MeViewModel } from '../entity/me-view.model';
import { Navigate } from '@ngxs/router-plugin';
import { CheckAdmin } from '../actions/auth-actions/admin.action';
import { User } from '../entity/user';
import { __values } from 'tslib';
import { CheckTreecoinsDeterminer } from '../actions/auth-actions/treecoins-determiner.action';
import { CheckSeedlingManager } from '../actions/auth-actions/seedling-manager.action';
import { CheckPlantingOfficer } from '../actions/auth-actions/planting-officer.action';

export class AuthStateModel {
    token?: string;
    userId?: string;
    isAdmin?: boolean;
    treecoinsDeterminer?: boolean;
    seedlingManager?: boolean;
    plantingOfficer?: boolean;
}

@Injectable({
    providedIn: 'root'
})

@State<AuthStateModel>({
    name: 'auth',
    defaults: {
        token: "",
        userId: "",
        isAdmin: false,
        treecoinsDeterminer: false,
        seedlingManager: false,
        plantingOfficer: false,
    }
})
export class AuthState {

    @Selector()
    static isLoggedIn(state: AuthStateModel): boolean {

        if (state.token == undefined || state.token == "") {
            return false;
        }
        return true;
    }

    @Selector()
    static plantingOfficer(state: AuthStateModel): boolean {
        if (state.plantingOfficer == false) {
            return false;
        }
        return true;
    }

    @Selector()
    static isAdmin(state: AuthStateModel): boolean {
        if (state.isAdmin == false) {
            return false;
        }
        return true;
    }

    @Selector()
    static treecoinsDeterminer(state: AuthStateModel): boolean {
        if (state.treecoinsDeterminer == false) {
            return false;
        }
        return true;
    }

    @Selector()
    static seedlingManager(state: AuthStateModel): boolean {
        if (state.seedlingManager == false) {
            return false;
        }
        return true;
    }

    @Selector()
    static token(state: AuthStateModel) { return state.token; }

    constructor(
        private store: Store,
        private userService: UserService,
        private loginService: LoginService,
    ) { }

    @Action(CheckAdmin)
    checkAdmin({ patchState }: StateContext<AuthStateModel>, { payload }: CheckAdmin) {
        let user: MeViewModel;
        return this.userService.getMe(payload.id).subscribe(
            (value: ApiResponse<MeViewModel>) => {
                user = value.data

                patchState({
                    isAdmin: user.isAdmin
                });
                this.store.dispatch(new Navigate([`/admin`]))
            },
            catchError((err) => {
                return throwError(`User is not am admin`);
            })
        )
    }

    @Action(CheckSeedlingManager)
    checkSeedlingmanager({ patchState }: StateContext<AuthStateModel>, { payload }: CheckSeedlingManager) {
        let user: MeViewModel;
        return this.userService.getMe(payload.id).subscribe(
            (value: ApiResponse<MeViewModel>) => {
                user = value.data

                patchState({
                    seedlingManager: user.seedlingsManager
                });
                this.store.dispatch(new Navigate([`/seedling`]))
            },
            catchError((err) => {
                return throwError(`User is not am Seedling Manager`);
            })
        )
    }
    @Action(CheckTreecoinsDeterminer)
    checkTreecoinsDeterminer({ patchState }: StateContext<AuthStateModel>, { payload }: CheckTreecoinsDeterminer) {
        let user: MeViewModel;
        return this.userService.getMe(payload.id).subscribe(
            (value: ApiResponse<MeViewModel>) => {
                user = value.data

                patchState({
                    treecoinsDeterminer: user.treecoinsDeterminer
                });
                this.store.dispatch(new Navigate([`/treecoins`]))
            },
            catchError((err) => {
                return throwError(`User is not an treecoinsDeterminer`);
            })
        )
    }

    @Action(CheckPlantingOfficer)
    checkPlantingOfficer({ patchState }: StateContext<AuthStateModel>, { payload }: CheckPlantingOfficer) {
        let user: MeViewModel;
        return this.userService.getMe(payload.id).subscribe(
            (value: ApiResponse<MeViewModel>) => {
                user = value.data

                patchState({
                    treecoinsDeterminer: user.plantingOfficer
                });
                this.store.dispatch(new Navigate([`/plantingPlace/console`]))
            },
            catchError((err) => {
                return throwError(`User is not an planting Officer`);
            })
        )
    }

    @Action(Login)
    login({ patchState }: StateContext<AuthStateModel>, { payload }: Login) {
        return this.loginService.login(payload)
            .pipe(
                tap(async (result: { token: string, id: string }) => {
                    patchState({
                        token: result.token, userId: result.id
                    });
                    this.store.dispatch(new Navigate([`/dashboard/${result.id}`]))
                },
                    catchError((err) => {
                        return throwError(`Invalid username or password`);
                    })
                ));
    }

    @Action(Logout)
    logout({ setState, getState }: StateContext<AuthStateModel>) {
        const { token } = getState();
        setState(
            {
                userId: "null",
                token: "null"
            }
        );
    }
}
