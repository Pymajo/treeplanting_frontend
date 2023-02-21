export class DemotePollManager {
    static readonly type: string = '[actions.DemotePollManager]demote poll manager';

    constructor(public userId: string) { }
}