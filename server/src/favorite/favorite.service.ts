import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateFavoriteInput, UpdateFavoriteInput } from 'src/graphql';
import { FAVORITE } from './favorite.schema';
import { Model } from 'mongoose';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectModel(FAVORITE.name) private readonly favoriteModel: Model<FAVORITE>,
  ) {}

  async create(createFavoriteInput: CreateFavoriteInput) {
    return await new this.favoriteModel(createFavoriteInput).save();
  }

  async findAll(condition = {}) {
    return await this.favoriteModel.find(condition);
  }

  async findOne(id: string) {
    return await this.favoriteModel.findById(id);
  }

  async update(updateFavoriteInput: UpdateFavoriteInput) {
    const { id, ...updateData } = updateFavoriteInput;
    await this.favoriteModel.findByIdAndUpdate(id, updateData);
    return this.favoriteModel.findById(id);
  }

  async remove(id: string) {
    return await this.favoriteModel.findByIdAndDelete(id);
  }
}
