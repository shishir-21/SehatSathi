// Import decorators
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Type for document
export type UserDocument = User & Document;

// Define schema
@Schema()
export class User {

  // User name
  @Prop()
  name: string;

  // Email (should be unique later)
  @Prop()
  email: string;

  // Hashed password
  @Prop()
  password: string;

  // Phone number
  @Prop()
  phone?: string;

  @Prop({ default: false })
  isPhoneVerified?: boolean;
}

// Create schema
export const UserSchema = SchemaFactory.createForClass(User);
