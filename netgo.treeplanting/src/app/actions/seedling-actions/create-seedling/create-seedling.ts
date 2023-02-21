import { Seedling } from "src/app/entity/seedling";

export class CreateSeedling {
    static readonly type: string = '[actions.postSeedling]post seedling';
    constructor(public seedling: Seedling) { }
}