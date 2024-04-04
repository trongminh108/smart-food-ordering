import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { VoucherService } from './voucher.service';
import { CreateVoucherInput, UpdateVoucherInput } from 'src/graphql';

@Resolver('Voucher')
export class VoucherResolver {
  constructor(private readonly voucherService: VoucherService) {}

  @Mutation('createVoucher')
  create(@Args('createVoucherInput') createVoucherInput: CreateVoucherInput) {
    return this.voucherService.create(createVoucherInput);
  }

  @Query('vouchers')
  findAll() {
    return this.voucherService.findAll();
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
}
