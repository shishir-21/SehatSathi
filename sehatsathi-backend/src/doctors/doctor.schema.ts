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
}

export const DoctorSchema = SchemaFactory.createForClass(Doctor);
