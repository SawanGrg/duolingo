import { Controller, Get } from '@nestjs/common';

@Controller('users')
export default class UserController {
  // User-related endpoints will be defined here
  constructor() {}

  // Define user-related endpoints here
  @Get('test')
  testEndpoint() {
    return { message: 'User endpoint is working!f fine' };
  }
}
