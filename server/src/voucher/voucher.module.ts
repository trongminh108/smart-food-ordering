import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { VoucherService } from './voucher.service';
import { VoucherResolver } from './voucher.resolver';
import { VOUCHER, VoucherSchema } from './voucher.schema';
import { VouchersProductsModule } from 'src/vouchers_products/vouchers_products.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: VOUCHER.name, schema: VoucherSchema }]),
    VouchersProductsModule,
  ],
  providers: [VoucherResolver, VoucherService],
})
export class VoucherModule {}
