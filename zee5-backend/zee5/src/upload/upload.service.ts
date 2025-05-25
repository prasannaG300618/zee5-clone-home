import { Injectable } from '@nestjs/common';
import { uploadDocumentSchema } from 'src/schema/uploadDocument.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
@Injectable()
export class UploadService {
    constructor(@InjectModel('shows') private uploadDocumentModel: Model<uploadDocumentSchema>){}
    async upload(uploadDetails){
        console.log(uploadDetails)
        return await this.uploadDocumentModel.create(uploadDetails)

    }

}
