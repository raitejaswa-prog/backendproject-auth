class ApiError extends Error{

     statusCode;
     isOperational: boolean;

    constructor(statusCode:number,message: string){
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
    }

        static badRequest(message = 'bad request'){
            return new ApiError(400,message);

        }

        static unauthorized(message = 'Unauthorized'){
            return new ApiError(401,message);
        }

        static forbidden(message = 'Forbidden'){
            return new ApiError(403,message);
        }

        static conflict(message='Email already exist'){
            return new ApiError(402,message);
        }

        static notFound(message:string){
            return new ApiError(404,message);
        }

        
    
}


export default ApiError;