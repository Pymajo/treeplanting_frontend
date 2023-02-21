export class DeleteUserFail {
    static readonly type: string = '[user.action.user] DeleteUserFail';

    constructor(public errors: string[] | unknown) { }
}