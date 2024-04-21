import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateAgentInput, UpdateAgentInput } from 'src/graphql';
import { AGENT } from './agent.schema';
import { Model } from 'mongoose';

@Injectable()
export class AgentService {
  constructor(
    @InjectModel(AGENT.name) private readonly agentModel: Model<AGENT>,
  ) {}

  async create(createAgentInput: CreateAgentInput) {
    return await new this.agentModel(createAgentInput).save();
  }

  async findAll(condition = {}) {
    return await this.agentModel.find(condition);
  }

  async findOne(id: string) {
    return await this.agentModel.findById(id);
  }

  async findOneByUserID(id: string) {
    const res = await this.agentModel.findOne({ id_user: id });
    return res || null;
  }

  async update(updateAgentInput: UpdateAgentInput) {
    const { id, ...updateData } = updateAgentInput;
    await this.agentModel.findByIdAndUpdate(id, updateData);
    return await this.agentModel.findById(id);
  }

  async remove(id: string) {
    return await this.agentModel.findByIdAndDelete(id);
  }
}
