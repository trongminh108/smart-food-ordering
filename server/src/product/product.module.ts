import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { PRODUCT, ProductSchema } from './product.schema';
import { CategoryModule } from 'src/category/category.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: PRODUCT.name, schema: ProductSchema }]),
    CategoryModule,
  ],
  providers: [ProductResolver, ProductService],
  exports: [ProductService, ProductResolver],
})
export class ProductModule {}
