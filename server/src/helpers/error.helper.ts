export function getWebError(err: Error, status: number) {
    return {
        message: err.message,
        status
    };
}
