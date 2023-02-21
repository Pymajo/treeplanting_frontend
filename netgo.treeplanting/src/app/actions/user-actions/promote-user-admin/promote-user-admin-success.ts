export class PromoteUserAdminSuccess {
    static readonly type: string = '[user.action.user] PromoteUserAdminSuccess';
    /**
     *
     */
    constructor(public userId: string) { }
}