import { MeViewModel } from "src/app/entity/me-view.model";
import { User } from "src/app/entity/user";

export class GetMe {
    static readonly type: string = '[actions.getme]get me';

    constructor(public id: string) { }
}