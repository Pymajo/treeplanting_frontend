export class CreateSeedlingFail {
    static readonly type: string = '[seedling.action.seedling] AddSeedlingFail';

    constructor(public errors: string[] | unknown) { }
}