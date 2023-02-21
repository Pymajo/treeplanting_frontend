import { translate } from "@ngneat/transloco";
import { FailToastMessage } from "src/app/state/models/toast-message-types/fail-toast-message";
import { ToastModel } from "src/app/state/models/toast.model";

export class GetSeedlingsFail extends FailToastMessage {
    static readonly type: string = '[seedlings.action.seedlings] GetSeedlingsFail';

    constructor(public readonly errors: string[] | unknown) {
        super(errors);
    }

    getToastData(): ToastModel {
        return new ToastModel(
            'close-outline',
            this.getErrorMessage(),
            translate('state.actions.get-users.fail.title', undefined, 'users'),
            'danger',
        );
    }
}