export class ConfirmUser {
    static readonly type: string = '[actions.confirmUser]confirm user';

    constructor(public userId: string) { }
}