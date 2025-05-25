import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { registerDto } from 'src/register/dto/register.dto';
import { userSchema } from 'src/schema/user.schema';
@Injectable()
export class UserService {
  constructor(@InjectModel('user') private userModel: Model<userSchema>) {}
  async findUser(credential: string) {
    let number = parseInt(credential);
    console.log(number);
    let value: registerDto | any;
    if (number) {
      console.log('Number');
      value = await this.userModel.findOne({ phoneNumber: credential }).exec();
    } else {
      console.log('Email');
      value = await this.userModel.findOne({ email: credential }).exec();
    }
    // let value = await this.userModel.findOne({$or:[ { phoneNumber:credential as number },{ email: credential as string}] }).exec()
    if (!value) {
      return "user not exist";
    } else {
      return value;
    }
  }
}
