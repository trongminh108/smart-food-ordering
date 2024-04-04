import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { VouchersProductsService } from './vouchers_products.service';
import {
  CreateVouchersProductInput,
  UpdateVouchersProductInput,
} from 'src/graphql';

@Resolver('VouchersProduct')
export class VouchersProductsResolver {
  constructor(
    private readonly vouchersProductsService: VouchersProductsService,
  ) {}

  @Mutation('createVouchersProduct')
  create(
    @Args('createVouchersProductInput')
    createVouchersProductInput: CreateVouchersProductInput,
  ) {
    return this.vouchersProductsService.create(createVouchersProductInput);
  }

  @Query('vouchersProducts')
  findAll() {
    return this.vouchersProductsService.findAll();
  }

  @Query('vouchersProduct')
  findOne(@Args('id') id: string) {
    return this.vouchersProductsService.findOne(id);
  }

  @Mutation('updateVouchersProduct')
  update(
    @Args('updateVouchersProductInput')
    updateVouchersProductInput: UpdateVouchersProductInput,
  ) {
    return this.vouchersProductsService.update(updateVouchersProductInput);
  }

  @Mutation('removeVouchersProduct')
  remove(@Args('id') id: string) {
    return this.vouchersProductsService.remove(id);
  }
}
