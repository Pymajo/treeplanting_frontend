export class AddTreecoinsFail {
    static readonly type: string = '[treecoins.action.treecoins] AddTreecoinsFail';

    constructor(public errors: string[] | unknown) { }
}