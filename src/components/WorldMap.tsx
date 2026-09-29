import React, { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import { JourneyStage, Waypoint } from '../types/journey';
import { GLOBAL_ROUTE_WAYPOINTS } from '../data/journey';
import { soundManager } from './AudioController';
import { CloudLightning, Navigation, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

interface WorldMapProps {
  currentStage: JourneyStage;
  currentDay: number;
  showGhostRoute?: boolean;
  onOpenDisruption?: (id: 'event-1' | 'event-2' | 'event-3') => void;
}

export const WorldMap: React.FC<WorldMapProps> = ({
  currentStage,
  currentDay,
  showGhostRoute = true,
  onOpenDisruption
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markerRef = useRef<maplibregl.Marker | null>(null);
  const popupRef = useRef<maplibregl.Popup | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [showWeatherHalo, setShowWeatherHalo] = useState(true);

  // Full coordinates list for route LineString: [lng, lat]
  const fullRouteCoords = GLOBAL_ROUTE_WAYPOINTS.map((wp) => wp.coordinates);

  // Find index of current waypoint on the route
  const getRouteProgressCoords = () => {
    // Collect waypoints up to current stage
    const currentLng = currentStage.coordinates[0];
    const currentLat = currentStage.coordinates[1];
    
    // Find closest waypoint index
    let closestIndex = 0;
    let minDistance = Infinity;
    GLOBAL_ROUTE_WAYPOINTS.forEach((wp, idx) => {
      const d = Math.hypot(wp.coordinates[0] - currentLng, wp.coordinates[1] - currentLat);
      if (d < minDistance) {
        minDistance = d;
        closestIndex = idx;
      }
    });

    // Return slice up to closestIndex (at least 2 points for a line)
    const sliceEnd = Math.max(2, closestIndex + 1);
    return fullRouteCoords.slice(0, sliceEnd);
  };

  // Initialize MapLibre GL map
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: 'https://tiles.openfreemap.org/styles/dark',
      center: currentStage.coordinates,
      zoom: currentStage.mapZoom,
      attributionControl: false
    });

    mapRef.current = map;

    map.on('load', () => {
      setIsMapLoaded(true);

      // 1. PLANNED ROUTE (CYAN GLOW & DASHED LINE)
      map.addSource('route-planned', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: fullRouteCoords
          }
        }
      });

      // Planned route glow
      map.addLayer({
        id: 'route-planned-glow',
        type: 'line',
        source: 'route-planned',
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        paint: {
          'line-color': '#27D3F2',
          'line-width': 6,
          'line-opacity': 0.25,
          'line-blur': 3
        }
      });

      // Planned route core line
      map.addLayer({
        id: 'route-planned-line',
        type: 'line',
        source: 'route-planned',
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        paint: {
          'line-color': '#27D3F2',
          'line-width': 2,
          'line-dasharray': [2, 2],
          'line-opacity': 0.75
        }
      });

      // 2. ACTUAL TRAVELED ROUTE (ORANGE GLOWING PROGRESS)
      map.addSource('route-actual', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: getRouteProgressCoords()
          }
        }
      });

      map.addLayer({
        id: 'route-actual-glow',
        type: 'line',
        source: 'route-actual',
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        paint: {
          'line-color': '#FF6B35',
          'line-width': 8,
          'line-opacity': 0.35,
          'line-blur': 4
        }
      });

      map.addLayer({
        id: 'route-actual-line',
        type: 'line',
        source: 'route-actual',
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        paint: {
          'line-color': '#FF6B35',
          'line-width': 3.5
        }
      });

      // 3. MONSOON STORM DISTURBANCE ZONE IN INDIAN OCEAN
      map.addSource('monsoon-zone', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {
            name: 'Monsoon Swell Area',
            description: 'Southwest monsoon swell reduced vessel speed to 14 kts (+18h delay)'
          },
          geometry: {
            type: 'Point',
            coordinates: [82.0, 5.8]
          }
        }
      });

      map.addLayer({
        id: 'monsoon-halo',
        type: 'circle',
        source: 'monsoon-zone',
        paint: {
          'circle-radius': 50,
          'circle-color': '#FFB020',
          'circle-opacity': 0.18,
          'circle-stroke-color': '#FFB020',
          'circle-stroke-width': 1.5,
          'circle-stroke-opacity': 0.6
        }
      });

      // 4. KEY WAYPOINTS & CHOKEPOINTS
      const keyWaypoints = GLOBAL_ROUTE_WAYPOINTS.filter((wp) =>
        [
          'VietStride Factory (Bình Dương)',
          'CMIT Cai Mep Deep-Sea Terminal',
          'Singapore Strait / Port Call',
          'Strait of Malacca',
          'Suez Canal Convoy (Port Said)',
          'Port of Valencia (Port Call)',
          'Port of Barcelona (Port Call)',
          'Eurofos Terminal (Fos-sur-Mer)',
          'Vénissieux Intermodal Terminal',
          'Saint-Quentin-Fallavier DC'
        ].includes(wp.name)
      );

      map.addSource('waypoints', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: keyWaypoints.map((wp) => ({
            type: 'Feature',
            properties: {
              name: wp.name.split(' (')[0],
              fullName: wp.name,
              desc: wp.description
            },
            geometry: {
              type: 'Point',
              coordinates: wp.coordinates
            }
          }))
        }
      });

      // Waypoint circle dots
      map.addLayer({
        id: 'waypoints-dot',
        type: 'circle',
        source: 'waypoints',
        paint: {
          'circle-radius': 4.5,
          'circle-color': '#07131F',
          'circle-stroke-color': '#27D3F2',
          'circle-stroke-width': 2
        }
      });

      // Waypoint text labels
      map.addLayer({
        id: 'waypoints-text',
        type: 'symbol',
        source: 'waypoints',
        layout: {
          'text-field': ['get', 'name'],
          'text-size': 11,
          'text-offset': [0, 1.2],
          'text-anchor': 'top',
          'text-allow-overlap': false
        },
        paint: {
          'text-color': '#F4F8FB',
          'text-halo-color': '#07131F',
          'text-halo-width': 2
        }
      });

      // Waypoint click popup
      map.on('click', 'waypoints-dot', (e) => {
        if (!e.features || !e.features[0]) return;
        const feature = e.features[0];
        const coordinates = (feature.geometry as any).coordinates.slice();
        const { fullName, desc } = feature.properties as any;

        soundManager.playClick(600);

        if (popupRef.current) popupRef.current.remove();

        popupRef.current = new maplibregl.Popup({ offset: 12, className: 'box917-popup' })
          .setLngLat(coordinates)
          .setHTML(`
            <div style="font-family: monospace; font-size: 11px; padding: 4px;">
              <strong style="color: #27D3F2; font-size: 12px; display: block; margin-bottom: 2px;">${fullName}</strong>
              <span style="color: #cbd5e1;">${desc}</span>
            </div>
          `)
          .addTo(map);
      });

      map.on('mouseenter', 'waypoints-dot', () => {
        map.getCanvas().style.cursor = 'pointer';
      });

      map.on('mouseleave', 'waypoints-dot', () => {
        map.getCanvas().style.cursor = '';
      });

      // 5. THE HERO CONTAINER MARKER (KEDU 240917 4)
      const el = document.createElement('div');
      el.className = 'container-marker-root';
      el.innerHTML = `
        <div style="position: relative; display: flex; align-items: center; justify-content: center; cursor: pointer;">
          <div style="position: absolute; width: 34px; height: 34px; border-radius: 50%; border: 2px solid #FF6B35; animation: radar-pulse 2s infinite ease-out;"></div>
          <div style="position: relative; background: #FF6B35; color: #07131F; font-family: monospace; font-weight: 900; font-size: 9px; padding: 3px 6px; border-radius: 4px; box-shadow: 0 0 14px rgba(255,107,53,0.8); border: 1.5px solid #FFFFFF;">
            917
          </div>
        </div>
      `;

      markerRef.current = new maplibregl.Marker({ element: el })
        .setLngLat(currentStage.coordinates)
        .addTo(map);
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Update position and fly camera when currentStage changes
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !isMapLoaded) return;

    // 1. Move container marker
    if (markerRef.current) {
      markerRef.current.setLngLat(currentStage.coordinates);
    }

    // 2. Smooth cinematic camera flight
    map.flyTo({
      center: currentStage.coordinates,
      zoom: currentStage.mapZoom,
      duration: 1800,
      essential: true
    });

    // 3. Update actual traveled route geometry
    const actualSource = map.getSource('route-actual') as maplibregl.GeoJSONSource;
    if (actualSource) {
      actualSource.setData({
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: getRouteProgressCoords()
        }
      });
    }
  }, [currentStage, isMapLoaded]);

  // Toggle storm visibility
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !isMapLoaded) return;

    if (map.getLayer('monsoon-halo')) {
      map.setLayoutProperty('monsoon-halo', 'visibility', showWeatherHalo ? 'visible' : 'none');
    }
  }, [showWeatherHalo, isMapLoaded]);

  const handleZoomIn = () => {
    mapRef.current?.zoomIn();
  };

  const handleZoomOut = () => {
    mapRef.current?.zoomOut();
  };

  const handleResetBearing = () => {
    mapRef.current?.resetNorthPitch({ duration: 1000 });
  };

  return (
    <div className="relative w-full h-full bg-[#07131F] overflow-hidden select-none">
      
      {/* MapLibre WebGL Canvas Container */}
      <div ref={mapContainerRef} className="absolute inset-0 w-full h-full" />

      {/* Floating Map Controls in Top Right */}
      <div className="absolute top-3 right-3 z-20 flex items-center gap-2">
        <button
          type="button"
          onClick={() => {
            soundManager.playClick();
            setShowWeatherHalo(!showWeatherHalo);
          }}
          className={`px-2.5 py-1 rounded-lg text-xs font-mono flex items-center gap-1.5 border transition-all cursor-pointer shadow-lg ${
            showWeatherHalo
              ? 'bg-[#FFB020]/20 text-[#FFB020] border-[#FFB020]/60'
              : 'bg-[#07131F]/90 text-[#9CB0C0] border-[#1B3B59] hover:text-white'
          }`}
          title="Toggle Indian Ocean weather swell disturbance zone"
        >
          <CloudLightning className="w-3.5 h-3.5" />
          <span>Weather Layer</span>
        </button>

        {/* Map Zoom / Bearing Controls */}
        <div className="flex items-center bg-[#07131F]/90 backdrop-blur-md rounded-lg border border-[#1B3B59] shadow-lg overflow-hidden">
          <button
            onClick={handleZoomIn}
            className="p-1.5 text-[#9CB0C0] hover:text-white hover:bg-[#1B3B59]/50 transition-colors border-r border-[#1B3B59]/60 cursor-pointer"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleZoomOut}
            className="p-1.5 text-[#9CB0C0] hover:text-white hover:bg-[#1B3B59]/50 transition-colors border-r border-[#1B3B59]/60 cursor-pointer"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleResetBearing}
            className="p-1.5 text-[#9CB0C0] hover:text-white hover:bg-[#1B3B59]/50 transition-colors cursor-pointer"
            title="Reset North"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Clean Bottom Left Legend Pill */}
      <div className="absolute bottom-3 left-3 z-20 bg-[#07131F]/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#1B3B59]/60 text-[10px] font-mono text-[#9CB0C0] flex items-center gap-3 shadow-lg">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-0.5 bg-[#27D3F2] inline-block" />
          <span>Planned (44d)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-1 bg-[#FF6B35] inline-block rounded-full" />
          <span>Actual Traveled</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full border border-[#27D3F2] inline-block" />
          <span>Key Gateways</span>
        </div>
      </div>

    </div>
  );
};
