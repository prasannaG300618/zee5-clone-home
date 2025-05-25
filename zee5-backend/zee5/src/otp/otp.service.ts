import { Injectable } from '@nestjs/common';
let nodemailer = require('nodemailer');
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserService } from 'src/user/user.service';
import { NewUserOtpDto } from './dto/newuser.otp';
import { Code } from 'mongodb';

@Injectable()
export class OtpService {
  constructor(
    @InjectModel('user') private userModel: Model<any>,
    @InjectModel('NewUserOtp') private otpModel: Model<NewUserOtpDto>,
    private readonly userService: UserService,
  ) {}

  transporter = nodemailer.createTransport({
    service:process.env.service,
    host: process.env.host,
    port: process.env.emailport,
    auth: {
      user: process.env.mail,
      pass: process.env.mailPasskey,
    },
  });

  async generateOTP(email: string): Promise<any> {
    let user = await this.userService
      .findUser(email)
      .then()
      .catch((e) => console.log(e));

    let otp = Math.floor(1000 + Math.random() * 9000);
    //Set time limit upto 2 mins
    setTimeout(async () => {
      let expired = await this.userModel
        .updateOne({ email: email }, { $set: { otp: null } })
        .exec();
      let verified = await this.userModel
        .updateOne({ email: email }, { $set: { verified: false } })
        .exec();
      console.log('Executed', expired, verified, email);
    }, 60000 * 2);

    console.log(user);
    if (user) {
      let update = await this.userModel.updateOne(
        { email: email },
        { $set: { otp: otp } },
      );
      console.log('from update Module ', update);
    } else {
      // let newUserCredential = new NewUserOtpDto();
      // newUserCredential.email = email;
      // newUserCredential.code = otp;
      let newUserCredential: NewUserOtpDto = {
        email: email,
        code: otp,
      };
      let newUser = await this.otpModel.create(newUserCredential);
      console.log(newUser);
      setTimeout(async () => {
        let expired = await this.otpModel
          .updateOne({ email: email }, { $set: { code: null } })
          .exec();
        let verified = await this.otpModel
          .updateOne({ email: email }, { $set: { verified: false } })
          .exec();
        console.log('Executed', expired, verified, email);
      }, 4000);
    }

    console.log(otp);
    try {
      let info = this.transporter.sendMail({
        from: process.env.mail,
        to: `${email}`,
        subject: 'OTP for authentication',
        text: `Your OTP is : ${otp}`,
      });

      if (info) {
        console.log(process.env.mail, process.env.mailPasskey)
        return 'Message Sent';
      } else {
        return 'Message not send';
      }
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  async isValidate(email: string, code: number) {
    let user = await this.userModel.findOne({ email: email }).exec();
    if (!user) {
      let newUser = await this.otpModel.findOne({ email: email });

      console.log(newUser);
      if (!newUser) {
        return 'No user found';
      } else if (newUser.code == code) {
        await this.otpModel.updateOne(
          { email: email },
          { $set: { verified: true } },
        );
        return 'New User Verified';
      } else {
        return 'Wrong OTP from new user';
      }
    }
    if (!user.otp) {
      return 'Code expired';
    } else if (user.otp == code) {
      await this.userModel
        .updateOne({ email: email }, { $set: { verified: true } })
        .exec();
      await this.userModel                                                                                                                     
        .updateOne({ email: email }, { $set: { otp: null } })
        .exec();
      return 'verified';
    } else {
      return 'wrong OTP';
    }
  }
}
