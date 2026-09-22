class ApiError extends Error {

    constructor(message, statusCode) {
        super(message);

        this.statusCode = statusCode;

        Error.captureStackTrace(this, this.constructor);
    }

    static badRequest(message = "Bad Request") {
        return new ApiError(message, 400);
    }

    static conflict(message = "Conflict") {
        return new ApiError(message, 409);
    }

    static forbidden(message = "Forbidden") {
        return new ApiError(message, 403);
    }

    static notFound(message = "Not Found") {
        return new ApiError(message, 404);
    }

    static unauthorized(message = "Unauthorized") {
        return new ApiError(message, 401);
    }
}

export default ApiError;