import { Module } from '@nestjs/common';
import { DeliverService } from './deliver.service';
import { DeliverResolver } from './deliver.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { DELIVER, DeliverSchema } from './deliver.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: DELIVER.name, schema: DeliverSchema }]),
  ],
  providers: [DeliverResolver, DeliverService],
})
export class DeliverModule {}
