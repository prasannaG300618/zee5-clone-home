import { Module } from '@nestjs/common';
import { RegisterService } from './register.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/schema/user.schema';
import { GoogleAuthStrategy} from '../Strategy/register.google.strategy';
import { RegisterController } from './register.controller';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';
@Module({
  providers: [RegisterService, GoogleAuthStrategy],
  imports: [MongooseModule.forFeature([{ name:"user" , schema: UserSchema }]), AuthModule],
  controllers:[RegisterController],
  exports: [RegisterService],
})
export class RegisterModule {}