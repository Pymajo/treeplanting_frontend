import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { asap, asapScheduler, lastValueFrom } from "rxjs";
import { CreatePlantingPlace } from "../actions/planting-place-actions/create-planting-place/create-planting-place";
import { CreatePlantingPlaceFail } from "../actions/planting-place-actions/create-planting-place/create-planting-place-fail";
import { CreatePlantingPlaceSuccess } from "../actions/planting-place-actions/create-planting-place/create-planting-place-success";
import { EditPlantingPlace } from "../actions/planting-place-actions/edit-planting-place/edit-planting-place";
import { EditPlantingPlaceFail } from "../actions/planting-place-actions/edit-planting-place/edit-planting-place-fail";
import { EditPlantingPlaceSuccess } from "../actions/planting-place-actions/edit-planting-place/edit-planting-place-success";
import { GetPlantingPlaces } from "../actions/planting-place-actions/get-planting-places/get-planting-places";
import { GetPlantingPlacesFail } from "../actions/planting-place-actions/get-planting-places/get-planting-places-fail";
import { GetPlantingPlacesSucess } from "../actions/planting-place-actions/get-planting-places/get-planting-places-success";
import { CreateSeedling } from "../actions/seedling-actions/create-seedling/create-seedling";
import { CreateSeedlingFail } from "../actions/seedling-actions/create-seedling/create-seedling-fail";
import { CreateSeedlingSuccess } from "../actions/seedling-actions/create-seedling/create-seedling-success";
import { EditSeedling } from "../actions/seedling-actions/edit-seedling/edit-seedling";
import { EditSeedlingFail } from "../actions/seedling-actions/edit-seedling/edit-seedling-fail";
import { EditSeedlingSuccess } from "../actions/seedling-actions/edit-seedling/edit-seedling-success";
import { GetSeedlings } from "../actions/seedling-actions/get-seedlings/get-seedlings";
import { GetSeedlingsFail } from "../actions/seedling-actions/get-seedlings/get-seedlings-fail";
import { GetSeedlingSucess } from "../actions/seedling-actions/get-seedlings/get-seedlings-success";
import { PlantingPlace } from "../entity/planting-place";
import { PlantingPlaceStateModel } from "../entity/planting-place-state.model";
import { Seedling } from "../entity/seedling";
import { SeedlingStateModel } from "../entity/seedling-state.model";
import { User } from "../entity/user";
import { UserStateModel } from "../entity/user-state.model";
import { PlantingPlaceService } from "../service/planting-place/planting-place-service";
import { SeedlingService } from "../service/seedling/seedling-service";
import { UserService } from "../service/user/user-service";
import { ApiResponse } from "./models/api-response.model";

@State<PlantingPlaceStateModel>({
    name: 'PlanginPlaceState',
    defaults: {
        plantingPlaces: [],
        loading: false,
        creating: false,
    },
})

@Injectable()
export class PlantingPlaceState {
    initialized: boolean = false;

    @Selector()
    static plantingPlaceStatus(state: PlantingPlaceStateModel): PlantingPlace[] {
        return state.plantingPlaces;
    }

    @Selector()
    static loading(state: PlantingPlaceStateModel): boolean {
        return state.loading;
    }
    constructor(private plantingPlaceService: PlantingPlaceService) { }

    @Action(GetPlantingPlaces)
    async getPlantingPlaces(context: StateContext<PlantingPlaceStateModel>, action: GetPlantingPlaces): Promise<void> {
        context.patchState({ loading: true });
        try {
            const response: ApiResponse<PlantingPlace[]> =
                await lastValueFrom(this.plantingPlaceService.getPlantingPlaces());
            if (response.success) {
                asapScheduler.schedule(() => context.dispatch(new GetPlantingPlacesSucess(response.data)));
            } else {
                asapScheduler.schedule(() => context.dispatch(new GetPlantingPlacesFail(response.errors)));
            }
        } catch (exeption) {
            asapScheduler.schedule(() => context.dispatch(new GetPlantingPlacesFail(exeption)));
        }
    }

    @Action(GetPlantingPlacesSucess)
    getPlantingPlacesSuccess(context: StateContext<PlantingPlaceStateModel>, action: GetPlantingPlacesSucess): void {
        context.patchState({
            loading: false,
            plantingPlaces: action.data,
        });
    }

    @Action(GetPlantingPlacesFail)
    getPlantingPlacesFail(context: StateContext<PlantingPlaceStateModel>): void {
        context.patchState({ loading: false });
    }

    @Action(CreatePlantingPlace)
    async createPlantingPlace(context: StateContext<PlantingPlaceStateModel>, action: CreatePlantingPlace): Promise<void> {
        context.patchState({ loading: true });
        try {
            const response: ApiResponse<PlantingPlace> =
                await lastValueFrom(this.plantingPlaceService.createPlantingPlace(action.plantingPlace));
            if (response.success) {
                asapScheduler.schedule(() => context.dispatch(new CreatePlantingPlaceSuccess(response.data)));
            } else {
                asapScheduler.schedule(() => context.dispatch(new CreatePlantingPlaceFail(response.errors)));
            }
        } catch (exeption) {
            asapScheduler.schedule(() => context.dispatch(new CreatePlantingPlaceFail(exeption)));
        }
    }

    @Action(CreatePlantingPlaceSuccess)
    createPlantingPlaceSuccess(context: StateContext<PlantingPlaceStateModel>, action: CreatePlantingPlaceSuccess): void {
        const plantingPlacesStateModel = context.getState()
        plantingPlacesStateModel.plantingPlaces.push(action.data);

        context.patchState({
            loading: false,
            plantingPlaces: plantingPlacesStateModel.plantingPlaces
        });
    }

    @Action(CreatePlantingPlaceFail)
    createPlantingPlaceFail(context: StateContext<PlantingPlaceStateModel>): void {
        context.patchState(
            { loading: false }
        );
    }

    @Action(EditPlantingPlace)
    async editPlantingPlace(context: StateContext<PlantingPlaceStateModel>, action: EditPlantingPlace) {
        context.patchState({ loading: true });

        try {
            const response: ApiResponse<PlantingPlace> =
                await lastValueFrom(this.plantingPlaceService.editPlantingPlace(action.plantingPlace));
            if (response.success) {
                asapScheduler.schedule(() => context.dispatch(new EditPlantingPlaceSuccess(response.data)));
            } else {
                asapScheduler.schedule(() => context.dispatch(new EditPlantingPlaceFail(response.errors)));
            }
        } catch (exeption) {
            asapScheduler.schedule(() => context.dispatch(new EditPlantingPlaceFail(exeption)));
        }
    }

    @Action(EditPlantingPlaceSuccess)
    editPlantingPlaceSuccess(context: StateContext<PlantingPlaceStateModel>, action: EditPlantingPlaceSuccess): void {
        const plantingPlacesStateModel = context.getState()
        plantingPlacesStateModel.plantingPlaces.push(action.data);

        context.patchState({
            loading: false,
            plantingPlaces: plantingPlacesStateModel.plantingPlaces
        });
    }

    @Action(EditPlantingPlaceFail)
    editPlantingPlaceFail(context: StateContext<PlantingPlaceStateModel>): void {
        context.patchState(
            { loading: false }
        );
    }
}
