import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CommentService } from './comment.service';
import { CreateCommentInput, UpdateCommentInput } from 'src/graphql';

@Resolver('Comment')
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  @Mutation('createComment')
  create(@Args('createCommentInput') createCommentInput: CreateCommentInput) {
    return this.commentService.create(createCommentInput);
  }

  @Query('comments')
  findAll() {
    return this.commentService.findAll();
  }

  @Query('comment')
  findOne(@Args('id') id: string) {
    return this.commentService.findOne(id);
  }

  @Mutation('updateComment')
  update(@Args('updateCommentInput') updateCommentInput: UpdateCommentInput) {
    return this.commentService.update(updateCommentInput);
  }

  @Mutation('removeComment')
  remove(@Args('id') id: string) {
    return this.commentService.remove(id);
  }
}
