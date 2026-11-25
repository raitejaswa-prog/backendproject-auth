import { Request,Response,NextFunction } from "express";
import BaseDto from "../dto/base-dto";
import ApiError from "../utils/api-errors";

 const validate = (Dto:typeof BaseDto)=>{

    return (req: Request,res:Response,next:NextFunction)=>{

        try{
            BaseDto.validate(Dto);
            next();
        }
        catch(err:any){

            ApiError.badRequest(err);

        }



    }
 }

