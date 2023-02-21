import { PlantingPlace } from "src/app/entity/planting-place";

export class EditPlantingPlace {
    static readonly type: string = '[actions.editplantingPlace]edit plantingPlace';

    constructor(public plantingPlace: PlantingPlace) { }
}