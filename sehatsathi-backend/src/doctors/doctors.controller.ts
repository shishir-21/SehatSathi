// Import required decorators
import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';

// Import service (business logic layer)
import { DoctorsService } from './doctors.service';

// Define base route: /doctors
@Controller('doctors')
export class DoctorsController {

  // Inject DoctorsService
  constructor(private readonly doctorsService: DoctorsService) {}

  // GET /doctors
  // Fetch all doctors from database
  @Get()
  async getDoctors(@Query('hospitalId') hospitalId?: string) {
    return this.doctorsService.findAll(hospitalId);
  }

  // GET /doctors/:id
  // Fetch single doctor info
  @Get(':id')
  async getDoctor(@Param('id') id: string) {
    return this.doctorsService.findOne(id);
  }

  // POST /doctors
  // Create a new doctor in database
  @Post()
  async createDoctor(@Body() body: any) {

    // body contains data sent from Postman/frontend
    // Example: name, specialization, etc.
    return this.doctorsService.create(body);
  }
}
