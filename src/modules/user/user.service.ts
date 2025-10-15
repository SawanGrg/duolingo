import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  public async findAll(): Promise<UserEntity[]> {
    return await this.userRepo.find();
  }

  public async createUser(userData: Partial<UserEntity>): Promise<UserEntity> {
    const user = this.userRepo.create(userData);
    return await this.userRepo.save(user);
  }
}
