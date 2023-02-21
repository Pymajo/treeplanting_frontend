import { Seedling } from "src/app/entity/seedling";

export class EditSeedlingSuccess {
    static readonly type: string = '[seedling.action.seedling] EditSeedlingSuccess';

    constructor(public readonly data: Seedling) {

    }
}