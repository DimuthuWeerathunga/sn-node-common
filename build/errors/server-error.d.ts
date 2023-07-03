import { CustomError } from './custom-error';
export declare class ServerError extends CustomError {
    statusCode: number;
    constructor();
    serializeErrors(): {
        message: string;
    }[];
}
