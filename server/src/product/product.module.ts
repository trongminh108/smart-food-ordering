import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { PRODUCT, ProductSchema } from './product.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: PRODUCT.name, schema: ProductSchema }]),
  ],
  providers: [ProductResolver, ProductService],
})
export class ProductModule {}
