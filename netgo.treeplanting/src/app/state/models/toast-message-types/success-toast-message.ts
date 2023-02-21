import { ToastModel } from '../toast.model';
import { IToastRMessage } from '../i-toastr-message.interface';

export abstract class SuccessToastMessage implements IToastRMessage {
  abstract getToastData(): ToastModel;
}
