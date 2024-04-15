import { Module } from '@nestjs/common';
import { GgMapApiService } from './gg_map_api.service';
import { GgMapApiResolver } from './gg_map_api.resolver';

@Module({
  providers: [GgMapApiResolver, GgMapApiService],
})
export class GgMapApiModule {}
