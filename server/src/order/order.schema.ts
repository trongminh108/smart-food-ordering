import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'ORDERS' })
export class ORDER {
  @Prop({ default: '' })
  id_agent: string;
  @Prop({ default: '' })
  id_deliver: string;
  @Prop({ default: '' })
  id_user: string;

  @Prop({ default: '' })
  recipient: string;

  @Prop({ default: '' })
  phone_number: string;
  @Prop({ default: '' })
  address: string;
  //km, display m if km < 1
  @Prop({ default: null })
  distance: number;
  @Prop({ default: 0 })
  delivery_fee: number;
  @Prop({ default: 0 })
  discount: number;
  @Prop({ default: 0 })
  total_quantity: number;
  @Prop({ default: 0 })
  total_price: number;
  @Prop({ default: 'PENDING' })
  status: string;
}

export const OrderSchema = SchemaFactory.createForClass(ORDER);
