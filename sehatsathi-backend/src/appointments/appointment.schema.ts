// Import required decorators
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';

// Define type for Appointment document
export type AppointmentDocument = Appointment & Document;

// Define schema
@Schema()
export class Appointment {

  // ID of user booking appointment
  @Prop()
  userId: string;

  // Reference to Doctor collection
  @Prop({ type: Types.ObjectId, ref: 'Doctor' })
  doctorId: Types.ObjectId;

  // Appointment date (YYYY-MM-DD)
  @Prop()
  date: string;

  // Time slot (e.g., "10:00 AM")
  @Prop()
  timeSlot: string;

  // Online or Offline Consultation
  @Prop({ default: 'online' })
  consultationType: string;

  // Optional link for video call
  @Prop()
  meetingLink: string;

  // Status of appointment
  @Prop({ default: 'booked' })
  status: string;
}

// Create schema
export const AppointmentSchema = SchemaFactory.createForClass(Appointment);

// Add unique compound index to prevent double booking on the same slot
AppointmentSchema.index({ doctorId: 1, date: 1, timeSlot: 1, consultationType: 1 }, { unique: true });
