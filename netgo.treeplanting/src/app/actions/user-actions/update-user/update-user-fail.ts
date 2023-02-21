export class UpdateUserFail {
    static readonly type: string = '[user.action.user] UpdateUserFail';

    constructor(public errors: string[] | unknown) { }
}