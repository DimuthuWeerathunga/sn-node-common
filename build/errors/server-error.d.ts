import { CustomError } from './custom-error';
export declare class BadRequestError extends CustomError {
    statusCode: number;
    constructor();
    serializeErrors(): {
        message: string;
    }[];
}
