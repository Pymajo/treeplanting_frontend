import { Seedling } from "src/app/entity/seedling";

export class GetSeedlingSucess {
    static readonly type: string = '[seedling.action.seedlings] GetSeedlingSucess';

    constructor(public readonly data: Seedling[]) {
    }
}