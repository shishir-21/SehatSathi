// Import decorators
import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';

// Import service
import { AppointmentsService } from './appointments.service';

// Import JWT guard (protect routes)
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

// Define route: /appointments
@Controller('appointments')
export class AppointmentsController {

  constructor(private readonly appointmentsService: AppointmentsService) {}

  // POST /appointments → Book appointment (PROTECTED)
  @UseGuards(JwtAuthGuard)
  @Post()
  async bookAppointment(@Request() req, @Body() body: any) {

    // Extract user from JWT token
    const user = req.user;

    // Create appointment with REAL userId
    return this.appointmentsService.create({
      ...body,
      userId: user.userId, // no more fake user
    });
  }

  // GET /appointments → Get all appointments (PROTECTED)
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAppointments() {
    return this.appointmentsService.findAll();
  }
}
