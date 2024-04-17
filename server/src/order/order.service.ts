import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateOrderInput, UpdateOrderInput } from 'src/graphql';
import { ORDER } from './order.schema';
import { Model } from 'mongoose';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(ORDER.name) private readonly orderModel: Model<ORDER>,
  ) {}

  async create(createOrderInput: CreateOrderInput) {
    return await new this.orderModel(createOrderInput).save();
  }

  async findAll(condition = {}) {
    return await this.orderModel.find(condition);
  }

  async findOne(id: string) {
    return await this.orderModel.findById(id);
  }

  async findOneCondition(condition = {}) {
    return await this.orderModel.findOne(condition);
  }

  async update(updateOrderInput: UpdateOrderInput) {
    const { id, ...updateData } = updateOrderInput;
    await this.orderModel.findByIdAndUpdate(id, updateData);
    return await this.orderModel.findById(id);
  }

  async remove(id: string) {
    return await this.orderModel.findByIdAndDelete(id);
  }

  async removeAllData() {
    return await this.orderModel.deleteMany();
  }
}
