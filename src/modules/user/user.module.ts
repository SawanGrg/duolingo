import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import UserController from './user.controller';
import { UserService } from './user.service';
import { UserEntity } from 'src/entities/user.entity';
import { UploadModule } from '../file/upload.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), UploadModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
