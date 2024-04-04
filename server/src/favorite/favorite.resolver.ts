import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { FavoriteService } from './favorite.service';
import { CreateFavoriteInput, UpdateFavoriteInput } from 'src/graphql';

@Resolver('Favorite')
export class FavoriteResolver {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Mutation('createFavorite')
  create(
    @Args('createFavoriteInput') createFavoriteInput: CreateFavoriteInput,
  ) {
    return this.favoriteService.create(createFavoriteInput);
  }

  @Query('favorites')
  findAll() {
    return this.favoriteService.findAll();
  }

  @Query('favorite')
  findOne(@Args('id') id: string) {
    return this.favoriteService.findOne(id);
  }

  @Mutation('updateFavorite')
  update(
    @Args('updateFavoriteInput') updateFavoriteInput: UpdateFavoriteInput,
  ) {
    return this.favoriteService.update(updateFavoriteInput);
  }

  @Mutation('removeFavorite')
  remove(@Args('id') id: string) {
    return this.favoriteService.remove(id);
  }
}
