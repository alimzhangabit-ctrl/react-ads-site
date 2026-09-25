import { useEffect, useRef, useState } from 'react';

const ALMATY = { lat: 43.238949, lng: 76.889709 };

export default function GoogleMap() {
  const container = useRef(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const key = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    if (!key) {
      setError('Добавьте REACT_APP_GOOGLE_MAPS_API_KEY в .env, чтобы включить карту Google Maps.');
      return undefined;
    }
    const initMap = () => {
      if (!container.current || !window.google?.maps) return;
      new window.google.maps.Map(container.current, {
        center: ALMATY,
        zoom: 11,
        disableDefaultUI: true,
        zoomControl: true,
        gestureHandling: 'cooperative',
        styles: [{ featureType: 'poi', stylers: [{ visibility: 'off' }] }],
      });
    };
    const existing = document.querySelector('script[data-google-maps]');
    if (window.google?.maps) initMap();
    else if (existing) existing.addEventListener('load', initMap, { once: true });
    else {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${key}`;
      script.async = true;
      script.dataset.googleMaps = 'true';
      script.addEventListener('load', initMap, { once: true });
      script.addEventListener('error', () => setError('Не удалось загрузить Google Maps. Проверьте ключ и разрешённые домены.'), { once: true });
      document.head.appendChild(script);
    }
    return undefined;
  }, []);

  return <div className="google-map-wrap"><div className="google-map" ref={container}/>{error && <div className="map-placeholder"><span>✦</span><b>Алматы, Казахстан</b><small>{error}</small></div>}</div>;
}
