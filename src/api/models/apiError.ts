export interface ApiError extends Error {
    code: string;
    text: string;
}

