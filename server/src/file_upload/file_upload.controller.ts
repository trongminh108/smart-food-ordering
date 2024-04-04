import { diskStorage } from 'multer';

import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';

@Controller('file-upload')
export class FileUploadController {
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, callback) => {
          const fileExtension = extname(file.originalname).toLowerCase();
          const isVideo = ['.mp4', '.avi', '.mkv'].includes(fileExtension);
          const isImage = ['.jpg', '.jpeg', '.png'].includes(fileExtension);
          let destinationPath = '';
          if (isVideo) destinationPath = './public/videos';
          else if (isImage) destinationPath = './public/images';
          else destinationPath = './public/unknown';
          callback(null, destinationPath);
        },
        filename: (req, file, callback) => {
          const filename = file.originalname;
          callback(null, filename);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File): string {
    console.log(file);
    return file.filename;
  }
}
