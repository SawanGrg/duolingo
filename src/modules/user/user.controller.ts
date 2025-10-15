import { Controller, Post, Body, Get } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { MessageResponseDto } from 'src/common/messageResponse.dto';
import { UserService } from './user.service';
import { GetUserDto } from './dto/getUser.dto';

@Controller('users')
export default class UserController {
  constructor(private readonly userService: UserService) {
    this.userService = userService;
  }

  @Post('create')
  public async createUser(
    @Body() userDto: CreateUserDto,
  ): Promise<MessageResponseDto> {
    const res = await this.userService.createUser(userDto);
    if (res) return { message: 'User created successfully' };
    return { message: 'User creation failed' };
  }

  @Get('findAll')
  public async findAll(): Promise<GetUserDto[]> {
    return await this.userService.findAll();
  }
}
