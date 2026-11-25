import { z } from "zod";
import ApiError from "../utils/api-errors";


class BaseDto{

    static schema: z.ZodType;

    static validate<T extends typeof BaseDto>(this:T, data: unknown){

        const result:any = this.schema.parse(data);

        if(!result.sucess){
            const message = result.error.map((val:any)=>val.message).join(", ");

            ApiError.badRequest(message);

            


            
        }

        return result.data;
    }
}
export default BaseDto;
