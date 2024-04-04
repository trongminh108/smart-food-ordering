import { Module } from '@nestjs/common';
import { PaymentDetailsService } from './payment_details.service';
import { PaymentDetailsResolver } from './payment_details.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PAYMENT_DETAILS,
  PaymentDetailsSchema,
} from './payment_details.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PAYMENT_DETAILS.name, schema: PaymentDetailsSchema },
    ]),
  ],
  providers: [PaymentDetailsResolver, PaymentDetailsService],
})
export class PaymentDetailsModule {}
