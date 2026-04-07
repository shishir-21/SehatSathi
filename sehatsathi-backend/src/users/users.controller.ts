import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

  constructor(private readonly usersService: UsersService) {}

  // POST /users/signup
  @Post('signup')
  async signup(@Body() body: any) {
    return this.usersService.create(body);
  }
}
