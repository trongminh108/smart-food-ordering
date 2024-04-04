import { Module } from '@nestjs/common';
import { VouchersProductsService } from './vouchers_products.service';
import { VouchersProductsResolver } from './vouchers_products.resolver';

@Module({
  providers: [VouchersProductsResolver, VouchersProductsService],
})
export class VouchersProductsModule {}
