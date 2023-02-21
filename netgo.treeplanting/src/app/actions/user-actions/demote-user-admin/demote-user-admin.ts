export class DemoteUserAdmin {
    static readonly type: string = '[actions.demoteUserAdmin]demote user admin';

    constructor(public userId: string) { }
}