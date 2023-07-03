import { CustomError } from './custom-error';
export declare class InternalServerError extends CustomError {
    statusCode: number;
    constructor();
    serializeErrors(): {
        message: string;
    }[];
}
