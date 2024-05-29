import { Module, forwardRef } from '@nestjs/common';
import { DeliverService } from './deliver.service';
import { DeliverResolver } from './deliver.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { DELIVER, DeliverSchema } from './deliver.schema';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: DELIVER.name, schema: DeliverSchema }]),
    forwardRef(() => UserModule),
  ],
  providers: [DeliverResolver, DeliverService],
  exports: [DeliverService, DeliverResolver],
})
export class DeliverModule {}
