import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { OpenStreetMapService } from './open_street_map.service';
import { Position, PositionInput } from 'src/graphql';

@Resolver('OpenStreetMap')
export class OpenStreetMapResolver {
  constructor(private readonly openStreetMapService: OpenStreetMapService) {}

  @Query('getAddressFromPosition')
  getAddressFromPosition(@Args('latlng') latlng: PositionInput) {
    return this.openStreetMapService.getAddressFromPosition(latlng);
  }

  @Query('getDistanceDuration')
  getDistanceDuration(
    @Args('origin') origin: PositionInput,
    @Args('destination') destination: PositionInput,
  ) {
    return this.openStreetMapService.getDistanceDuration(origin, destination);
  }
}
