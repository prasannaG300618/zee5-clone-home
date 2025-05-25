import {PassportStrategy } from "@nestjs/passport"
import {Strategy, VerifyCallback } from "passport-google-oauth20"
import { Injectable } from "@nestjs/common"
import { AuthService,Provider } from "src/auth/auth.service"
@Injectable()
export class GoogleAuthStrategy extends PassportStrategy(Strategy, 'google'){
    constructor(readonly authService:AuthService){
        super({
            clientID:process.env.GoogleClientID,
            clientSecret:process.env.GoogleSecret,
            callbackURL:process.env.GoogleURL,
            scope:["email"]
        })
    }

    async validate(accessToken:string, refreshToken:string, profile:any, done:VerifyCallback):Promise<any>{
        try
        {
            console.log(profile);

            const jwt: string = await this.authService.validateOAuthLogin(profile.id, Provider.GOOGLE);
            const user = 
            {
                jwt
            }

            done(null, user);
        }
        catch(err)
        {
            done(err, false);
        }
    }
    }
