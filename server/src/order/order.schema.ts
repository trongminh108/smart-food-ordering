import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'ORDERS' })
export class ORDER {
  @Prop()
  id_agent: string;
  @Prop()
  id_deliver: string;
  @Prop()
  id_user: string;
  @Prop()
  address: string;
  //km, display m if km < 1
  @Prop()
  distance: number;
  @Prop()
  delivery_fee: number;
  @Prop()
  discount: number;
  @Prop()
  total_price: number;
}

export const OrderSchema = SchemaFactory.createForClass(ORDER);
