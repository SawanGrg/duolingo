import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { MessageResponseDto } from 'src/common/messageResponse.dto';
import { UserService } from './user.service';
import { GetUserDto } from './dto/getUser.dto';
import { RoleGuard } from 'src/common/guards/role.guard';
import { RequiredPermissions } from 'src/common/decorators/require.decorator';

@Controller('users')
export default class UserController {
  constructor(private readonly userService: UserService) {
    this.userService = userService;
  }

  @Post('create')
  @UseGuards(RoleGuard)
  @RequiredPermissions('admin:createUser')
  public async createUser(
    @Body() userDto: CreateUserDto,
  ): Promise<MessageResponseDto> {
    const res = await this.userService.createUser(userDto);
    if (res) return { message: 'User created successfully' };
    return { message: 'User creation failed' };
  }

  @Get('findAll')
  @UseGuards(RoleGuard)
  @RequiredPermissions('admin:viewUsers')
  public async findAll(): Promise<GetUserDto[]> {
    return await this.userService.findAll();
  }
}
