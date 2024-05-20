import { Module } from '@nestjs/common';
import { OpenStreetMapService } from './open_street_map.service';
import { OpenStreetMapResolver } from './open_street_map.resolver';

@Module({
  providers: [OpenStreetMapResolver, OpenStreetMapService],
})
export class OpenStreetMapModule {}
