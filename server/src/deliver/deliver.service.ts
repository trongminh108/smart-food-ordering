import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateDeliverInput, UpdateDeliverInput } from 'src/graphql';
import { DELIVER } from './deliver.schema';
import { Model } from 'mongoose';

@Injectable()
export class DeliverService {
  constructor(
    @InjectModel(DELIVER.name) private readonly deliverModel: Model<DELIVER>,
  ) {}

  async create(createDeliverInput: CreateDeliverInput) {
    return await new this.deliverModel(createDeliverInput).save();
  }

  async findAll(condition = {}) {
    return await this.deliverModel.find(condition);
  }

  async findOne(id: string) {
    return await this.deliverModel.findById(id);
  }

  async findOneByUserID(id_user: string) {
    return await this.deliverModel.findOne({ id_user: id_user });
  }

  async update(updateDeliverInput: UpdateDeliverInput) {
    const { id, ...updateData } = updateDeliverInput;
    await this.deliverModel.findByIdAndUpdate(id, updateData);
    return this.deliverModel.findById(id);
  }

  async remove(id: string) {
    return await this.deliverModel.findByIdAndDelete(id);
  }
}
