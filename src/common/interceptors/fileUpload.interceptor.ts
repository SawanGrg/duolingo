import { Injectable } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter, fileLimits, multerConfig } from 'src/config/multer.config';

@Injectable()
export default class FileUploadInterceptor extends FileInterceptor('file', {
  storage: multerConfig.storage,
  fileFilter: fileFilter,
  limits: fileLimits,
}) {}
