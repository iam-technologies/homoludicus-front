import { isClient } from '../../../serverServices/utils';


export default ({ country, codePostal, city, address, countryName }, callback) => {
  if (!isClient) return;
  const geocoder = new window.google.maps.Geocoder();

  const params = {
    componentRestrictions: {
      country: country !== 'Otros' ? country : countryName,
      postalCode: codePostal,
      locality: city,
      route: address
    }
  };

  geocoder.geocode(params, (results, status) => {
    if (status === 'OK') {
      return callback(null, {
        lat: results[0].geometry.location.lat(),
        lng: results[0].geometry.location.lng()
      });
    }

    return callback(true, null);
  });
};
