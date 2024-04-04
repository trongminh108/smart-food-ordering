import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PaymentDetailsService } from './payment_details.service';
import {
  CreatePaymentDetailInput,
  UpdatePaymentDetailInput,
} from 'src/graphql';

@Resolver('PaymentDetail')
export class PaymentDetailsResolver {
  constructor(private readonly paymentDetailsService: PaymentDetailsService) {}

  @Mutation('createPaymentDetail')
  create(
    @Args('createPaymentDetailInput')
    createPaymentDetailInput: CreatePaymentDetailInput,
  ) {
    return this.paymentDetailsService.create(createPaymentDetailInput);
  }

  @Query('paymentDetails')
  findAll() {
    return this.paymentDetailsService.findAll();
  }

  @Query('paymentDetail')
  findOne(@Args('id') id: string) {
    return this.paymentDetailsService.findOne(id);
  }

  @Mutation('updatePaymentDetail')
  update(
    @Args('updatePaymentDetailInput')
    updatePaymentDetailInput: UpdatePaymentDetailInput,
  ) {
    return this.paymentDetailsService.update(updatePaymentDetailInput);
  }

  @Mutation('removePaymentDetail')
  remove(@Args('id') id: string) {
    return this.paymentDetailsService.remove(id);
  }
}
