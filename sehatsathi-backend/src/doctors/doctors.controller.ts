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
    if (id === 'seed') return; // Handled by @Post('seed') just to prevent overlap if ever it gets called as GET
    return this.doctorsService.findOne(id);
  }

  // POST /doctors/seed (injects dummy professional data)
  @Post('seed')
  async seedDoctors() {
    const count = await this.doctorsService.count();
    if (count > 0) return { message: 'Doctors already seeded' };

    const dummyDoctors = [
      {
        name: 'Dr. Arjun Mehta',
        specialization: 'Cardiologist',
        experience: 15,
        rating: 4.9,
        consultationModes: ['online', 'offline'],
        photoUrl: '/images/doctors/doc1.png',
        qualifications: ['MBBS', 'MD - Cardiology'],
        hospitalId: 'default_hospital_1'
      },
      {
        name: 'Dr. Sarah Lin',
        specialization: 'Dermatologist',
        experience: 8,
        rating: 4.8,
        consultationModes: ['online'],
        photoUrl: '/images/doctors/doc2.png',
        qualifications: ['MBBS', 'MD - Dermatology'],
        hospitalId: 'default_hospital_1'
      },
      {
        name: 'Dr. James Peterson',
        specialization: 'Neurologist',
        experience: 22,
        rating: 4.9,
        consultationModes: ['offline'],
        photoUrl: '/images/doctors/doc3.png',
        qualifications: ['MBBS', 'DM - Neurology'],
        hospitalId: 'default_hospital_2'
      },
      {
        name: 'Dr. Amara Osei',
        specialization: 'Pediatrician',
        experience: 12,
        rating: 4.7,
        consultationModes: ['online', 'offline'],
        photoUrl: '/images/doctors/doc4.png',
        qualifications: ['MBBS', 'MD - Pediatrics'],
        hospitalId: 'default_hospital_2'
      }
    ];

    for (const d of dummyDoctors) {
      await this.doctorsService.create(d);
    }
    return { message: 'Seeded test doctors successfully!' };
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
