import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AgentService } from './agent.service';
import { CreateAgentInput, UpdateAgentInput } from 'src/graphql';

@Resolver('Agent')
export class AgentResolver {
  constructor(private readonly agentService: AgentService) {}

  @Mutation('createAgent')
  create(@Args('createAgentInput') createAgentInput: CreateAgentInput) {
    return this.agentService.create(createAgentInput);
  }

  @Query('agents')
  findAll() {
    return this.agentService.findAll();
  }

  @Query('agent')
  findOne(@Args('id') id: string) {
    return this.agentService.findOne(id);
  }

  @Query('agentByUserID')
  async agentByUserID(@Args('id') id: string) {
    return await this.agentService.findOneByUserID(id);
  }

  @Mutation('updateAgent')
  update(@Args('updateAgentInput') updateAgentInput: UpdateAgentInput) {
    return this.agentService.update(updateAgentInput);
  }

  @Mutation('removeAgent')
  remove(@Args('id') id: string) {
    return this.agentService.remove(id);
  }
}
