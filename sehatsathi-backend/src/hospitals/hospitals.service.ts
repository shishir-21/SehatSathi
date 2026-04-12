import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Hospital, HospitalDocument } from './hospital.schema';

@Injectable()
export class HospitalsService {
  constructor(
    @InjectModel(Hospital.name)
    private hospitalModel: Model<HospitalDocument>,
  ) {}

  async findAll(): Promise<Hospital[]> {
    return this.hospitalModel.find();
  }

  async findOne(id: string): Promise<Hospital> {
    const hospital = await this.hospitalModel.findById(id).exec();
    if (!hospital) throw new Error('Hospital not found');
    return hospital;
  }

  // Helper for test seeds
  async create(data: Partial<Hospital>): Promise<Hospital> {
    return this.hospitalModel.create(data);
  }

  // Count to ensure we don't over-seed
  async count(): Promise<number> {
    return this.hospitalModel.countDocuments();
  }
}
