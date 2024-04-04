import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  CreateVouchersProductInput,
  UpdateVouchersProductInput,
} from 'src/graphql';
import { VOUCHERS_PRODUCTS } from './vouchers_products.schema';
import { Model } from 'mongoose';

@Injectable()
export class VouchersProductsService {
  constructor(
    @InjectModel(VOUCHERS_PRODUCTS.name)
    private readonly vouchersProductsModel: Model<VOUCHERS_PRODUCTS>,
  ) {}

  async create(createVouchersProductInput: CreateVouchersProductInput) {
    return await new this.vouchersProductsModel(
      createVouchersProductInput,
    ).save();
  }

  async findAll(condition = {}) {
    return await this.vouchersProductsModel.find(condition);
  }

  async findOne(id: string) {
    return await this.vouchersProductsModel.findById(id);
  }

  async update(updateVouchersProductInput: UpdateVouchersProductInput) {
    const { id, ...updateData } = updateVouchersProductInput;
    await this.vouchersProductsModel.findByIdAndUpdate(id, updateData);
    return this.vouchersProductsModel.findById(id);
  }

  async remove(id: string) {
    return await this.vouchersProductsModel.findByIdAndDelete(id);
  }
}
