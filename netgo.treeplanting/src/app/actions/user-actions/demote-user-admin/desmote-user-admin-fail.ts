export class DemoteUserAdminFail {
    static readonly type: string = '[user.action.user] DemoteUserAdminFail';

    constructor(public errors: string[] | unknown) { }
}