import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateVoucherInput, UpdateVoucherInput } from 'src/graphql';
import { VOUCHER } from './voucher.schema';
import { Model } from 'mongoose';

@Injectable()
export class VoucherService {
  constructor(
    @InjectModel(VOUCHER.name) private readonly voucherModel: Model<VOUCHER>,
  ) {}

  async create(createVoucherInput: CreateVoucherInput) {
    return await new this.voucherModel(createVoucherInput).save();
  }

  async findAll(condition = {}) {
    return await this.voucherModel.find(condition);
  }

  async findOne(id: string) {
    return await this.voucherModel.findById(id);
  }

  async update(updateVoucherInput: UpdateVoucherInput) {
    const { id, ...updateData } = updateVoucherInput;
    await this.voucherModel.findByIdAndUpdate(id, updateData);
    return await this.voucherModel.findById(id);
  }

  async remove(id: string) {
    return await this.voucherModel.findByIdAndDelete(id);
  }
}
