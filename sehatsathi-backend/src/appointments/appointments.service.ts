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

    // Check if slot already booked (prevent double booking)
    const existing = await this.appointmentModel.findOne({
      doctorId: data.doctorId,
      date: data.date,
      timeSlot: data.timeSlot,
    });

    // If already booked → throw error
    if (existing) {
      throw new BadRequestException('Slot already booked');
    }

    // Otherwise create appointment
    return this.appointmentModel.create(data);
  }

  // Get all appointments
  async findAll(): Promise<Appointment[]> {
    return this.appointmentModel.find();
  }
}
