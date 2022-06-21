export interface ResponseEvent {
    statusCode: number;
    body?: any;
    headers: any;
    [key: string]: any;
}