import { User } from "src/app/entity/user";

export class GetUser {
    static readonly type: string = '[actions.getusers]get users';

    constructor(public user: User) { }
}