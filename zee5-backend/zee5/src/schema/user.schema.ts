import { Schema, SchemaFactory, Prop } from "@nestjs/mongoose";
import { Document,Types } from "mongoose";
export type user = userSchema & Document<Types.ObjectId>;
@Schema()
export  class userSchema{
    @Prop()
    age: Number;
    @Prop({default:0,required:false})
    phoneNumber: Number
    @Prop({required:false})
    gender:String
    @Prop({default:"Email not given", type:String})
    email:string
    @Prop({required:false})
    otp:Number
    @Prop({required:false})
    verified:Boolean
    @Prop()
    language:string
    @Prop({default:false})
    Premium:boolean
  }

  export const UserSchema = SchemaFactory.createForClass(userSchema)

