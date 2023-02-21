import { HttpErrorResponse } from '@angular/common/http';
import { translate } from '@ngneat/transloco';
import { ToastModel } from '../toast.model';
import { IToastRMessage } from '../i-toastr-message.interface';

export abstract class FailToastMessage implements IToastRMessage {
    public error: unknown;

    protected constructor(error: unknown) {
        this.error = error;
    }
    abstract getToastData(): ToastModel;

    getErrorMessage(): string {
        if (this.error instanceof Array) {
            return `${this.error.join()}`;
        }

        if (this.error instanceof HttpErrorResponse) {
            if (!this.error.error || !this.error.error.errors) {
                return `${this.error.status}: "${this.error.message.substr(0, Math.min(this.error.message.length, 19))}..."`;
            }

            if (typeof this.error.error.errors === 'string' || !this.error.error.errors.join) {
                return this.error.error.errors;
            }

            return `${this.error.status}: ${this.error.error.errors.join()}`;
        }

        return translate('shared.models.toast-message-types.generic-error');
    }
}