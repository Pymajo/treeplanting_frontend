import { User } from "src/app/entity/user";

export class GetUserSuccess {
    static readonly type: string = '[user.action.user] GetUserSuccess';

    constructor(public readonly data: User[]) {
    }

}