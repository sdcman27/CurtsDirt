import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from 'react-places-autocomplete';
import '../styles/OrderNow.css';

const OrderNow = () => {
  const [order, setOrder] = useState({
    name: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    phone: '',
    description: '',
  });

  const [autocompleteOptions, setAutocompleteOptions] = useState(null);


  useEffect(() => {
    const calculateBounds = async () => {
      const radiusMiles = 20;
      const earthRadiusMiles = 3958.8; // Radius of the Earth in miles
      const lat = 40.816370;
      const lng = -80.041215;

      const latDelta = (radiusMiles / earthRadiusMiles) * (180 / Math.PI);
      const lngDelta = (radiusMiles / earthRadiusMiles) * (180 / Math.PI) / Math.cos(lat * Math.PI / 180);

      const bounds = {
        north: lat + latDelta,
        south: lat - latDelta,
        east: lng + lngDelta,
        west: lng - lngDelta,
      };

      setAutocompleteOptions({ bounds });
    };

    calculateBounds();
  }, []);

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const addressComponents = {
      street: '',
      city: '',
      state: '',
      zipcode: '',
    };

    results[0].address_components.forEach((component) => {
      const types = component.types;
      if (types.includes('street_number') || types.includes('route')) {
        addressComponents.street = `${addressComponents.street} ${component.long_name}`.trim();
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
          autoComplete="name"
          required
        />
        <PlacesAutocomplete
          value={order.street}
          onChange={(value) => handleChange({ target: { name: 'street', value } })}
          onSelect={handleSelect}
          autocompleteOptions={autocompleteOptions}
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
          autoComplete="tel"
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