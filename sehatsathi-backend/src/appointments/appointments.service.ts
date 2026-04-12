// Import required decorators
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// Import schema
import { Appointment, AppointmentDocument } from './appointment.schema';

// Service handles business logic
@Injectable()
export class AppointmentsService {

  // Inject Appointment model
  constructor(
    @InjectModel(Appointment.name)
    private appointmentModel: Model<AppointmentDocument>,
  ) {}

  // Create new appointment
  async create(data: any): Promise<Appointment> {
    try {
      // Create appointment directly. The compound unique index atomically prevents double booking.
      return await this.appointmentModel.create(data);
    } catch (error: any) {
      // E11000 duplicate key error means the slot is taken
      if (error.code === 11000) {
        throw new BadRequestException('Slot already booked');
      }
      throw error;
    }
  }

  // Get all appointments
  async findAll(): Promise<Appointment[]> {
    return this.appointmentModel.find();
  }
}
