export class ConfirmUserFail {
    static readonly type: string = '[user.action.user] ConfirmUserFail';

    constructor(public errors: string[] | unknown) { }
}