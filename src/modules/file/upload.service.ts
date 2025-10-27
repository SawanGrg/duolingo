import { Injectable } from '@nestjs/common';
import { join } from 'path';

@Injectable()
export default class UploadService {
  public async getFilePath(fileName: string): Promise<string> {
    return join(process.cwd(), 'uploads', fileName);
  }

  public async getPublicFilePath(fileName: string): Promise<string> {
    return `/uploads/${fileName}`;
  }
}
