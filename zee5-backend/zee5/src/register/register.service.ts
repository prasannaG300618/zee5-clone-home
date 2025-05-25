import { Injectable } from '@nestjs/common';
import { registerDto } from './dto/register.dto';
import { Model} from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { userSchema } from 'src/schema/user.schema';

@Injectable()
export class RegisterService {
    constructor(@InjectModel("user") private userModel: Model<userSchema>) {}
    async  register(data:registerDto){
        return await this.userModel.create(data)
    }
}
