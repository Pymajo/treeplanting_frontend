export class EditSeedlingFail {
    static readonly type: string = '[seedling.action.seedling] EditSeedlingFail';

    constructor(public errors: string[] | unknown) { }
}