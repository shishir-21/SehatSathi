// Import required modules
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Doctor, DoctorDocument } from './doctor.schema';

// Service handles business logic
@Injectable()
export class DoctorsService {

  // Inject Doctor model
  constructor(
    @InjectModel(Doctor.name)
    private doctorModel: Model<DoctorDocument>,
  ) {}

  // Get all doctors from database
  async findAll(): Promise<Doctor[]> {
    return this.doctorModel.find();
  }

  // Create a new doctor (we’ll use this soon)
  async create(data: Partial<Doctor>): Promise<Doctor> {
    return this.doctorModel.create(data);
  }
}
