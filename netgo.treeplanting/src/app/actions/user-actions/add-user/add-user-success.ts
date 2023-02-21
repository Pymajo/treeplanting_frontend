import { User } from "src/app/entity/user";

export class AddUserSuccess {
    static readonly type: string = '[user.action.user] AddUserSuccess';


    constructor(public readonly data: User) {
    }


}