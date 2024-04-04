import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'PRODUCTS' })
export class PRODUCT {
  @Prop()
  id_category: string;

  @Prop()
  id_agent: string;

  @Prop()
  name: string;

  @Prop()
  images: Array<string>;

  @Prop()
  description: string;

  @Prop()
  price: number;

  @Prop()
  rating: number;
}

export const ProductSchema = SchemaFactory.createForClass(PRODUCT);
