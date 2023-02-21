export class PromoteUserAdminFail {
    static readonly type: string = '[user.action.user] PromoteUserAdminFail';

    constructor(public errors: string[] | unknown) { }
}