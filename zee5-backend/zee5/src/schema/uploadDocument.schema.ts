import { Schema, SchemaFactory, Prop } from "@nestjs/mongoose";
import { Document,Types } from "mongoose";
export type shows = uploadDocumentSchema & Document<Types.ObjectId>;

@Schema()
export class uploadDocumentSchema {
    @Prop({required:true})
    programName : string
    @Prop({required:true})
    portraitImageSrc:string
    @Prop({required:true})
    landscapeImageSrc:string
    @Prop({required:true})
    type:string
    @Prop({required:true})
    premium:boolean;
    @Prop({default:0})
    watchCount:number;
    @Prop({default:new Date()})
    dateOfUpload:Date
    @Prop({required:false})
    genre:string
    @Prop({required:false})
    description:string
    @Prop({type:Object})
    cast:{
        femaleCharacter: string,
        maleCharacter:string,
        actor:string,
        actress:string,
        director:string
    }
    @Prop({required:false})
    newsReader:string
    @Prop({required:true})
    language:string
    @Prop({required:true})
    kids:boolean
}
export const UploadDocumentSchema = SchemaFactory.createForClass(uploadDocumentSchema)