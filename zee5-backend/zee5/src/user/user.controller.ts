import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService:UserService){}
    @Post()
    async existingUser(@Body("credential") credential:string):Promise<any> {
        console.log(credential)
        return await this.userService.findUser(credential)
    }
}
