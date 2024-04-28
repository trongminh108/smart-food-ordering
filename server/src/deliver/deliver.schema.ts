import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'DELIVERS' })
export class DELIVER {
  @Prop({ default: '' })
  id_user: string;

  @Prop({ default: '' })
  id_agent: string;

  @Prop({ default: '' })
  phone_number: string;

  @Prop({ default: 0 })
  rating: number;

  @Prop({ default: 0 })
  comments_quantity: number;
}

export const DeliverSchema = SchemaFactory.createForClass(DELIVER);
