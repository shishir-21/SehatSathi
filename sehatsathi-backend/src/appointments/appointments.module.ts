// Import module decorator
import { Module } from '@nestjs/common';

// Import Mongoose
import { MongooseModule } from '@nestjs/mongoose';

// Import controller & service
import { AppointmentsController } from './appointments.controller';
import { AppointmentsService } from './appointments.service';

// Import schema
import { Appointment, AppointmentSchema } from './appointment.schema';

@Module({
  imports: [
    // Register schema
    MongooseModule.forFeature([
      { name: Appointment.name, schema: AppointmentSchema },
    ]),
  ],
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
})
export class AppointmentsModule {}
