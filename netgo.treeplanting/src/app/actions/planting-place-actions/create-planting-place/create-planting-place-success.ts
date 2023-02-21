import { PlantingPlace } from "src/app/entity/planting-place";

export class CreatePlantingPlaceSuccess {
    static readonly type: string = '[plantingPlace.action.plantingPlace] CreatePlantingPlaceSuccess';


    constructor(public readonly data: PlantingPlace) {
    }


}