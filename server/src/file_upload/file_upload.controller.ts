import { diskStorage } from 'multer';
import { basename, extname } from 'path';
import { v4 as uuidv4 } from 'uuid';

import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

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
          const filename = basename(
            file.originalname,
            extname(file.originalname),
          );
          const uniqueSuffix = `${Date.now()}-${Math.round(
            Math.random() * 1e9,
          )}`;
          const fileExtension = extname(file.originalname).toLowerCase();
          const randomFilename = `${filename}-${uniqueSuffix}${fileExtension}`;
          callback(null, randomFilename);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File): string {
    return file.filename;
  }
}
