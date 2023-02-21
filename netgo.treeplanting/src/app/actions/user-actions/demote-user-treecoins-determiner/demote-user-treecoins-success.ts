export class DemoteUserTreecoinsSuccess {
    static readonly type: string = '[user.action.user] DemoteUserTreecoinsSuccess';
    /**
     *
     */
    constructor(public userId: string) { }
}