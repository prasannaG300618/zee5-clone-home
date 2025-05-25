import { Body, Controller, Post , UseInterceptors} from '@nestjs/common';
import { UploadService } from './upload.service';
import { uploadDocumentDto } from 'src/dto/uploadDocument.dto';

@Controller('upload')
export class UploadController {
    constructor(private uploadService:UploadService){}
  @Post()
  async uploadMovies(@Body() uploadDetails:uploadDocumentDto) {
    return await this.uploadService.upload(uploadDetails)
  }
}
