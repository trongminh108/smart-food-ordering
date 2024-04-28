import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { STATUS_DRAFT } from 'src/constants';

@Schema({ collection: 'ORDERS', timestamps: true })
export class ORDER {
  @Prop({ default: null })
  id_agent: string;

  @Prop({ default: null })
  id_deliver: string;

  @Prop({ default: null })
  id_user: string;

  @Prop({ default: null })
  recipient: string;

  @Prop({ default: null })
  phone_number: string;

  @Prop({ default: null })
  position: number[];

  @Prop({ default: null })
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

  @Prop({ default: '' })
  message: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;

  @Prop({ default: STATUS_DRAFT })
  status: string;
}

export const OrderSchema = SchemaFactory.createForClass(ORDER);
