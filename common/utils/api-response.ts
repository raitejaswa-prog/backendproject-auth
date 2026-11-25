import { Response } from 'express';

class Apiresponse {
  static ok(res: Response, message: string, data: any = null) {
    return res.status(200).json({
      success: true,
      message,
      data
    });
  }


  static created(res: Response,message:string,data: any=null){

    return res.status(201).json({
        success: true,
        message,
        data
    })
  }

  
}

export default Apiresponse;