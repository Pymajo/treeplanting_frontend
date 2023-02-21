export class DemoteUserTreecoinsFail {
    static readonly type: string = '[user.action.user] DemoteUserTreecoinsFail';

    constructor(public errors: string[] | unknown) { }
}