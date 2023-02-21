export class PromotePollManagerFail {
    static readonly type: string = '[user.action.user] PromotePollManagerFail';

    constructor(public errors: string[] | unknown) { }
}