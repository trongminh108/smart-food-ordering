import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { DeliverService } from './deliver.service';
import { CreateDeliverInput, UpdateDeliverInput } from 'src/graphql';

@Resolver('Deliver')
export class DeliverResolver {
  constructor(private readonly deliverService: DeliverService) {}

  @Mutation('createDeliver')
  create(@Args('createDeliverInput') createDeliverInput: CreateDeliverInput) {
    return this.deliverService.create(createDeliverInput);
  }

  @Query('delivers')
  findAll() {
    return this.deliverService.findAll();
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
}
