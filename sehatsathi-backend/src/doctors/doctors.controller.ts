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
    // Clear existing doctors to ensure clean state with all categories
    await this.doctorsService.clearAll();

    const dummyDoctors = [
      {
        name: 'Dr. Ramesh Gupta',
        specialization: 'General Physician',
        experience: 20,
        rating: 4.8,
        consultationModes: ['online', 'offline'],
        photoUrl: '/images/doctors/doc1.png',
        qualifications: ['MBBS', 'MD - General Medicine'],
        hospitalId: 'default_hospital_1'
      },
      {
        name: 'Dr. Arjun Mehta',
        specialization: 'Cardiologist',
        experience: 15,
        rating: 4.9,
        consultationModes: ['online', 'offline'],
        photoUrl: '/images/doctors/doc3.png',
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
        name: 'Dr. Amara Osei',
        specialization: 'Pediatrician',
        experience: 12,
        rating: 4.7,
        consultationModes: ['online', 'offline'],
        photoUrl: '/images/doctors/doc4.png',
        qualifications: ['MBBS', 'MD - Pediatrics'],
        hospitalId: 'default_hospital_2'
      },
      {
        name: 'Dr. Priya Sharma',
        specialization: 'Gynecologist',
        experience: 18,
        rating: 4.9,
        consultationModes: ['offline'],
        photoUrl: '/images/doctors/doc2.png',
        qualifications: ['MBBS', 'MS - Obstetrics & Gynecology'],
        hospitalId: 'default_hospital_2'
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
        name: 'Dr. Vikram Singh',
        specialization: 'Psychiatrist',
        experience: 14,
        rating: 4.6,
        consultationModes: ['online', 'offline'],
        photoUrl: '/images/doctors/doc1.png',
        qualifications: ['MBBS', 'MD - Psychiatry'],
        hospitalId: 'default_hospital_3'
      },
      {
        name: 'Dr. Rahul Verma',
        specialization: 'Orthopedician',
        experience: 16,
        rating: 4.7,
        consultationModes: ['offline'],
        photoUrl: '/images/doctors/doc3.png',
        qualifications: ['MBBS', 'MS - Orthopedics'],
        hospitalId: 'default_hospital_3'
      },
      // Adding duplicates to show scrolling if needed
      {
        name: 'Dr. Anita Roy',
        specialization: 'General Physician',
        experience: 10,
        rating: 4.5,
        consultationModes: ['online', 'offline'],
        photoUrl: '/images/doctors/doc4.png',
        qualifications: ['MBBS'],
        hospitalId: 'default_hospital_3'
      },
      {
        name: 'Dr. Manish Jain',
        specialization: 'Dermatologist',
        experience: 5,
        rating: 4.4,
        consultationModes: ['online'],
        photoUrl: '/images/doctors/doc1.png',
        qualifications: ['MBBS', 'DDVL'],
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
