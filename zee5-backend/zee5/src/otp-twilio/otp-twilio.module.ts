import { Module } from '@nestjs/common';
import { OtpTwilioService } from './otp-twilio.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { jwtConstants } from 'src/auth/constants';
@Module({
  imports:[AuthService, JwtModule.register({
    secret:jwtConstants.secret,
     signOptions:{expiresIn:"2d"}
   })],
  providers: [OtpTwilioService],
  exports:[OtpTwilioService]
})
export class OtpTwilioModule {}
