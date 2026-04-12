import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { HospitalsService } from './hospitals.service';

@Controller('hospitals')
export class HospitalsController {
  constructor(private readonly hospitalsService: HospitalsService) {}

  @Get()
  async getHospitals() {
    return this.hospitalsService.findAll();
  }

  // GET /hospitals/seed (injects dummy data as requested for MVP UI)
  @Post('seed')
  async seedHospitals() {
    const count = await this.hospitalsService.count();
    if (count > 0) return { message: 'Already seeded' };

    const dummyHospitals = [
      {
        name: 'Apollo Hospital',
        location: 'Delhi',
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80',
        description: 'Multi-speciality top tier hospital.'
      },
      {
        name: 'Fortis Healthcare',
        location: 'Mumbai',
        rating: 4.5,
        image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&q=80',
        description: 'State of the art technology.'
      },
      {
        name: 'Max Super Speciality',
        location: 'Bangalore',
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&q=80',
        description: 'Renowned for cardiovascular care.'
      }
    ];

    for (const h of dummyHospitals) {
      await this.hospitalsService.create(h);
    }
    return { message: 'Seeded Test Hospitals successfully!' };
  }

  @Get(':id')
  async getHospital(@Param('id') id: string) {
    return this.hospitalsService.findOne(id);
  }
}
