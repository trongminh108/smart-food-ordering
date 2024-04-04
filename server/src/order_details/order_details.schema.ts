import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'ORDER_DETAILS' })
export class ORDER_DETAILS {
  @Prop()
  id_order: string;
  @Prop()
  id_product: string;
  @Prop()
  quantity: number;
  @Prop()
  discount: number;
  @Prop()
  subtotal: number;
}

export const OrderDetailsSchema = SchemaFactory.createForClass(ORDER_DETAILS);
