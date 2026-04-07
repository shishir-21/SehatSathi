// Import NestJS module decorator
import { Module } from '@nestjs/common';

// Import Mongoose module
import { MongooseModule } from '@nestjs/mongoose';

// Import controller and service
import { DoctorsController } from './doctors.controller';
import { DoctorsService } from './doctors.service';

// Import Doctor schema
import { Doctor, DoctorSchema } from './doctor.schema';

// Define Doctors module
@Module({
  imports: [
    // Register Doctor schema with Mongoose
    MongooseModule.forFeature([
      { name: Doctor.name, schema: DoctorSchema },
    ]),
  ],
  controllers: [DoctorsController],
  providers: [DoctorsService],
})
export class DoctorsModule {}
