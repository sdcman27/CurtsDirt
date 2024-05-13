import React, { useState, useMemo } from 'react';
import axios from 'axios';
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from 'react-places-autocomplete';
import { useLoadScript } from '@react-google-maps/api';
import '../styles/OrderNow.css';

const libraries = ['places'];

const OrderNow = () => {
  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey,
    libraries,
  });

  const [order, setOrder] = useState({
    name: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    phone: '',
    description: '',
  });

    // useMemo is called unconditionally at the top level
    const searchOptions = useMemo(() => ({
      location: new window.google.maps.LatLng(40.816213, -80.041339),
      radius: 48000, // 48 kilometers
      componentRestrictions: { country: 'us' }
    }), []);

    
  if (loadError) {
    return <div>Error loading Google Maps API. Please try again later.</div>;
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    console.log(latLng);

    const addressComponents = {
      street: '',
      city: '',
      state: '',
      zipcode: '',
    };

    results[0].address_components.forEach((component) => {
      const types = component.types;
      if (types.includes('street_number')) {
        addressComponents.street = `${component.long_name} ${addressComponents.street}`;
      } else if (types.includes('route')) {
        addressComponents.street += component.long_name;
      } else if (types.includes('locality')) {
        addressComponents.city = component.long_name;
      } else if (types.includes('administrative_area_level_1')) {
        addressComponents.state = component.short_name;
      } else if (types.includes('postal_code')) {
        addressComponents.zipcode = component.long_name;
      }
    });

    setOrder((prevOrder) => ({
      ...prevOrder,
      ...addressComponents,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder((prevOrder) => ({
      ...prevOrder,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5173/api/submit-order', order);
      alert('Order submitted successfully!');
      setOrder({
        name: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        phone: '',
        description: '',
      });
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('There was an issue submitting your order, please try again.');
    }
  };


  return (
    <div>
      <h1>Place Your Order</h1>
      <form onSubmit={handleSubmit} className="order-form">
        <input
          type="text"
          name="name"
          value={order.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <PlacesAutocomplete
          value={order.street}
          onChange={(value) => handleChange({ target: { name: 'street', value } })}
          onSelect={handleSelect}
          searchOptions={searchOptions}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div>
              <input
                {...getInputProps({
                  placeholder: 'Search your address',
                  className: 'location-search-input',
                })}
              />
              <div className="autocomplete-dropdown-container">
                {loading && <div>Loading...</div>}
                {suggestions.map((suggestion, index) => {
                  const key = `${suggestion.placeId || index}`; // Use placeId combined with index for a more unique key
                  const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
        return (
          <div {...getSuggestionItemProps(suggestion, { 
                                                      className,
                                                      key: index})}>
                      <span>{suggestion.description}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>

        <input
          type="text"
          name="city"
          value={order.city}
          onChange={handleChange}
          placeholder="City"
          required
        />
        <input
          type="text"
          name="state"
          value={order.state}
          onChange={handleChange}
          placeholder="State"
          required
        />
        <input
          type="text"
          name="zipcode"
          value={order.zipcode}
          onChange={handleChange}
          placeholder="Postal Code"
          required
        />
        <input
          type="text"
          name="phone"
          value={order.phone}
          onChange={handleChange}
          placeholder="Phone Number"
        />
        <input
          type="text"
          name="description"
          value={order.description}
          onChange={handleChange}
          placeholder="Description of your order"
        />
        <button type="submit">Submit Order</button>
      </form>
    </div>
  );
};


export default OrderNow;