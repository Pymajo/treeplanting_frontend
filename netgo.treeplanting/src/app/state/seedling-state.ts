import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { asap, asapScheduler, lastValueFrom } from "rxjs";
import { CreateSeedling } from "../actions/seedling-actions/create-seedling/create-seedling";
import { CreateSeedlingFail } from "../actions/seedling-actions/create-seedling/create-seedling-fail";
import { CreateSeedlingSuccess } from "../actions/seedling-actions/create-seedling/create-seedling-success";
import { EditSeedling } from "../actions/seedling-actions/edit-seedling/edit-seedling";
import { EditSeedlingFail } from "../actions/seedling-actions/edit-seedling/edit-seedling-fail";
import { EditSeedlingSuccess } from "../actions/seedling-actions/edit-seedling/edit-seedling-success";
import { GetSeedlings } from "../actions/seedling-actions/get-seedlings/get-seedlings";
import { GetSeedlingsFail } from "../actions/seedling-actions/get-seedlings/get-seedlings-fail";
import { GetSeedlingSucess } from "../actions/seedling-actions/get-seedlings/get-seedlings-success";
import { Seedling } from "../entity/seedling";
import { SeedlingStateModel } from "../entity/seedling-state.model";
import { User } from "../entity/user";
import { UserStateModel } from "../entity/user-state.model";
import { SeedlingService } from "../service/seedling/seedling-service";
import { UserService } from "../service/user/user-service";
import { ApiResponse } from "./models/api-response.model";

@State<SeedlingStateModel>({
    name: 'SeedlingState',
    defaults: {
        seedlings: [],
        loading: false,
        creating: false,
    },
})

@Injectable()
export class SeedlingState {
    initialized: boolean = false;

    @Selector()
    static seedlingStatus(state: SeedlingStateModel): Seedling[] {
        return state.seedlings;
    }

    @Selector()
    static loading(state: SeedlingStateModel): boolean {
        return state.loading;
    }
    constructor(private seedlingService: SeedlingService) { }

    @Action(GetSeedlings)
    async getSeedlings(context: StateContext<SeedlingStateModel>, action: GetSeedlings): Promise<void> {
        context.patchState({ loading: true });
        try {
            const response: ApiResponse<Seedling[]> =
                await lastValueFrom(this.seedlingService.getSeedlings());
            if (response.success) {
                asapScheduler.schedule(() => context.dispatch(new GetSeedlingSucess(response.data)));
            } else {
                asapScheduler.schedule(() => context.dispatch(new GetSeedlingsFail(response.errors)));
            }
        } catch (exeption) {
            asapScheduler.schedule(() => context.dispatch(new GetSeedlingsFail(exeption)));
        }
    }

    @Action(GetSeedlingSucess)
    getUsersSuccess(context: StateContext<SeedlingStateModel>, action: GetSeedlingSucess): void {
        context.patchState({
            loading: false,
            seedlings: action.data,
        });
    }

    @Action(GetSeedlingsFail)
    getUsersFail(context: StateContext<SeedlingStateModel>): void {
        context.patchState({ loading: false });
    }

    @Action(CreateSeedling)
    async createSeedling(context: StateContext<SeedlingStateModel>, action: CreateSeedling): Promise<void> {
        context.patchState({ loading: true });
        try {
            const response: ApiResponse<Seedling> =
                await lastValueFrom(this.seedlingService.createSeedling(action.seedling));
            if (response.success) {
                asapScheduler.schedule(() => context.dispatch(new CreateSeedlingSuccess(response.data)));
            } else {
                asapScheduler.schedule(() => context.dispatch(new CreateSeedlingFail(response.errors)));
            }
        } catch (exeption) {
            asapScheduler.schedule(() => context.dispatch(new CreateSeedlingFail(exeption)));
        }
    }

    @Action(CreateSeedlingSuccess)
    createUserSuccess(context: StateContext<SeedlingStateModel>, action: CreateSeedlingSuccess): void {
        const seedlingsStateModel = context.getState()
        seedlingsStateModel.seedlings.push(action.data);

        context.patchState({
            loading: false,
            seedlings: seedlingsStateModel.seedlings
        });
    }

    @Action(CreateSeedlingFail)
    createSeedlingFail(context: StateContext<SeedlingStateModel>): void {
        context.patchState(
            { loading: false }
        );
    }

    @Action(EditSeedling)
    async editSeedling(context: StateContext<SeedlingStateModel>, action: EditSeedling) {
        context.patchState({ loading: true });

        try {
            const response: ApiResponse<Seedling> =
                await lastValueFrom(this.seedlingService.editSeedling(action.seedling));
            if (response.success) {
                asapScheduler.schedule(() => context.dispatch(new EditSeedlingSuccess(response.data)));
            } else {
                asapScheduler.schedule(() => context.dispatch(new EditSeedlingFail(response.errors)));
            }
        } catch (exeption) {
            asapScheduler.schedule(() => context.dispatch(new EditSeedlingFail(exeption)));
        }
    }

    @Action(EditSeedlingSuccess)
    editSeedlingSuccess(context: StateContext<SeedlingStateModel>, action: EditSeedlingSuccess): void {
        const seedlingsStateModel = context.getState()
        seedlingsStateModel.seedlings.push(action.data);

        context.patchState({
            loading: false,
            seedlings: seedlingsStateModel.seedlings
        });
    }

    @Action(EditSeedlingFail)
    editSeedlingFail(context: StateContext<SeedlingStateModel>): void {
        context.patchState(
            { loading: false }
        );
    }
}
