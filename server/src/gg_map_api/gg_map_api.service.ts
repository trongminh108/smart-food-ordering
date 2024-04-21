import { LocationInput } from './../graphql';
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import {
  GG_MAP_DISTANCE_MATRIX_API,
  GG_MAP_REVERSE_GEOCODING_API,
} from 'src/constants';

@Injectable()
export class GgMapApiService {
  async getAddressFromLocation(location: LocationInput) {
    const url = GG_MAP_REVERSE_GEOCODING_API(location.lat, location.lng);
    try {
      const res = await axios.get(url);
      // console.log(res.data);
      return res.data.results[0].formatted_address;
    } catch (error) {
      console.log('Error from getAddressFromLocation: ', error);
      return 'Error';
    }
  }

  async getDistanceBetweenLocation(
    origins: LocationInput,
    destinations: LocationInput,
  ) {
    const url = GG_MAP_DISTANCE_MATRIX_API(origins, destinations);
    console.log(url);

    try {
      const res = await axios.get(url);
      //   console.log(res.data.rows[0].elements[0]);
      return {
        distance: res.data.rows[0].elements[0].distance.value,
        duration: res.data.rows[0].elements[0].duration.value,
      };
    } catch (error) {
      console.log('Error from getDistanceBetweenLocation: ', error);
      return {
        distance: 0,
        duration: 0,
      };
    }
  }
}
