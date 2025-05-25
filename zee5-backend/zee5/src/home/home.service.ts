import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { uploadDocumentSchema } from 'src/schema/uploadDocument.schema';
import { Model } from 'mongoose';

@Injectable()
export class HomeService {
    constructor(@InjectModel("shows") private uploadModel: Model<uploadDocumentSchema>){}

    async getShows(pagination:{limit:number, offset:number}){
        return await this.uploadModel.find().limit(pagination.limit).skip(pagination.offset).exec();
    }

    async getCarousel(){
        return await this.uploadModel.find().limit(7).exec()
    }

    async searchShows(keyValue){
        const regex = new RegExp(keyValue, 'i');
        return await this.uploadModel.find({$or:[{programName: { $regex: regex} }, {language: regex}, {actor:regex}, {type: regex}]})
    }

    async  play(id) {
        return await this.uploadModel.find({_id:id.accessId})
    }
}
