import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateOrderDetailInput, UpdateOrderDetailInput } from 'src/graphql';
import { ORDER_DETAILS } from './order_details.schema';
import { Model } from 'mongoose';

@Injectable()
export class OrderDetailsService {
  constructor(
    @InjectModel(ORDER_DETAILS.name)
    private readonly orderDetailsModel: Model<ORDER_DETAILS>,
  ) {}

  async create(createOrderDetailInput: CreateOrderDetailInput) {
    return await new this.orderDetailsModel(createOrderDetailInput).save();
  }

  async findAll(condition = {}) {
    return await this.orderDetailsModel.find(condition);
  }

  async findOne(id: string) {
    return await this.orderDetailsModel.findById(id);
  }

  async update(updateOrderDetailInput: UpdateOrderDetailInput) {
    const { id, ...updateData } = updateOrderDetailInput;
    await this.orderDetailsModel.findByIdAndUpdate(id, updateData);
    return await this.orderDetailsModel.findById(id);
  }

  async remove(id: string) {
    return await this.orderDetailsModel.findByIdAndDelete(id);
  }

  async removeAllData() {
    return await this.orderDetailsModel.deleteMany();
  }
}
