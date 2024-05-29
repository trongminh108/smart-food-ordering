import { VouchersProductsService } from './../vouchers_products/vouchers_products.service';
import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { VoucherService } from './voucher.service';
import { CreateVoucherInput, UpdateVoucherInput } from 'src/graphql';

@Resolver('Voucher')
export class VoucherResolver {
  constructor(
    private readonly voucherService: VoucherService,
    private readonly vouchersProductsService: VouchersProductsService,
  ) {}

  @Mutation('createVoucher')
  create(@Args('createVoucherInput') createVoucherInput: CreateVoucherInput) {
    return this.voucherService.create(createVoucherInput);
  }

  @Query('vouchers')
  findAll() {
    return this.voucherService.findAll();
  }

  @Query('vouchersByAgentID')
  vouchersByAgentID(@Args('id_agent') id_agent) {
    return this.voucherService.findAll({ id_agent: id_agent });
  }

  @Query('voucher')
  findOne(@Args('id') id: string) {
    return this.voucherService.findOne(id);
  }

  @Mutation('updateVoucher')
  update(@Args('updateVoucherInput') updateVoucherInput: UpdateVoucherInput) {
    return this.voucherService.update(updateVoucherInput);
  }

  @Mutation('removeVoucher')
  remove(@Args('id') id: string) {
    return this.voucherService.remove(id);
  }

  @ResolveField('vouchers_products')
  async vouchers_products(@Parent() voucher) {
    return await this.vouchersProductsService.findAll({
      id_voucher: voucher.id,
    });
  }
}
