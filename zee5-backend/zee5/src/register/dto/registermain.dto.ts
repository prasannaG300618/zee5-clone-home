import {IsString, IsNumber, IsEmail, IsBoolean} from "class-validator";
export class registerDtoMain{
    @IsNumber()
    age ?:number;
    @IsString()
    gender :string;
    @IsNumber()
    phoneNumber :number;
    @IsEmail()
    email?:string;
    @IsString()
    otp? :string;
    @IsBoolean()
    verified?:boolean;
}
