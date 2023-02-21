import { User } from "../../../entity/user";

export class AddUser {
    static readonly type: string = '[actions.postuser]post user';
    constructor(public user: User) { }
}