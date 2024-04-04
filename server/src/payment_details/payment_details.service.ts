import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  CreatePaymentDetailInput,
  UpdatePaymentDetailInput,
} from 'src/graphql';
import { PAYMENT_DETAILS } from './payment_details.schema';
import { Model } from 'mongoose';

@Injectable()
export class PaymentDetailsService {
  constructor(
    @InjectModel(PAYMENT_DETAILS.name)
    private readonly paymentDetailsModel: Model<PAYMENT_DETAILS>,
  ) {}

  async create(createPaymentDetailInput: CreatePaymentDetailInput) {
    return await new this.paymentDetailsModel(createPaymentDetailInput).save();
  }

  async findAll(condition = {}) {
    return await this.paymentDetailsModel.find(condition);
  }

  async findOne(id: string) {
    return await this.paymentDetailsModel.findById(id);
  }

  async update(updatePaymentDetailInput: UpdatePaymentDetailInput) {
    const { id, ...updateData } = updatePaymentDetailInput;
    await this.paymentDetailsModel.findByIdAndUpdate(id, updateData);
    return await this.paymentDetailsModel.findById(id);
  }

  async remove(id: string) {
    return await this.paymentDetailsModel.findByIdAndDelete(id);
  }
}
