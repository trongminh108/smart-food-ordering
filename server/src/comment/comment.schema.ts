import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'COMMENTS' })
export class COMMENT {
  @Prop()
  id_reviewer: string;

  @Prop()
  id_object: string;

  @Prop()
  comment_content: string;

  @Prop()
  rating: number;
}

export const CommentSchema = SchemaFactory.createForClass(COMMENT);
