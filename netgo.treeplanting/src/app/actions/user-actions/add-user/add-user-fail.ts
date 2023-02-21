export class AddUserFail {
    static readonly type: string = '[user.action.user] AddUserFail';

    constructor(public errors: string[] | unknown) { }
}