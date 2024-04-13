import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'DELIVERS' })
export class DELIVER {
  @Prop()
  id_user: string;

  @Prop()
  phone_number: string;

  @Prop()
  rating: number;

  @Prop()
  comments_quantity: number;
}

export const DeliverSchema = SchemaFactory.createForClass(DELIVER);
