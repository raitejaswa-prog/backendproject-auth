import { Request,Response } from "express";
import * as authservice from "../auth/auth.services"
import Apiresponse from "../../common/utils/api-response";


const register = async(req:Request,res:Response)=>{

    const user = await authservice.register(req.body);
    Apiresponse.created(res,"Resgistration Sucessful",user)

}

const login = async(req:Request,res:Response)=>{
    const user = await authservice.login(req.body);
    Apiresponse.ok(res,"Login Succesful",user);

}

export {register,login}