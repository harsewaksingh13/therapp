export interface ApiError extends Error {
    code: bigint;
    text: string;
}

