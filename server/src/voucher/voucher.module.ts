import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { VoucherService } from './voucher.service';
import { VoucherResolver } from './voucher.resolver';
import { VOUCHER, VoucherSchema } from './voucher.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: VOUCHER.name, schema: VoucherSchema }]),
  ],
  providers: [VoucherResolver, VoucherService],
})
export class VoucherModule {}
