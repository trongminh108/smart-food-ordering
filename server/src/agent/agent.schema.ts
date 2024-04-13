import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'AGENTS' })
export class AGENT {
  @Prop()
  id_user: string;

  @Prop()
  name: string;

  @Prop()
  address: string;

  @Prop()
  position: number[];

  @Prop()
  avatar: string;

  @Prop()
  images: string[];

  @Prop()
  phone_number: string;

  @Prop()
  rating: number;

  @Prop()
  comments_quantity: number;
}

export const AgentSchema = SchemaFactory.createForClass(AGENT);
