export class DemoteUserAdminSuccess {
    static readonly type: string = '[user.action.user] DemoteUserAdminSuccess';
    /**
     *
     */
    constructor(public userId: string) { }
}