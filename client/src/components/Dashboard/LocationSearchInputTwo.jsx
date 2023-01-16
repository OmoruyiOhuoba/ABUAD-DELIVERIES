import React, {useEffect, useState} from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from 'react-places-autocomplete';

const LocationSearchInputTwo = () => {

  const [pickupaddress, setPickupaddress] = useState('');
  const [deliveryaddress, setDeliveryaddress] = useState('');
  const [pickupplaceid, setPickupplaceid] = useState('');
  const [deliveryplaceid, setDeliveryplaceid] = useState('');


  const handleSelectPickup = async value => {

    const results = await geocodeByAddress(value);
    const LatLng = await getLatLng(results[0]);
    const placeId = results[0].place_id;
    setPickupaddress(value);
    setPickupplaceid(placeId);
    //setCoordinates(LatLng);
    geocodeByAddress(pickupaddress);
    //console.log('Success', LatLng);
    //console.log(results);
    //console.log(placeId);
  };

    return (
      <PlacesAutocomplete
        value={pickupaddress}
        onChange={setPickupaddress}
        onSelect={handleSelectPickup}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input',
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
}



/*second one




const handleSelectDelivery = async value => {

  const results = await geocodeByAddress(value);
  const LatLng = await getLatLng(results[0]);
  const placeId = results[0].place_id;
  setDeliveryaddress(value);
  //setCoordinates(LatLng);
  geocodeByAddress(deliveryaddress);
  setDeliveryplaceid(placeId)
  //console.log('Success', LatLng);
  //console.log(results);
  //console.log(placeId);
};

  return (
    <PlacesAutocomplete
      value={deliveryaddress}
      onChange={setDeliveryaddress}
      onSelect={handleSelectDelivery}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
          <input
            {...getInputProps({
              placeholder: 'Search Places ...',
              className: 'location-search-input',
            })}
          />
          <div className="autocomplete-dropdown-container">
            {loading && <div>Loading...</div>}
            {suggestions.map(suggestion => {
              const className = suggestion.active
                ? 'suggestion-item--active'
                : 'suggestion-item';
              // inline style for demonstration purpose
              const style = suggestion.active
                ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                : { backgroundColor: '#ffffff', cursor: 'pointer' };
              return (
                <div
                  {...getSuggestionItemProps(suggestion, {
                    className,
                    style,
                  })}
                >
                  <span>{suggestion.description}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
}*/

export default LocationSearchInputTwo