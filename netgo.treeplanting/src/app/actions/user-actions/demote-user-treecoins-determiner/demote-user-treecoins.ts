export class DemoteUserTreecoins {
    static readonly type: string = '[actions.demoteUserTreecoins]demote user treecoins';

    constructor(public userId: string) { }
}