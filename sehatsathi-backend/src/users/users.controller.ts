import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

  constructor(private readonly usersService: UsersService) {}

  @Post('generate-otp')
  async generateOtp(@Body() body: { email: string }) {
    if (!body.email) throw new BadRequestException('Email is required');
    return this.usersService.generateEmailOtp(body.email);
  }

  // POST /users/signup
  @Post('signup')
  async signup(@Body() body: any) {
    return this.usersService.create(body);
  }
}
