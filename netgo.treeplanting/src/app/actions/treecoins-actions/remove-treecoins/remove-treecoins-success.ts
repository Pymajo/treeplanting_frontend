export class RemoveTreecoinsSuccess {
    static readonly type: string = '[treecoins.action.treecoins] RemoveTreecoinsSuccess';

    constructor(public id: string, public treecoins: number) { }
}