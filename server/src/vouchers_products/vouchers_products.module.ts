import { Module } from '@nestjs/common';
import { VouchersProductsService } from './vouchers_products.service';
import { VouchersProductsResolver } from './vouchers_products.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import {
  VOUCHERS_PRODUCTS,
  VouchersProductsSchema,
} from './vouchers_products.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: VOUCHERS_PRODUCTS.name, schema: VouchersProductsSchema },
    ]),
  ],
  providers: [VouchersProductsResolver, VouchersProductsService],
  exports: [VouchersProductsService, VouchersProductsResolver],
})
export class VouchersProductsModule {}
