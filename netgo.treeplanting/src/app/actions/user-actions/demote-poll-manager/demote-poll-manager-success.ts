export class DemotePollManagerSuccess {
    static readonly type: string = '[user.action.user] DemotePollManagerSuccess';
    constructor(public userId: string) { }
}