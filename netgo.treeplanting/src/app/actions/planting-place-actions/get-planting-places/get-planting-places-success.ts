import { PlantingPlace } from "src/app/entity/planting-place";
import { Seedling } from "src/app/entity/seedling";

export class GetPlantingPlacesSucess {
    static readonly type: string = '[plantingPlace.action.plantingPlaces] GetPlantingPlacesSucess';

    constructor(public readonly data: PlantingPlace[]) {
    }
}