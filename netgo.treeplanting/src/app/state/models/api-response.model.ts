export class ApiResponse<T> {
    public success!: boolean;
    public data!: T;
    public errors!: string[];
}
