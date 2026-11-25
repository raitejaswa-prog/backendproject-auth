import {randomBytes,timingSafeEqual} from "node:crypto";
import {createHash} from "node:crypto";
import "dotenv/config";
import jwt from "jsonwebtoken";


type AcessPayload = {id: string,role:string};
type RefreshPayload = {id:string};

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET!;
const REFRESH_SECRET = process.env.JWT_ACCESS_SECRET!;

const genrateAccessToken = (payload:AcessPayload)=>
     jwt.sign(payload, ACCESS_SECRET,{expiresIn:"15m"});

const genrateRefreshToken = (payload:RefreshPayload)=>
    jwt.sign(payload,REFRESH_SECRET,{expiresIn:"7d"});


const verfyAcessToken = (token:string)=>
    jwt.verify(token,ACCESS_SECRET);


const verfyRefreshToken = (token:string)=>
    jwt.verify(token,REFRESH_SECRET);

const hashedToken = (token:string)=>{
    return createHash("sha256").update(token).digest("hex");
}

const genrateResetToken = ()=>{
    const rawToken = randomBytes(32).toString("hex");
    return {rawToken,hashedToken:hashedToken(rawToken)};
}


export {genrateAccessToken,genrateRefreshToken,verfyAcessToken,verfyRefreshToken,genrateResetToken,hashedToken};








