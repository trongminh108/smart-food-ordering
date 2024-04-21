import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserInput, UpdateUserInput } from 'src/graphql';
import { AgentService } from 'src/agent/agent.service';

@Resolver('User')
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly agentService: AgentService,
  ) {}

  @Mutation('createUser')
  create(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @Query('users')
  findAll() {
    return this.userService.findAll();
  }

  @Query('user')
  findOne(@Args('id') id: string) {
    return this.userService.findOne(id);
  }

  @Query('userByUsername')
  findOneByUsername(@Args('username') username: string) {
    return this.userService.findByUsername(username);
  }

  @Query('userByGmail')
  findOneByGmail(@Args('gmail') gmail: string) {
    return this.userService.findByGmail(gmail);
  }

  @Mutation('updateUser')
  update(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput);
  }

  @Mutation('removeUser')
  remove(@Args('id') id: string) {
    return this.userService.remove(id);
  }

  @ResolveField('agent')
  async agent(@Parent() user) {
    return await this.agentService.findOneByUserID(user.id);
  }
}
