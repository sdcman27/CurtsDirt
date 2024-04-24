import React, { useEffect } from 'react';

const MapComponent = () => {
  useEffect(() => {
    const initMap = () => {
      const center = { lat: 40.81643295288086, lng: -80.04161834716797 };
      const map = new window.google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: center,
        mapId: 'DEMO_MAP_ID'
      });
      new window.google.maps.Marker({
        position: center,
        map: map,
        title: 'Curts Dirt'
      });
      return (
    <div id="map" style={{ height: '400px', width: '100%', margin: '0 auto' }}></div>
  );
    };

    window.initMap = initMap;
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&callback=initMap`;
    script.async = true;
    document.head.appendChild(script);
    // Clean up the script when the component unmounts
    return () => {
      document.head.removeChild(script);
      window.initMap = undefined;
    };
  }, []);

  return (
    <div id="map" style={{ height: '400px', width: '80%', margin: '0 auto' }}></div>
  );
};

export default MapComponent;