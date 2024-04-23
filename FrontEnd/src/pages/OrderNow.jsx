import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
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

  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    const loadScript = () => {
      if (window.google) {
        setScriptLoaded(true);
        return; // skip load if script already exists
      }
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCvyDqsvVc5uBLEEgPFHH6V0l_NbJxp1AM&libraries=places`;
      script.onload = () => setScriptLoaded(true);
      document.body.appendChild(script);
    };

    loadScript();
  }, []);

  const searchOptions = {
    location: new window.google.maps.LatLng(40.816546, -80.041521),
    radius: 15000, // Set the radius in meters
    types: ['address']
  }

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    console.log(latLng); // Optional: Log latitude and longitude if needed for other purposes
  
    // Initialize a template object for the order
    const addressComponents = {
      street: '',
      city: '',
      state: '',
      zipcode: ''
    };
  
    results[0].address_components.forEach(component => {
      const types = component.types;
      if (types.includes("street_number")) {
        // Append the street number to the street address
        addressComponents.street = `${component.long_name} ${addressComponents.street}`;
      } else if (types.includes("route")) {
        // Append the street name to the street address
        addressComponents.street += component.long_name;
      } else if (types.includes("locality")) {
        addressComponents.city = component.long_name;
      } else if (types.includes("administrative_area_level_1")) {
        addressComponents.state = component.short_name;
      } else if (types.includes("postal_code")) {
        addressComponents.zipcode = component.long_name;
      }
    });


    setOrder(prevOrder => ({
      ...prevOrder,
      ...addressComponents
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
                  const className = suggestion.active
                    ? 'suggestion-item--active'
                    : 'suggestion-item';
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
        <PlacesAutocomplete
          value={order.city}
          onChange={(value) => handleChange({ target: { name: 'city', value } })}
          onSelect={(value) => handleSelect(value, 'city')}
          >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
              <div>
              <input
                {...getInputProps({
                    placeholder: 'Enter City',
                    className: 'location-search-input',
                })}
              />
              <div className="autocomplete-dropdown-container">
                    {loading && <div>Loading...</div>}
                    {suggestions.map(suggestion => {
                      const className = suggestion.active
                        ? 'suggestion-item--active'
                        : 'suggestion-item';
          return (
            <div {...getSuggestionItemProps(suggestion, { className })}>
              <span>{suggestion.description}</span>
            </div>
          );
        })}
      </div>
    </div>
  )}
</PlacesAutocomplete>
<PlacesAutocomplete
  value={order.state}
  onChange={(value) => handleChange({ target: { name: 'state', value } })}
  onSelect={(value) => handleSelect(value, 'state')}
>
  {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
    <div>
      <input
        {...getInputProps({
          placeholder: 'Enter State',
          className: 'location-search-input',
        })}
      />
      <div className="autocomplete-dropdown-container">
        {loading && <div>Loading...</div>}
        {suggestions.map(suggestion => {
          const className = suggestion.active
            ? 'suggestion-item--active'
            : 'suggestion-item';
          return (
            <div {...getSuggestionItemProps(suggestion, { className })}>
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
          name="zipcode"
          value={order.zipcode}
          onChange={handleChange}
          placeholder="Postal Code"
          required
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