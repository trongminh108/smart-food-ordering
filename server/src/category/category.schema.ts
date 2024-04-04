import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'CATEGORIES' })
export class CATEGORY {
  @Prop()
  name: string;
}

export const CategorySchema = SchemaFactory.createForClass(CATEGORY);
