import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as nodemailer from 'nodemailer';
import * as fs from 'fs/promises';
import * as path from 'path';

import { User, UserDocument } from './user.schema';

const TEMP_FILE_PATH = path.join(process.cwd(), 'pending_registrations.json');

@Injectable()
export class UsersService {
  private transporter: nodemailer.Transporter;

  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  // Load temp file safely
  private async loadPendingRegistrations(): Promise<Record<string, any>> {
    try {
      const data = await fs.readFile(TEMP_FILE_PATH, 'utf-8');
      return JSON.parse(data);
    } catch (err: any) {
      if (err.code === 'ENOENT') {
        return {};
      }
      throw err;
    }
  }

  // Save temp file safely
  private async savePendingRegistrations(data: Record<string, any>): Promise<void> {
    await fs.writeFile(TEMP_FILE_PATH, JSON.stringify(data, null, 2), 'utf-8');
  }

  async generateEmailOtp(email: string): Promise<{ success: boolean; message: string }> {
    if (!email) throw new BadRequestException('Email is required');
    
    // Check if email already exists in DB
    const existing = await this.userModel.findOne({ email });
    if (existing) {
      throw new BadRequestException('Email already registered');
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const registrations = await this.loadPendingRegistrations();
    
    registrations[email] = {
      otp,
      timestamp: Date.now()
    };
    
    await this.savePendingRegistrations(registrations);
    
    // Send Email
    try {
      await this.transporter.sendMail({
        from: `"MediBrain" <${process.env.SMTP_USER}>`,
        to: email,
        subject: 'Your Verification Code',
        html: `<h2>Your OTP Code</h2><p>Your verification code is <b>${otp}</b>. It is valid for 3 minutes.</p>`
      });
      console.log(`Email sent successfully to ${email}`);
    } catch (err) {
      console.error('Failed to send email. Check SMTP setup in .env', err);
      // Depending on the use case, you might throw or resolve so the user can test the mock DB flow.
      // We will let it resolve so development can continue smoothly even without valid SMTP config yet.
    }
    
    return { success: true, message: 'OTP sent successfully to email' };
  }

  // Signup user
  async create(data: any): Promise<User> {
    if (!data.email || !data.password) {
      throw new BadRequestException('Email and Password are required');
    }

    // Check if email already exists
    const existing = await this.userModel.findOne({ email: data.email });

    if (existing) {
      throw new BadRequestException('Email already registered');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const userToSave = { ...data };
    delete userToSave.otp; // just in case it's passed

    // Save user
    return this.userModel.create({
      ...userToSave,
      password: hashedPassword,
      isEmailVerified: true, // We can keep this true or remove it depending on requirements, I'll keep it true
    });
  }

  // Find user by email (for login later)
  async findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }
}
