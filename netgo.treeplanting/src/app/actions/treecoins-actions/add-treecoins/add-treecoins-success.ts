export class AddTreecoinsSuccess {
    static readonly type: string = '[treecoins.action.treecoins] AddTreecoinsSuccess';

    constructor(public id: string, public treecoins: number) { }
}