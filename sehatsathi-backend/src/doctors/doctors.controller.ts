// Import required decorators
import { Controller, Get, Post, Body } from '@nestjs/common';

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
  async getDoctors() {
    return this.doctorsService.findAll();
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
