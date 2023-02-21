import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { asapScheduler, lastValueFrom } from 'rxjs';
import { GetUser } from '../actions/user-actions/get-user/get-user';
import { AddUser } from '../actions/user-actions/add-user/add-user';
import { User } from '../entity/user';
import { UserService } from '../service/user/user-service';
import { ApiResponse } from './models/api-response.model';
import { AddUserSuccess } from '../actions/user-actions/add-user/add-user-success';
import { AddUserFail } from '../actions/user-actions/add-user/add-user-fail';
import { GetUserSuccess } from '../actions/user-actions/get-user/get-user-success';
import { GetUserFail } from '../actions/user-actions/get-user/get-user-fail';
import { UserStateModel } from '../entity/user-state.model';
import { UpdateUser } from '../actions/user-actions/update-user/update-user';
import { UpdateUserFail } from '../actions/user-actions/update-user/update-user-fail';
import { UpdateUserSuccess } from '../actions/user-actions/update-user/update-user-success';
import { DeleteUser } from '../actions/user-actions/delete-user/delete-user';
import { DeleteUserSuccess } from '../actions/user-actions/delete-user/delete-user-success';
import { DeleteUserFail } from '../actions/user-actions/delete-user/delete-user-fail';
import { DemoteUserAdmin } from '../actions/user-actions/demote-user-admin/demote-user-admin';
import { DemoteUserAdminSuccess } from '../actions/user-actions/demote-user-admin/demote-user-admin-success';
import { DemoteUserAdminFail } from '../actions/user-actions/demote-user-admin/desmote-user-admin-fail';
import { PromoteUserAdminFail } from '../actions/user-actions/promote-user-admin/promote-user-admin-fail';
import { PromoteUserAdminSuccess } from '../actions/user-actions/promote-user-admin/promote-user-admin-success';
import { PromoteUserAdmin } from '../actions/user-actions/promote-user-admin/promote-user-admin';
import { GetMe } from '../actions/user-actions/get-me/get-me';
import { GetMeSuccess } from '../actions/user-actions/get-me/get-me-success';
import { GetMeFail } from '../actions/user-actions/get-me/get-me-fail';
import { MeViewModel } from '../entity/me-view.model';
import { GetUsers } from '../actions/user-actions/get-users/get-users';
import { GetUsersSuccess } from '../actions/user-actions/get-users/get-users-sucess';
import { GetUsersFail } from '../actions/user-actions/get-users/get-users-fail';
import { ConfirmUserFail } from '../actions/user-actions/confirm-user/confirm-user-fail';
import { ConfirmUserSuccess } from '../actions/user-actions/confirm-user/confirm-user-success';
import { ConfirmUser } from '../actions/user-actions/confirm-user/confirm-user';
import { DemoteUserTreecoins } from '../actions/user-actions/demote-user-treecoins-determiner/demote-user-treecoins';
import { DemoteUserTreecoinsSuccess } from '../actions/user-actions/demote-user-treecoins-determiner/demote-user-treecoins-success';
import { DemoteUserTreecoinsFail } from '../actions/user-actions/demote-user-treecoins-determiner/demote-user-treecoins-fail';
import { PromoteUserTreecoins } from '../actions/user-actions/promote-user-treecoins-determiner/promote-user-treecoins-determiner';
import { PromoteUserTreecoinsSuccess } from '../actions/user-actions/promote-user-treecoins-determiner/promote-user-treecoins-determiner-success';
import { PromoteUserTreecoinsFail } from '../actions/user-actions/promote-user-treecoins-determiner/promote-user-treecoins-determiner-fail';
import { PromotePlantingOfficer } from '../actions/user-actions/promote-planting-officer/promote-planting-officer';
import { PromotePlantingOfficerSuccess } from '../actions/user-actions/promote-planting-officer/promote-planting-officer-success';
import { PromotePlantingOfficerFail } from '../actions/user-actions/promote-planting-officer/promote-planting-officer-fail';
import { DemotePlantingOfficer } from '../actions/user-actions/demote-planting-officer/demote-planting-officer';
import { DemotePlantingOfficerSuccess } from '../actions/user-actions/demote-planting-officer/demote-planting-officer-success';
import { DemotePlantingOfficerFail } from '../actions/user-actions/demote-planting-officer/demote-planting-officer-fail';
import { DemoteSeedlingsManagerFail } from '../actions/user-actions/demote-seedlings-manager/demote-seedlings-manager-fail';
import { DemotePollManager } from '../actions/user-actions/demote-poll-manager/demote-poll-manager';
import { DemotePollManagerFail } from '../actions/user-actions/demote-poll-manager/demote-poll-manager-fail';
import { DemotePollManagerSuccess } from '../actions/user-actions/demote-poll-manager/demote-poll-manager-success';
import { DemoteSeedlingsManager } from '../actions/user-actions/demote-seedlings-manager/demote-seedlings-manager';
import { DemoteSeedlingsManagerSuccess } from '../actions/user-actions/demote-seedlings-manager/demote-seedlings-manager-success';
import { PromotePollManager } from '../actions/user-actions/promote-poll-manager/promote-poll-manager';
import { PromotePollManagerFail } from '../actions/user-actions/promote-poll-manager/promote-poll-manager-fail';
import { PromotePollManagerSuccess } from '../actions/user-actions/promote-poll-manager/promote-poll-manager-success';
import { PromoteSeedlingsManager } from '../actions/user-actions/promote-seedlings-manager/promote-seedlings-manager';
import { PromoteSeedlingsManagerFail } from '../actions/user-actions/promote-seedlings-manager/promote-seedlings-manager-fail';
import { PromoteSeedlingsManagerSuccess } from '../actions/user-actions/promote-seedlings-manager/promote-seedlings-manager-success';
import { RemoveTreecoins } from '../actions/treecoins-actions/remove-treecoins/remove-treecoins';
import { RemoveTreecoinsSuccess } from '../actions/treecoins-actions/remove-treecoins/remove-treecoins-success';
import { RemoveTreecoinsFail } from '../actions/treecoins-actions/remove-treecoins/remove-treecoins-fail';
import { AddTreecoins } from '../actions/treecoins-actions/add-treecoins/add-treecoins';
import { TreecoinsViewModel } from '../entity/treecoins-view.model';
import { AddTreecoinsSuccess } from '../actions/treecoins-actions/add-treecoins/add-treecoins-success';
import { AddTreecoinsFail } from '../actions/treecoins-actions/add-treecoins/add-treecoins-fai';

@State<UserStateModel>({
    name: 'UserState',
    defaults: {
        users: [],
        loading: false,
        creating: false,
    },
})

@Injectable()
export class UserState {
    initialized: boolean = false;

    @Selector()
    static userStatus(state: UserStateModel): User[] {
        return state.users;
    }

    @Selector()
    static loading(state: UserStateModel): boolean {
        return state.loading;
    }
    constructor(private userService: UserService) { }

    @Action(GetUsers)
    async getUsers(context: StateContext<UserStateModel>, action: GetUsers): Promise<void> {
        context.patchState({ loading: true });
        try {
            const response: ApiResponse<User[]> =
                await lastValueFrom(this.userService.getUsers());
            if (response.success) {
                asapScheduler.schedule(() => context.dispatch(new GetUsersSuccess(response.data)));
            } else {
                asapScheduler.schedule(() => context.dispatch(new GetUsersFail(response.errors)));
            }
        } catch (exeption) {
            asapScheduler.schedule(() => context.dispatch(new GetUserFail(exeption)));
        }
    }

    @Action(GetUsersSuccess)
    getUsersSuccess(context: StateContext<UserStateModel>, action: GetUsersSuccess): void {
        context.patchState({
            loading: false,
            users: action.data,
        });
    }

    @Action(GetUsersFail)
    getUsersFail(context: StateContext<UserStateModel>): void {
        context.patchState({ loading: false });
    }

    @Action(GetUser)
    async getUser(context: StateContext<UserStateModel>, action: GetUser): Promise<void> {
        context.patchState({ loading: true });

        try {
            const response: ApiResponse<User[]> =
                await lastValueFrom(this.userService
                    .getUsers());
            if (response.success) {
                asapScheduler.schedule(() => context.dispatch(new GetUserSuccess(response.data)));
            } else {
                asapScheduler.schedule(() => context.dispatch(new GetUserFail(response.errors)));
            }
        } catch (exeption) {
            asapScheduler.schedule(() => context.dispatch(new GetUserFail(exeption)));
        }
    }


    @Action(GetUserSuccess)
    getUserSuccess(context: StateContext<UserStateModel>, action: GetUserSuccess): void {
        context.patchState({
            loading: false,
            users: action.data
        });
    }

    @Action(GetUserFail)
    getUserFail(context: StateContext<UserStateModel>): void {
        context.patchState({ loading: false });
    }

    @Action(AddUser)
    async addUser(context: StateContext<UserStateModel>, action: AddUser): Promise<void> {
        context.patchState({ creating: true });

        try {
            const response: ApiResponse<User> = await lastValueFrom(this.userService.addUser(action.user));
            if (response.success) {
                asapScheduler.schedule(() => context.dispatch(new AddUserSuccess(action.user)));
            } else {
                asapScheduler.schedule(() => context.dispatch(new AddUserFail(response.errors)));
            }
        } catch (exeption: unknown) {
            asapScheduler.schedule(() => context.dispatch(new AddUserFail(exeption)));
        }
    }

    @Action(AddUserSuccess)
    addUserSuccess(context: StateContext<UserStateModel>): void {
        context.patchState({ creating: false });
    };

    @Action(AddUserFail)
    addUserFail(context: StateContext<UserStateModel>): void {
        context.patchState({ creating: false });
    }

    @Action(UpdateUser)
    async updateUser(context: StateContext<UserStateModel>, action: UpdateUser): Promise<void> {
        context.patchState({ loading: true });

        try {
            const response: ApiResponse<User> = await lastValueFrom(this.userService.updateUser(action.user));

            if (response.success) {
                asapScheduler.schedule(() => context.dispatch(new UpdateUserSuccess()));
            } else {
                asapScheduler.schedule(() => context.dispatch(new UpdateUserFail(response.errors)));
            }

        } catch (exeption: unknown) {
            asapScheduler.schedule(() => context.dispatch(new UpdateUserFail(exeption)));
        }
    }

    @Action(UpdateUserSuccess)
    updateUserSuccess(context: StateContext<UserStateModel>): void {
        context.patchState({ loading: false });
    }

    @Action(UpdateUserFail)
    updateUserFail(context: StateContext<UserStateModel>): void {
        context.patchState({ loading: false });
    }

    @Action(ConfirmUser)
    async confirmUser(context: StateContext<UserStateModel>, action: ConfirmUser): Promise<void> {
        context.patchState({ loading: true });

        try {
            const response: ApiResponse<User> = await lastValueFrom(this.userService.confirmUser(action.userId));

            if (response.success) {
                asapScheduler.schedule(() => context.dispatch(new ConfirmUserSuccess()));
            } else {
                asapScheduler.schedule(() => context.dispatch(new ConfirmUserFail(response.errors)));
            }
        } catch (exeption: unknown) {
            asapScheduler.schedule(() => context.dispatch(new ConfirmUserFail(exeption)));
        }
    }

    @Action(ConfirmUserSuccess)
    confirmUserSuccess(context: StateContext<UserStateModel>): void {
        context.patchState({ loading: false });
    }

    @Action(ConfirmUserFail)
    confirmUserFail(context: StateContext<UserStateModel>): void {
        context.patchState({ loading: false });
    }

    @Action(DeleteUser)
    async deleteUser(context: StateContext<UserStateModel>, action: DeleteUser): Promise<void> {
        context.patchState({ loading: true });

        try {
            const response: ApiResponse<User> = await lastValueFrom(this.userService.deleteUser(action.user))
            if (response.success) {
                asapScheduler.schedule(() => context.dispatch(new DeleteUserSuccess()));
            } else {
                asapScheduler.schedule(() => context.dispatch(new DeleteUserFail(response.errors)))
            }
        } catch (exeption) {
            asapScheduler.schedule(() => context.dispatch(new DeleteUserFail(exeption)))
        }
    }

    @Action(DeleteUserSuccess)
    deleteUserSuccess(context: StateContext<UserStateModel>): void {
        context.patchState({ loading: false })
    }

    @Action(DeleteUserFail)
    deleteUserFail(context: StateContext<UserStateModel>): void {
        context.patchState({ loading: false })
    }

    @Action(PromoteUserAdmin)
    async promoteUserAdmin(context: StateContext<UserStateModel>, action: PromoteUserAdmin): Promise<void> {
        context.patchState({ loading: true });

        try {
            const response: ApiResponse<User> = await lastValueFrom(this.userService.promoteUserAdmin(action.userId));

            if (response.success) {
                asapScheduler.schedule(() => context.dispatch(new PromoteUserAdminSuccess(action.userId)));
            } else {
                asapScheduler.schedule(() => context.dispatch(new PromoteUserAdminFail(response.errors)));
            }
        } catch (exeption: unknown) {
            asapScheduler.schedule(() => context.dispatch(new PromoteUserAdminFail(exeption)));
        }
    }

    @Action(PromoteUserAdminSuccess)
    promoteUserAdminSuccess(context: StateContext<UserStateModel>, action: PromoteUserAdminSuccess): void {
        let state = context.getState()
        const newUsers = state.users.map(user => {
            if (user.id == action.userId) {
                return { ...user, isAdmin: true };
            }
            return user;
        })
        context.patchState({
            loading: false,
            users: newUsers
        });
    }

    @Action(PromoteUserAdminFail)
    promoteUserAdminFail(context: StateContext<UserStateModel>): void {
        context.patchState({ loading: false });
    }

    @Action(DemoteUserAdmin)
    async demoteUserAdmin(context: StateContext<UserStateModel>, action: DemoteUserAdmin): Promise<void> {
        context.patchState({ loading: true });
        try {
            const response: ApiResponse<User> = await lastValueFrom(this.userService.demoteUserAdmin(action.userId));

            if (response.success) {
                asapScheduler.schedule(() => context.dispatch(new DemoteUserAdminSuccess(action.userId)));
            } else {
                asapScheduler.schedule(() => context.dispatch(new DemoteUserAdminFail(response.errors)));
            }
        } catch (exeption: unknown) {
            asapScheduler.schedule(() => context.dispatch(new DemoteUserAdminFail(exeption)));
        }
    }

    @Action(DemoteUserAdminSuccess)
    demoteUserAdminSuccess(context: StateContext<UserStateModel>, action: DemoteUserAdmin): void {
        let state = context.getState()
        const newUsers = state.users.map(user => {
            if (user.id == action.userId) {
                return { ...user, isAdmin: false };
            }
            return user;
        })
        context.patchState({
            loading: false,
            users: newUsers
        });
    }

    @Action(DemoteUserAdminFail)
    demoteUserAdminFail(context: StateContext<UserStateModel>): void {
        context.patchState({ loading: false });
    }

    @Action(GetMe)
    async getMe(context: StateContext<UserStateModel>, action: GetMe): Promise<void> {
        context.patchState({ loading: true });

        try {
            const response: ApiResponse<MeViewModel> =
                await lastValueFrom(await this.userService
                    .getMe(action.id));
            if (response.success) {
                asapScheduler.schedule(() => context.dispatch(new GetMeSuccess(response.data)));
            } else {
                asapScheduler.schedule(() => context.dispatch(new GetMeFail(response.errors)));
            }
        } catch (exeption) {
            asapScheduler.schedule(() => context.dispatch(new GetMeFail(exeption)));
        }
    }


    @Action(GetMeSuccess)
    getMeSuccess(context: StateContext<UserStateModel>, action: GetUserSuccess): void {
        context.patchState({
            loading: false,
        });
    }

    @Action(GetMeFail)
    getMeFail(context: StateContext<UserStateModel>): void {
        context.patchState({ loading: false });
    }

    @Action(PromoteUserTreecoins)
    async promoteUserTreecoins(context: StateContext<UserStateModel>, action: PromoteUserTreecoins): Promise<void> {
        context.patchState({ loading: true });

        try {
            const response: ApiResponse<User> = await lastValueFrom(this.userService.promoteUserTreecoins(action.userId));

            if (response.success) {
                asapScheduler.schedule(() => context.dispatch(new PromoteUserTreecoinsSuccess(action.userId)));
            } else {
                asapScheduler.schedule(() => context.dispatch(new PromoteUserTreecoinsFail(response.errors)));
            }
        } catch (exeption: unknown) {
            asapScheduler.schedule(() => context.dispatch(new PromoteUserTreecoinsFail(exeption)));
        }
    }

    @Action(PromoteUserTreecoinsSuccess)
    promoteUserTreecoinsuccess(context: StateContext<UserStateModel>, action: PromoteUserTreecoinsSuccess): void {
        let state = context.getState()
        const newUsers = state.users.map(user => {
            if (user.id == action.userId) {
                return { ...user, treecoinsDeterminer: true };
            }
            return user;
        })
        context.patchState({
            loading: false,
            users: newUsers
        });
    }

    @Action(PromoteUserTreecoinsFail)
    promoteUserTreecoinsFail(context: StateContext<UserStateModel>): void {
        context.patchState({ loading: false });
    }

    @Action(DemoteUserTreecoins)
    async demoteUserTreecoins(context: StateContext<UserStateModel>, action: DemoteUserTreecoins): Promise<void> {
        context.patchState({ loading: true });
        try {
            const response: ApiResponse<User> = await lastValueFrom(this.userService.demoteUserTreecoins(action.userId));

            if (response.success) {
                asapScheduler.schedule(() => context.dispatch(new DemoteUserTreecoinsSuccess(action.userId)));
            } else {
                asapScheduler.schedule(() => context.dispatch(new DemoteUserTreecoinsFail(response.errors)));
            }
        } catch (exeption: unknown) {
            asapScheduler.schedule(() => context.dispatch(new DemoteUserTreecoinsFail(exeption)));
        }
    }

    @Action(DemoteUserTreecoinsSuccess)
    demoteUserTreecoinsSuccess(context: StateContext<UserStateModel>, action: DemoteUserTreecoins): void {
        let state = context.getState()
        const newUsers = state.users.map(user => {
            if (user.id == action.userId) {
                return { ...user, treecoinsDeterminer: false };
            }
            return user;
        })
        context.patchState({
            loading: false,
            users: newUsers
        });
    }

    @Action(DemoteUserTreecoinsFail)
    demoteUserTreecoinsFail(context: StateContext<UserStateModel>): void {
        context.patchState({ loading: false });
    }

    //PromotePlantingOfficer
    @Action(PromotePlantingOfficer)
    async promotePlantingOfficer(context: StateContext<UserStateModel>, action: PromotePlantingOfficer): Promise<void> {
        context.patchState({ loading: true });

        try {
            const response: ApiResponse<User> = await lastValueFrom(this.userService.promotePlantingOfficer(action.userId));

            if (response.success) {
                asapScheduler.schedule(() => context.dispatch(new PromotePlantingOfficerSuccess(action.userId)));
            } else {
                asapScheduler.schedule(() => context.dispatch(new PromotePlantingOfficerFail(response.errors)));
            }
        } catch (exeption: unknown) {
            asapScheduler.schedule(() => context.dispatch(new PromotePlantingOfficerFail(exeption)));
        }
    }

    @Action(PromotePlantingOfficerSuccess)
    promotePlantingOfficerSuccess(context: StateContext<UserStateModel>, action: PromotePlantingOfficer): void {
        let state = context.getState()
        const newUsers = state.users.map(user => {
            if (user.id == action.userId) {
                return { ...user, plantingOfficer: true };
            }
            return user;
        })
        context.patchState({
            loading: false,
            users: newUsers
        });
    }

    @Action(PromotePlantingOfficerFail)
    promotePlantingOfficerFail(context: StateContext<UserStateModel>): void {
        context.patchState({ loading: false });
    }

    @Action(DemotePlantingOfficer)
    async demotePlantingOfficer(context: StateContext<UserStateModel>, action: DemotePlantingOfficer): Promise<void> {
        context.patchState({ loading: true });
        try {
            const response: ApiResponse<User> = await lastValueFrom(this.userService.demotePlantingOfficer(action.userId));

            if (response.success) {
                asapScheduler.schedule(() => context.dispatch(new DemotePlantingOfficerSuccess(action.userId)));
            } else {
                asapScheduler.schedule(() => context.dispatch(new DemotePlantingOfficerFail(response.errors)));
            }
        } catch (exeption: unknown) {
            asapScheduler.schedule(() => context.dispatch(new DemotePlantingOfficerFail(exeption)));
        }
    }

    @Action(DemotePlantingOfficerSuccess)
    demotePlantingOfficerSuccess(context: StateContext<UserStateModel>, action: DemotePlantingOfficer): void {
        let state = context.getState()
        const newUsers = state.users.map(user => {
            if (user.id == action.userId) {
                return { ...user, plantingOfficer: false };
            }
            return user;
        })
        context.patchState({
            loading: false,
            users: newUsers
        });
    }

    @Action(DemotePlantingOfficerFail)
    demotePlantingOfficerFail(context: StateContext<UserStateModel>): void {
        context.patchState({ loading: false });
    }

    @Action(PromotePollManager)
    async promotePollManager(context: StateContext<UserStateModel>, action: PromotePollManager): Promise<void> {
        context.patchState({ loading: true });

        try {
            const response: ApiResponse<User> = await lastValueFrom(this.userService.promotePollManager(action.userId));

            if (response.success) {
                asapScheduler.schedule(() => context.dispatch(new PromotePollManagerSuccess(action.userId)));
            } else {
                asapScheduler.schedule(() => context.dispatch(new PromotePollManagerFail(response.errors)));
            }
        } catch (exeption: unknown) {
            asapScheduler.schedule(() => context.dispatch(new PromotePollManagerFail(exeption)));
        }
    }

    @Action(PromotePollManagerSuccess)
    promotePollManagerSuccess(context: StateContext<UserStateModel>, action: PromotePollManager): void {
        let state = context.getState()
        const newUsers = state.users.map(user => {
            if (user.id == action.userId) {
                return { ...user, pollManager: true };
            }
            return user;
        })
        context.patchState({
            loading: false,
            users: newUsers
        });
    }

    @Action(PromotePollManagerFail)
    promotePollManagerFail(context: StateContext<UserStateModel>): void {
        context.patchState({ loading: false });
    }

    @Action(DemotePollManager)
    async demotePollManager(context: StateContext<UserStateModel>, action: DemotePollManager): Promise<void> {
        context.patchState({ loading: true });
        try {
            const response: ApiResponse<User> = await lastValueFrom(this.userService.demotePollManager(action.userId));

            if (response.success) {
                asapScheduler.schedule(() => context.dispatch(new DemotePollManagerSuccess(action.userId)));
            } else {
                asapScheduler.schedule(() => context.dispatch(new DemotePollManagerFail(response.errors)));
            }
        } catch (exeption: unknown) {
            asapScheduler.schedule(() => context.dispatch(new DemotePollManagerFail(exeption)));
        }
    }

    @Action(DemotePollManagerSuccess)
    demotePollManagerSuccess(context: StateContext<UserStateModel>, action: DemotePollManager): void {
        let state = context.getState()
        const newUsers = state.users.map(user => {
            if (user.id == action.userId) {
                return { ...user, pollManager: false };
            }
            return user;
        })
        context.patchState({
            loading: false,
            users: newUsers
        });
    }

    @Action(DemotePollManagerFail)
    demotePollManagerFail(context: StateContext<UserStateModel>): void {
        context.patchState({ loading: false });
    }

    @Action(PromoteSeedlingsManager)
    async promoteSeedlingsManager(context: StateContext<UserStateModel>, action: PromoteSeedlingsManager): Promise<void> {
        context.patchState({ loading: true });

        try {
            const response: ApiResponse<User> = await lastValueFrom(this.userService.promoteSeedlingsManager(action.userId));

            if (response.success) {
                asapScheduler.schedule(() => context.dispatch(new PromoteSeedlingsManagerSuccess(action.userId)));
            } else {
                asapScheduler.schedule(() => context.dispatch(new PromoteSeedlingsManagerFail(response.errors)));
            }
        } catch (exeption: unknown) {
            asapScheduler.schedule(() => context.dispatch(new PromoteSeedlingsManagerFail(exeption)));
        }
    }

    @Action(PromoteSeedlingsManagerSuccess)
    promoteSeedlingsManagerSuccess(context: StateContext<UserStateModel>, action: PromoteSeedlingsManager): void {
        let state = context.getState()
        const newUsers = state.users.map(user => {
            if (user.id == action.userId) {
                return { ...user, seedlingsManager: true };
            }
            return user;
        })
        context.patchState({
            loading: false,
            users: newUsers
        });
    }

    @Action(PromoteSeedlingsManagerFail)
    PromoteSeedlingsManagerFail(context: StateContext<UserStateModel>): void {
        context.patchState({ loading: false });
    }

    @Action(DemoteSeedlingsManager)
    async demoteSeedlingsManager(context: StateContext<UserStateModel>, action: DemoteSeedlingsManager): Promise<void> {
        context.patchState({ loading: true });
        try {
            const response: ApiResponse<User> = await lastValueFrom(this.userService.demoteSeedlingsManager(action.userId));

            if (response.success) {
                asapScheduler.schedule(() => context.dispatch(new DemoteSeedlingsManagerSuccess(action.userId)));
            } else {
                asapScheduler.schedule(() => context.dispatch(new DemoteSeedlingsManagerFail(response.errors)));
            }
        } catch (exeption: unknown) {
            asapScheduler.schedule(() => context.dispatch(new DemoteSeedlingsManagerFail(exeption)));
        }
    }

    @Action(DemoteSeedlingsManagerSuccess)
    demoteSeedlingsManagerSuccess(context: StateContext<UserStateModel>, action: DemoteSeedlingsManager): void {
        let state = context.getState()
        const newUsers = state.users.map(user => {
            if (user.id == action.userId) {
                return { ...user, seedlingsManager: false };
            }
            return user;
        })
        context.patchState({
            loading: false,
            users: newUsers
        });
    }

    @Action(DemoteSeedlingsManagerFail)
    demoteSeedlingsManagerFail(context: StateContext<UserStateModel>): void {
        context.patchState({ loading: false });
    }

    @Action(RemoveTreecoins)
    async removeTreecoins(context: StateContext<UserStateModel>, action: RemoveTreecoins): Promise<void> {
        context.patchState({ loading: true });
        try {
            const response: ApiResponse<TreecoinsViewModel> =
                await lastValueFrom(this.userService.removeTreecoins(action.id, action.withdraw));
            if (response.success) {
                //Wenn es ein fehler gibt mit response.data dann einfach action benutzen
                asapScheduler.schedule(() => context.dispatch(new RemoveTreecoinsSuccess(response.data.id, response.data.treecoins)));
            } else {
                asapScheduler.schedule(() => context.dispatch(new RemoveTreecoinsFail(response.errors)));
            }
        } catch (exeption) {
            asapScheduler.schedule(() => context.dispatch(new RemoveTreecoinsFail(exeption)));
        }
    }

    @Action(RemoveTreecoinsSuccess)
    removeTreecoinsSuccess(context: StateContext<UserStateModel>, action: AddTreecoinsSuccess): void {
        let state = context.getState()
        const newUsers = state.users.map(user => {
            if (user.id == action.id) {
                return { ...user, treecoins: action.treecoins };
            }
            return user;
        })
        context.patchState({
            loading: false,
            users: newUsers
        });
    }

    @Action(RemoveTreecoinsFail)
    removeTreecoinsFail(context: StateContext<UserStateModel>): void {
        context.patchState({ loading: false });
    }

    @Action(AddTreecoins)
    async addTreecoins(context: StateContext<UserStateModel>, action: AddTreecoins): Promise<void> {
        context.patchState({ loading: true });
        try {
            const response: ApiResponse<TreecoinsViewModel> =
                await lastValueFrom(this.userService.addTreecoins(action.id, action.deposit));
            if (response.success) {
                //Wenn es ein fehler gibt mit response.data dann einfach action benutzen
                asapScheduler.schedule(() => context.dispatch(new AddTreecoinsSuccess(response.data.id, response.data.treecoins)));
            } else {
                asapScheduler.schedule(() => context.dispatch(new AddTreecoinsFail(response.errors)));
            }
        } catch (exeption) {
            asapScheduler.schedule(() => context.dispatch(new AddTreecoinsFail(exeption)));
        }
    }

    @Action(AddTreecoinsSuccess)
    addTreecoinsSuccess(context: StateContext<UserStateModel>, action: AddTreecoinsSuccess): void {
        let state = context.getState()
        const newUsers = state.users.map(user => {
            if (user.id == action.id) {
                return { ...user, treecoins: action.treecoins };
            }
            return user;
        })
        context.patchState({
            loading: false,
            users: newUsers
        });
    }

    @Action(AddTreecoinsFail)
    addTreecoinsFail(context: StateContext<UserStateModel>): void {
        context.patchState({ loading: false });
    }
}