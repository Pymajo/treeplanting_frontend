export class EditPlantingPlaceFail {
    static readonly type: string = '[plantingPlace.action.plantingPlace] EditPlantingPlaceFail';

    constructor(public errors: string[] | unknown) { }
}