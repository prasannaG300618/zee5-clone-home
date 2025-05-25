import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UploadDocumentSchema, uploadDocumentSchema} from 'src/schema/uploadDocument.schema';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';

@Module({
    imports:[MongooseModule.forFeature([{ name:"shows" , schema: UploadDocumentSchema }])],
    providers:[UploadService],
    exports:[UploadService, MongooseModule.forFeature([{ name:"shows" , schema: UploadDocumentSchema }])],
    controllers:[UploadController]
})
export class UploadModule {}
