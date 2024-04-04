import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateProductInput, UpdateProductInput } from 'src/graphql';
import { PRODUCT } from './product.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(PRODUCT.name) private readonly productModel: Model<PRODUCT>,
  ) {}

  async create(createProductInput: CreateProductInput) {
    return await new this.productModel(createProductInput).save();
  }

  async findAll(condition = {}) {
    return await this.productModel.find(condition);
  }

  async findOne(id: string) {
    return await this.productModel.findById(id);
  }

  async update(updateProductInput: UpdateProductInput) {
    const { id, ...updateData } = updateProductInput;
    await this.productModel.findByIdAndUpdate(id, updateData);
    return await this.productModel.findById(id);
  }

  async remove(id: string) {
    return await this.productModel.findByIdAndDelete(id);
  }
}
