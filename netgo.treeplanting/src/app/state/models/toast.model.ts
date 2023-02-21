export class ToastModel {
    iconName!: string;
    message!: string;
    title!: string;
    status: 'primary' | 'success' | 'warning' | 'danger' | 'info' = 'info';

    constructor(
        iconName: string,
        message: string,
        title: string,
        status: 'primary' | 'success' | 'warning' | 'danger' | 'info' = 'info') {
        this.iconName = iconName;
        this.message = message;
        this.status = status;
        this.title = title;
    }
}