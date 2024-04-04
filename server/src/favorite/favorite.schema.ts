import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'FAVORITES' })
export class FAVORITE {
  @Prop()
  id_user: string;
  @Prop()
  id_product: string;
  @Prop()
  id_agent: string;
  @Prop()
  create_at: string;
}

export const FavoriteSchema = SchemaFactory.createForClass(FAVORITE);
