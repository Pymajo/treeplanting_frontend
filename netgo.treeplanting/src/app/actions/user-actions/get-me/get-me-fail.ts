export class GetMeFail {
    static readonly type: string = '[user.action.user] GetMeFail';

    constructor(public errors: string[] | unknown) { }
}