import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DoctorDocument = Doctor & Document;

@Schema()
export class Doctor {

  @Prop()
  name: string;

  @Prop()
  specialization: string;

  @Prop()
  experience: number;

  @Prop()
  rating: number;

  @Prop({ type: [String], default: ['online', 'offline'] })
  consultationModes: string[];

  @Prop()
  photoUrl: string;

  @Prop({ type: [String] })
  qualifications: string[];
}

export const DoctorSchema = SchemaFactory.createForClass(Doctor);
