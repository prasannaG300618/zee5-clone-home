import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { OtpService } from './otp.service';
import { UserService } from 'src/user/user.service';

@Controller('otp')
export class OtpController {
    constructor(private readonly otpService:OtpService, private readonly userService:UserService){}
    @Post()
    log(@Body("email") email):any{
      return this.otpService.generateOTP(email)
    }

    @Post("validate")
    isValid(@Body() data:{email:string, code:number}):any{
          console.log(data.code)
          return  this.otpService.isValidate(data.email,data.code) 
        }

    @Get("Details")
    async find(@Query("Credential") Credential:string){
      return await this.userService.findUser(Credential)
    }
}
