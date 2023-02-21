export class PromoteSeedlingsManagerFail {
    static readonly type: string = '[user.action.user] PromoteSeedlingsManagerFail';

    constructor(public errors: string[] | unknown) { }
}