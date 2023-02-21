import { Seedling } from "src/app/entity/seedling";

export class EditSeedling {
    static readonly type: string = '[actions.editseedling]edit seedling';

    constructor(public seedling: Seedling) { }
}