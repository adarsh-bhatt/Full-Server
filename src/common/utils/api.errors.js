class ApiError extends Error {

constructor(message,statuscode){


    super(message)

    this.statuscode = statuscode
    Error.captureStackTrace(this,this.constructor)
}


static badrequest(message = 'Unauthorized'){

    return new ApiError(401,message)
}
static badrequest(message = 'badRequest'){

    return new ApiError(400,message)
}
static conflict(message = 'conflict'){

    return new ApiError(409,message)
}
static forbidden(message = 'forbidden'){

    return new ApiError(412,message)
}
static notFound(message = 'Not Found'){

    return new ApiError(404,message)
}
static unauthorized(message = 'unauthorized'){

    return new ApiError(412,message)
}





    
}

export default ApiError