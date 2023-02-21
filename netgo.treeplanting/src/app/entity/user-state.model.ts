import { User } from "./user";

export class UserStateModel {
    creating!: boolean;
    loading!: boolean;
    users!: User[];
}