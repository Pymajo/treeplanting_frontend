import { User } from "src/app/entity/user";

export class DeleteUser {
    static readonly type: string = '[actions.deleteuser]delete user';

    constructor(public user: User) { }
}