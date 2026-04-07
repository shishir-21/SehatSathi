// Import core NestJS module decorator
import { Module } from '@nestjs/common';

// Import main controller & service
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Import Doctors module (ONLY this, not service/controller directly)
import { DoctorsModule } from './doctors/doctors.module';

// Import MongoDB module
import { MongooseModule } from '@nestjs/mongoose';
import { AppointmentsModule } from './appointments/appointments.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

// Main module
@Module({
  imports: [
    // MongoDB connection
    MongooseModule.forRoot('mongodb://localhost:27017/sehatsathi'),

    // Register Doctors module
    DoctorsModule,

    AppointmentsModule,

    UsersModule,

    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
