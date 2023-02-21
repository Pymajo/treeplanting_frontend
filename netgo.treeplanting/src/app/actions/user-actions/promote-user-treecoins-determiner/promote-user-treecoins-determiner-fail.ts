export class PromoteUserTreecoinsFail {
    static readonly type: string = '[user.action.user] PromoteUserTreecoinsFail';

    constructor(public errors: string[] | unknown) { }
}