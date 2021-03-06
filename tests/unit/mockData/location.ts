import { ILocation } from '@/interfaces/locationData';

export const mockLocation: ILocation = {
  address_components: [
    {
      long_name: 'Poznań',
      short_name: 'Poznań',
      types: ['locality', 'political'],
    },
    {
      long_name: 'Poznań County',
      short_name: 'Poznań County',
      types: ['administrative_area_level_2', 'political'],
    },
    {
      long_name: 'Greater Poland Voivodeship',
      short_name: 'Greater Poland Voivodeship',
      types: ['administrative_area_level_1', 'political'],
    },
    {
      long_name: 'Poland',
      short_name: 'PL',
      types: ['country', 'political'],
    },
    {
      long_name: '60',
      short_name: '60',
      types: ['postal_code', 'postal_code_prefix'],
    },
  ],
  formatted_address: 'Poznań, Poland',
  geometry: {
    bounds: {
      northeast: {
        lat: 52.509141,
        lng: 17.0716593,
      },
      southwest: {
        lat: 52.29191609999999,
        lng: 16.7316724,
      },
    },
    location: {
      lat: 52.406374,
      lng: 16.9251681,
    },
    location_type: 'APPROXIMATE',
    viewport: {
      northeast: {
        lat: 52.509141,
        lng: 17.0716593,
      },
      southwest: {
        lat: 52.29191609999999,
        lng: 16.7316724,
      },
    },
  },
  place_id: 'ChIJtwrh7NJEBEcR0b80A5gx6qQ',
  types: ['locality', 'political'],
};
