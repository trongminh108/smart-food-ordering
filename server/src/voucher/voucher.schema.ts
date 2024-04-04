import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'VOUCHERS' })
export class VOUCHER {
  @Prop()
  id: string;
  @Prop()
  id_agent: string;
  @Prop()
  code: string;
  @Prop()
  from: string;
  @Prop()
  to: string;
  @Prop()
  discount: number;
  @Prop()
  is_percentage: boolean;
  @Prop()
  is_valid: boolean;
  @Prop()
  is_all_products: boolean;
  @Prop()
  usage_limit: number;
}

export const VoucherSchema = SchemaFactory.createForClass(VOUCHER);
