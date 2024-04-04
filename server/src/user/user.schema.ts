import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'USERS' })
export class USER {
  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop()
  face_recognition: string;
}

export const UserSchema = SchemaFactory.createForClass(USER);
