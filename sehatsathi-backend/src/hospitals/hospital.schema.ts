import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type HospitalDocument = Hospital & Document;

@Schema({ timestamps: true })
export class Hospital {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  location: string;

  @Prop({ default: 0 })
  rating: number;

  @Prop()
  image: string;

  @Prop()
  description: string;
}

export const HospitalSchema = SchemaFactory.createForClass(Hospital);
