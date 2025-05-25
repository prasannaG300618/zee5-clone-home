import { JwtService } from '@nestjs/jwt';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { UserService } from 'src/user/user.service';
import { jwtConstants } from './constants';
export enum Provider
    {
        GOOGLE = 'google'
    }
@Injectable()
export class AuthService {
    constructor(private jwtService:JwtService, private userService:UserService){}
    private readonly JWT_SECRET_KEY = process.env.jwtSecret;
   
    async generateToken(payloadValidation){
        console.log(this.JWT_SECRET_KEY)
        console.log("from constants, ",process.env.jwtSecret)
        console.log(payloadValidation)
        return {"accessToken": await this.jwtService.signAsync(payloadValidation)}
         
    }

    async validateOAuthLogin(thirdPartyId: string, provider: Provider): Promise<string>
    {
        try 
        {       
            const payload = {
                thirdPartyId,
                provider
            }

            const jwt: string = sign(payload, process.env.jwtSecret as string, { expiresIn: 3600 });
            return jwt;
        }
        catch (err)
        {
            throw new InternalServerErrorException('validateOAuthLogin', err.message);
        }
    }
}
