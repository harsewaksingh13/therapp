export interface ApiError extends Error {
    code: string;
    text: string;
}

export interface AppError extends Error{
    name : string
    message : string
}