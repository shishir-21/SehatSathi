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

  // Get all doctors from database (optionally filtered by hospital)
  async findAll(hospitalId?: string): Promise<Doctor[]> {
    if (hospitalId) {
      return this.doctorModel.find({ hospitalId });
    }
    return this.doctorModel.find();
  }

  // Get a single doctor by ID
  async findOne(id: string): Promise<Doctor> {
    const doctor = await this.doctorModel.findById(id).exec();
    if (!doctor) {
        throw new Error('Doctor not found');
    }
    return doctor;
  }

  // Create a new doctor (we’ll use this soon)
  async create(data: Partial<Doctor>): Promise<Doctor> {
    return this.doctorModel.create(data);
  }
}
