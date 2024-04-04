import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { CreateCategoryInput, UpdateCategoryInput } from 'src/graphql';

@Resolver('Category')
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Mutation('createCategory')
  create(
    @Args('createCategoryInput') createCategoryInput: CreateCategoryInput,
  ) {
    return this.categoryService.create(createCategoryInput);
  }

  @Query('categories')
  findAll() {
    return this.categoryService.findAll();
  }

  @Query('category')
  findOne(@Args('id') id: string) {
    return this.categoryService.findOne(id);
  }

  @Mutation('updateCategory')
  update(
    @Args('updateCategoryInput') updateCategoryInput: UpdateCategoryInput,
  ) {
    return this.categoryService.update(updateCategoryInput);
  }

  @Mutation('removeCategory')
  remove(@Args('id') id: string) {
    return this.categoryService.remove(id);
  }
}
