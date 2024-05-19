import { BaseError } from "sequelize";

export interface ExtendedError extends Error {
    statusCode: number;
    status: string;
    message: string;
    isOperational: boolean;
    parent?: {
        code?: string;
        [key: string]: any;
    };
}