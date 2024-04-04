import { USER } from './user.schema';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserInput, UpdateUserInput } from 'src/graphql';

@Injectable()
export class UserService {
  constructor(@InjectModel(USER.name) private userModel: Model<USER>) {}

  async create(createUserInput: CreateUserInput) {
    return await new this.userModel(createUserInput).save();
  }

  async findAll(condition = {}) {
    return await this.userModel.find(condition);
  }

  async findOne(id: string) {
    return await this.userModel.findById(id);
  }

  async update(updateUserInput: UpdateUserInput) {
    const { id, ...updateUserData } = updateUserInput;
    await this.userModel.findByIdAndUpdate(id, updateUserData);
    return await this.userModel.findById(id);
  }

  async remove(id: string) {
    return await this.userModel.findByIdAndDelete(id);
  }
}