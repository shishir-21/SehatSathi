import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { User, UserDocument } from './user.schema';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  // Signup user
  async create(data: any): Promise<User> {

    // Check if email already exists
    const existing = await this.userModel.findOne({ email: data.email });

    if (existing) {
      throw new BadRequestException('Email already registered');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Save user
    return this.userModel.create({
      ...data,
      password: hashedPassword,
    });
  }

  // Find user by email (for login later)
  async findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }
}
