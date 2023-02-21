import { PlantingPlace } from "src/app/entity/planting-place";

export class EditPlantingPlaceSuccess {
    static readonly type: string = '[plantingPlace.action.plantingPlace] EditPlantingPlaceSuccess';

    constructor(public readonly data: PlantingPlace) {

    }
}