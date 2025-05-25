import { Module } from '@nestjs/common';
import { UploadService } from 'src/upload/upload.service';
import { UploadDocumentSchema } from 'src/schema/uploadDocument.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UploadModule } from 'src/upload/upload.module';

@Module({
    imports:[UploadModule]
})
export class HomeModule {}
