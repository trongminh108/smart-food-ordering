import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentResolver } from './comment.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { COMMENT, CommentSchema } from './comment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: COMMENT.name, schema: CommentSchema }]),
  ],
  providers: [CommentResolver, CommentService],
})
export class CommentModule {}
