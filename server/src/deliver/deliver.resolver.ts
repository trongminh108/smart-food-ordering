import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { DeliverService } from './deliver.service';
import { CreateDeliverInput, UpdateDeliverInput } from 'src/graphql';
import { UserService } from 'src/user/user.service';

@Resolver('Deliver')
export class DeliverResolver {
  constructor(
    private readonly deliverService: DeliverService,
    private readonly userService: UserService,
  ) {}

  @Mutation('createDeliver')
  create(@Args('createDeliverInput') createDeliverInput: CreateDeliverInput) {
    return this.deliverService.create(createDeliverInput);
  }

  @Query('delivers')
  findAll() {
    return this.deliverService.findAll();
  }

  @Query('deliversByAgentID')
  deliversByAgentID(@Args('id_agent') id) {
    return this.deliverService.findAll({ id_agent: id });
  }

  @Query('deliver')
  findOne(@Args('id') id: string) {
    return this.deliverService.findOne(id);
  }

  @Mutation('updateDeliver')
  update(@Args('updateDeliverInput') updateDeliverInput: UpdateDeliverInput) {
    return this.deliverService.update(updateDeliverInput);
  }

  @Mutation('removeDeliver')
  remove(@Args('id') id: string) {
    return this.deliverService.remove(id);
  }

  @ResolveField('user')
  async user(@Parent() deliver) {
    const user = await this.userService.findOne(deliver.id_user);
    return user;
  }
}
