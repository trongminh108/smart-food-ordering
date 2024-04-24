import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'PRODUCTS' })
export class PRODUCT {
  @Prop({ default: null })
  id_category: string;

  @Prop({ default: null })
  id_agent: string;

  @Prop({ default: null })
  name: string;

  @Prop({ default: null })
  images: Array<string>;

  @Prop({ default: null })
  description: string;

  @Prop({ default: 0 })
  sold: number;

  @Prop({ default: 0 })
  price: number;

  @Prop({ default: 0 })
  rating: number;
}

export const ProductSchema = SchemaFactory.createForClass(PRODUCT);
