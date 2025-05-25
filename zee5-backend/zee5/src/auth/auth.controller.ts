import { Body, Controller, Post, Get, UseInterceptors , Query, Req} from '@nestjs/common';
import { AuthService } from './auth.service';
import { OtpTwilioService } from 'src/otp-twilio/otp-twilio.service';
import { otp } from 'src/register/dto/otp.dto';
import { OtpService } from 'src/otp/otp.service';
import { Request } from 'express';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private otptwilioService: OtpTwilioService,
    private otpService: OtpService,
  ) {}

  @Post('mobile-verification')
  async generateToken(@Body() data: { phoneNumber: number; otp: string }) {
    console.log(data);
    let otpValid = await this.otptwilioService.validOtp(
      data.otp,
      data.phoneNumber,
    );
    console.log(otpValid);

    if (otpValid) {
      let payload = {credential:data.phoneNumber}
      return this.authService.generateToken(payload);
    } else {
      console.log('OTP is invalid');
      return { accessToken: 'OTP is in Valid' };
    }
  }

  @Post('email-verification')
  async GenerateTokenEmail(@Body() data: { email: string; code: number }) {
    let email = await this.otpService.isValidate(data.email, data.code);
    console.log(email);
    let payload = {credential:data.email}
    if (email === 'verified') {
      return this.authService.generateToken(payload);
    } else {
      return email;
    }
  }

  //verification
  @UseGuards(AuthGuard)
  @Get('validate')
  validateJWT(@Req() request: Request) {
    return request["user"];
  }

  @Get("otp")
  generateOTP(@Query("credential") credential:string){
    console.log(typeof credential)
    console.log(credential)
  }

  @Get()
  display() {
    console.log(process.env.secret);
  }
}
