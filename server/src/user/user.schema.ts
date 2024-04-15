import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'USERS' })
export class USER {
  @Prop({ required: true })
  username: string;

  @Prop()
  password: string;

  @Prop({
    default: function () {
      return this.username;
    },
  })
  full_name: string;

  @Prop()
  gmail: string;

  @Prop({ default: 'water.jpg' })
  avatar: string;

  @Prop({ default: '' })
  phone_number: string;

  @Prop({ default: '' })
  current_address: string;

  @Prop({ default: '' })
  delivery_address: string;

  @Prop({ default: [0, 0] })
  position: number[];

  @Prop({ default: false }) // Mặc định là false
  is_agent: boolean;

  @Prop({ default: false }) // Mặc định là false
  is_deliver: boolean;

  @Prop({ default: '' })
  face_recognition: string;
}

export const UserSchema = SchemaFactory.createForClass(USER);
