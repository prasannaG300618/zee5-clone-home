import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RegisterController } from './register/register.controller';
import { RegisterModule } from './register/register.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RegisterService } from './register/register.service';
import { OtpController } from './otp/otp.controller';
import { OtpModule } from './otp/otp.module';
import { OtpTwilioController } from './otp-twilio/otp-twilio.controller';
import { OtpTwilioService } from './otp-twilio/otp-twilio.service';
import { GoogleAuthStrategy } from './Strategy/register.google.strategy';
import { UserModule } from './user/user.module';
import { UserController } from './user/user.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { HomeService } from './home/home.service';
import { HomeController } from './home/home.controller';
import { HomeModule } from './home/home.module';
import { NestModule } from '@nestjs/common';
import { authMiddleware } from './auth/middleware/auth.middleware';
import {} from '@nestjs/common';
import { UploadModule } from './upload/upload.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/zee5'),
    RegisterModule,
    OtpModule,
    UserModule,
    AuthModule,
    JwtModule,
    HomeModule,
    UploadModule
  ],
  controllers: [
    AppController,
    RegisterController,
    OtpController,
    OtpTwilioController,
    HomeController
  ],
  providers: [
    AppService,
    OtpTwilioService,
    GoogleAuthStrategy,
    AuthService,
    HomeService,

  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(authMiddleware)
      .forRoutes({ path: 'auth/validate', method: RequestMethod.GET },{path:'home/*', method:RequestMethod.GET});
  }
}
