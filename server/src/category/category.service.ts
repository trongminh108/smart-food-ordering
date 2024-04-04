import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCategoryInput, UpdateCategoryInput } from 'src/graphql';
import { CATEGORY } from './category.schema';
import { Model } from 'mongoose';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(CATEGORY.name) private readonly categoryModel: Model<CATEGORY>,
  ) {}

  async create(createCategoryInput: CreateCategoryInput) {
    return await new this.categoryModel(createCategoryInput).save();
  }

  async findAll(condition = {}) {
    return await this.categoryModel.find(condition);
  }

  async findOne(id: string) {
    return await this.categoryModel.findById(id);
  }

  async update(updateCategoryInput: UpdateCategoryInput) {
    const { id, ...updateData } = updateCategoryInput;
    await this.categoryModel.findByIdAndUpdate(id, updateData);
    return await this.categoryModel.findById(id);
  }

  async remove(id: string) {
    return await this.categoryModel.findByIdAndDelete(id);
  }
}
