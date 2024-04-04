import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'PAYMENT_DETAILS' })
export class PAYMENT_DETAILS {
  @Prop()
  id_user: string;
  @Prop()
  id_order: string;
  @Prop()
  payment_method: string;
  id_transaction: string;
  @Prop()
  total_paid: number;
}

export const PaymentDetailsSchema =
  SchemaFactory.createForClass(PAYMENT_DETAILS);
