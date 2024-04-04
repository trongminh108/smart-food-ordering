import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'VOUCHERS_PRODUCTS' })
export class VOUCHERS_PRODUCTS {
  @Prop()
  id_voucher: string;
  @Prop()
  id_product: string;
}

export const VouchersProductsSchema =
  SchemaFactory.createForClass(VOUCHERS_PRODUCTS);
