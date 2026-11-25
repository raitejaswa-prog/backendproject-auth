import db from "../../common/config/db"
import ApiError from "../../common/utils/api-errors";
import {users,refreshTokens} from "./auth.model";
import {eq} from "drizzle-orm";
import bcrypt from "bcrypt";
import{
    genrateAccessToken,
    genrateRefreshToken,
    genrateResetToken,
    hashedToken
} from "../../common/utils/hash"


interface user{
    name:string,
    email:string,
    password:string
}



const register = async(val:user)=>{

    const [existing] = await db.select({id: users.id})
    .from(users)
    .where(eq(users.email,val.email));

    if(existing) ApiError.conflict("Email Already exist");

    const{rawToken,hashedToken} = genrateResetToken();

    const hashedPassword = await bcrypt.hash(val.password,256);

    const [user] = await db.insert(users)
    .values({name:val.name,email:val.email,password:hashedPassword,verificationToken:hashedToken})
    .returning({id: users.id,name: users.name,email:users.email,role: users.role})

    /// TODO:>send raw token to email

    return user;

}

const login = async(val:user)=>{

    const [user] = await db.select()
    .from(users)
    .where(eq(users.email,val.email));

    if(!user) ApiError.notFound("Invalid email password");

    const ok = bcrypt.compare(val.password,user.password);

    if(!ok) ApiError.unauthorized("Invalid password");

    if(!user.isVerified) ApiError.forbidden("Please verfy your email");

    const acessToken = genrateAccessToken({id:user.id,role:user.role});
    const refreshToken = genrateRefreshToken({id:user.id});

    await db.insert(refreshTokens).values({
        token:hashedToken(refreshToken),
        userId:user.id,
        expiresAt: new Date(Date.now()+7*24*60*60*1000)
    })

}
















export {register,login}
