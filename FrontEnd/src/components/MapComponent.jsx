import React, { useEffect } from 'react';

const MapComponent = () => {
  // This function must be globally accessible if used as a callback in the URL
  const initMap = async () => {
    const center = { lat: 40.81643295288086, lng: -80.04161834716797 };
    const map = new window.google.maps.Map(document.getElementById('map'), {
      zoom: 14,
      center: center,
      mapId: 'DEMO_MAP_ID'  // Ensure this map ID is valid or remove it if not used
    });

    try {
      // Load the AdvancedMarkerElement library
      const { AdvancedMarkerElement } = await window.google.maps.importLibrary("marker");
      
      // Use AdvancedMarkerElement to create a new marker
      new AdvancedMarkerElement({
        position: center,
        map: map,
        title: 'Curts Dirt'
      });
    } catch (e) {
      console.error('Failed to load Google Maps libraries:', e);
    }
  };

  // Handling the script loading separately
  useEffect(() => {
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&callback=initMap`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);

      script.onload = () => console.log("Google Maps Script loaded.");
      script.onerror = (e) => console.error("Google Maps Script failed to load:", e);

      // Clean up the script when the component unmounts
      return () => document.head.removeChild(script);
    } else {
      initMap();  // Initialize the map if the script is already loaded
    }
  }, []);

  // Logging the API key to verify it's being read correctly
  useEffect(() => {
    //console.log('API Key:', import.meta.env.VITE_GOOGLE_MAPS_API_KEY);
    console.log(import.meta.env);  // Check all environment variables
  }, []);

  return <div id="map" style={{ height: '400px', width: '80%', margin: '0 auto' }} />;
};

export default MapComponent;
