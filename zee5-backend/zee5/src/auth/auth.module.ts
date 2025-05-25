import { MiddlewareConsumer, Module , RequestMethod} from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { OtpTwilioService } from 'src/otp-twilio/otp-twilio.service';
import { OtpModule } from 'src/otp/otp.module';
import { OtpService } from 'src/otp/otp.service';
import { NestModule } from '@nestjs/common';
import { authMiddleware } from './middleware/auth.middleware';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
@Module({
  controllers: [AuthController],
  imports:[
    JwtModule.register({
     secret:jwtConstants.secret,
      signOptions:{expiresIn:"2h"}
    }), OtpModule, UserModule
  ],
  providers: [AuthService, OtpTwilioService],
  exports: [AuthService]
})
export class AuthModule {}
