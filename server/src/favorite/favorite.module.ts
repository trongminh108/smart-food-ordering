import { Module } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { FavoriteResolver } from './favorite.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { FAVORITE, FavoriteSchema } from './favorite.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FAVORITE.name, schema: FavoriteSchema },
    ]),
  ],
  providers: [FavoriteResolver, FavoriteService],
})
export class FavoriteModule {}
