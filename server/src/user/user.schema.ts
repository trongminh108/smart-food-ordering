import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'USERS' })
export class USER {
  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop()
  full_name: string;

  @Prop()
  gmail: string;

  @Prop()
  avatar: string;

  @Prop()
  phone_number: string;

  @Prop()
  current_address: string;

  @Prop()
  delivery_address: string;

  @Prop()
  position: number[];

  @Prop({ default: false }) // Mặc định là false
  is_agent: boolean;

  @Prop({ default: false }) // Mặc định là false
  is_deliver: boolean;

  @Prop()
  face_recognition: string;
}

export const UserSchema = SchemaFactory.createForClass(USER);
