import { Seedling } from "src/app/entity/seedling";

export class CreateSeedlingSuccess {
    static readonly type: string = '[seedling.action.seedling] CreateUserSuccess';


    constructor(public readonly data: Seedling) {
    }


}