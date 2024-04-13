import { UserService } from './../user/user.service';
import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { OrderService } from './order.service';
import { CreateOrderInput, UpdateOrderInput } from 'src/graphql';
import { AgentService } from 'src/agent/agent.service';

@Resolver('Order')
export class OrderResolver {
  constructor(
    private readonly orderService: OrderService,
    private readonly agentService: AgentService,
    private readonly userService: UserService,
  ) {}

  @Mutation('createOrder')
  create(@Args('createOrderInput') createOrderInput: CreateOrderInput) {
    return this.orderService.create(createOrderInput);
  }

  @Query('orders')
  findAll() {
    return this.orderService.findAll();
  }

  @Query('order')
  findOne(@Args('id') id: string) {
    return this.orderService.findOne(id);
  }

  @Mutation('updateOrder')
  update(@Args('updateOrderInput') updateOrderInput: UpdateOrderInput) {
    return this.orderService.update(updateOrderInput);
  }

  @Mutation('removeOrder')
  remove(@Args('id') id: string) {
    return this.orderService.remove(id);
  }

  @ResolveField('agent')
  async agent(@Parent() order) {
    return await this.agentService.findOne(order.id_agent);
  }

  @ResolveField('user')
  async user(@Parent() order) {
    return await this.userService.findOne(order.id_user);
  }
}
