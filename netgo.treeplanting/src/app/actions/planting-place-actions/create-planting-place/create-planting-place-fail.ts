export class CreatePlantingPlaceFail {
    static readonly type: string = '[plantingPlace.action.plantingPlace] AddPlantingPlaceFail';

    constructor(public errors: string[] | unknown) { }
}