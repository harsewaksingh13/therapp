export interface AppError extends Error {
    //name & message are already in base as properties, so this class be used to recognise local error
}

//represents any local generated error