import { Injectable } from '@nestjs/common';
import axios from 'axios';
import {
  OPEN_STREET_MAP_DISTANCE_MATRIX_API,
  OPEN_STREET_MAP_REVERSE_GEOCODING_API,
} from 'src/constants';

import { Position } from 'src/graphql';

@Injectable()
export class OpenStreetMapService {
  async getAddressFromPosition(latlng: Position) {
    const url = OPEN_STREET_MAP_REVERSE_GEOCODING_API(latlng.lat, latlng.lng);
    try {
      const res = await axios.get(url);
      return res.data.display_name;
    } catch (error) {
      console.log('Error from getAddressFromPosition: ', error);
      return 'Error';
    }
  }

  async getDistanceDuration(origin: Position, destination: Position) {
    const url = OPEN_STREET_MAP_DISTANCE_MATRIX_API(origin, destination);
    try {
      const res = await axios.get(url);
      return {
        distance: res.data.routes[0].distance,
        duration: res.data.routes[0].duration,
      };
    } catch (error) {
      console.log('Error from getDistanceTime: ', error);
      return { distance: -1, duration: -1 };
    }
  }
}
