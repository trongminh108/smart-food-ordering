import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { GgMapApiService } from './gg_map_api.service';
import { LocationInput } from 'src/graphql';

@Resolver('GgMapApi')
export class GgMapApiResolver {
  constructor(private readonly ggMapApiService: GgMapApiService) {}

  @Query('getAddressFromLocation')
  getAddressFromLocation(@Args('location') location: LocationInput) {
    return this.ggMapApiService.getAddressFromLocation(location);
  }

  @Query('getDistanceBetweenLocation')
  getDistanceBetweenLocation(
    @Args('origins') origins: LocationInput,
    @Args('destinations') destinations: LocationInput,
  ) {
    return this.ggMapApiService.getDistanceBetweenLocation(
      origins,
      destinations,
    );
  }
}
