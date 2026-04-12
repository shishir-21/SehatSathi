import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

  constructor(private readonly usersService: UsersService) {}

  @Post('generate-otp')
  async generateOtp(@Body() body: { phone: string }) {
    if (!body.phone) throw new BadRequestException('Phone number required');
    // Mock OTP response
    return { success: true, message: 'OTP sent (Mock: 123456)' };
  }

  // POST /users/signup
  @Post('signup')
  async signup(@Body() body: any) {
    if (body.phone) {
      if (body.otp !== '123456') {
        throw new BadRequestException('Invalid Verification Code');
      }
      body.isPhoneVerified = true;
    }
    return this.usersService.create(body);
  }
}
