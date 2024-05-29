import { LocationInput } from './graphql';

export const MONGOOSE_URI =
  'mongodb+srv://lmtrongctc2020:bGYBj9skM2i83w5f@sfo.qpiabuu.mongodb.net/db_sfo';

export const SALT_OR_ROUNDS = 10;

export const GG_MAP_API = 'AIzaSyB_8vefOV1JnGvShVFG0BS9_rKgU3BKT-k';

export function GG_MAP_REVERSE_GEOCODING_API(lat, lng, api_key = GG_MAP_API) {
  return `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&location_type=ROOFTOP&key=${api_key}`;
}

export function GG_MAP_DISTANCE_MATRIX_API(
  origins: LocationInput,
  destinations: LocationInput,
  api_key = GG_MAP_API,
) {
  const originsString = `${origins.lat},${origins.lng}`;
  const destinationsString = `${destinations.lat},${destinations.lng}`;
  return `https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${destinationsString}&origins=${originsString}&units=imperial&key=${api_key}`;
}

const TEST_GG_API = `https://maps.googleapis.com/maps/api/geocode/json?latlng=10.387973895202244,105.42367147467304&location_type=ROOFTOP&key=AIzaSyCizJs78NYhWcXTm4TV00jD8k-JlgSHF3U`;

//=============================================== OPEN STREET MAP ===========================================
export function OPEN_STREET_MAP_REVERSE_GEOCODING_API(lat, lng) {
  return `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`;
}

export function OPEN_STREET_MAP_DISTANCE_MATRIX_API(origin, destination) {
  return `https://router.project-osrm.org/route/v1/driving/${origin.lng},${origin.lat};${destination.lng},${destination.lat}?overview=false`;
}

//=============================================== STATUS ORDER ===========================================
export const STATUS_DRAFT = 'DRAFT';
export const STATUS_PENDING = 'PENDING';
export const STATUS_ACTIVE = 'ACTIVE';
export const STATUS_SUCCESS = 'SUCCESS';
export const STATUS_FAILED = 'FAILED';
