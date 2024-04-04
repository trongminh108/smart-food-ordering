import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCommentInput, UpdateCommentInput } from 'src/graphql';
import { COMMENT } from './comment.schema';
import { Model } from 'mongoose';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(COMMENT.name) private readonly commentModel: Model<COMMENT>,
  ) {}

  async create(createCommentInput: CreateCommentInput) {
    return await new this.commentModel(createCommentInput).save();
  }

  async findAll(condition = {}) {
    return await this.commentModel.find(condition);
  }

  async findOne(id: string) {
    return await this.commentModel.findById(id);
  }

  async update(updateCommentInput: UpdateCommentInput) {
    const { id, ...updateData } = updateCommentInput;
    await this.commentModel.findByIdAndUpdate(id, updateData);
    return await this.commentModel.findById(id);
  }

  async remove(id: string) {
    return await this.commentModel.findByIdAndDelete(id);
  }
}
