import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
@Injectable()
export class OtpTwilioService {
  constructor(private authService:AuthService){}
    accountSid = process.env.TwilioAccountId;
    authToken = process.env.TwilioAuthToken;
    client = require('twilio')(this.accountSid, this.authToken);

    createOtp(number:number){
        this.client.verify.v2.services(process.env.TwilioService)
      .verifications
      .create({to: `+91${number}`, channel: 'sms'})
      .then(verification => console.log(verification.sid));
    }

    async validOtp(code:string, number:number):Promise<boolean>{
      let result = this.client.verify.v2.services(process.env.TwilioService)
      .verificationChecks
      .create({to: `+91${number}`, code: code})
      .then(verificationCheck => {
        console.log("From OTP Tiwilo Module ",verificationCheck.valid)
      result = verificationCheck.valid
      return result
      });
      return result
    }

    

}
// VA8dd1605a73158b282379cb117729049d