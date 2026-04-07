// Import required decorators
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

// Define controller
@Controller()
export class AppController {

  constructor(private readonly appService: AppService) {}

  // Root API: http://localhost:3000/
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
