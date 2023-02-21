import { PlantingPlace } from "src/app/entity/planting-place";

export class CreatePlantingPlace {
    static readonly type: string = '[actions.postPlantingPlace]post plantingPlace';
    constructor(public plantingPlace: PlantingPlace) { }
}