import { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Circle,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

function LocationMarker({ setPosition }) {
  useMapEvents({
    click: (e) => {
      setPosition({ latlng: e.latlng, accuracy: 50 });
    },
  });
  return null;
}

// Component to locate user
function LocateUser({ setPosition, setPositionError }) {
  const map = useMap();

  useEffect(() => {
    // setView: true حرّك الخريطة تلقائيًا إلى موقع المستخدم عند العثور عليه
    map.locate({ setView: true, maxZoom: 13 });

    map.on({
      locationfound: (e) => {
        setPosition({
          latlng: e.latlng,
          accuracy: e.accuracy,
        });
        //  بالمتر (accurcy) المستخدم الحقيقي موجود في أي مكان داخل دائرة نصف قطرها
        map.setView(e.latlng, 20);
      },
      locationerror: (e) => {
        setPositionError(e.message);
      },
    });
  }, []);

  return null;
}

export default function PositionPicker({
  position,
  setPosition,
  setPositionError,
  size,
  positionError,
  validationError,
}) {
  return (
    <>
      <p className="fs-4">موقعك</p>
      <MapContainer
        center={[position.latlng.lat, position.latlng.lng]}
        zoom={20}
        style={size}
      >
        {/* OpenStreetMap Tiles */}
        <TileLayer
          attribution="© OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* get Location of user */}
        <LocateUser
          setPosition={setPosition}
          setPositionError={setPositionError}
        />

        {/* set location     */}
        <LocationMarker setPosition={setPosition} />

        {/* Marker + Circle */}
        {position && (
          <>
            <Marker position={position.latlng} />
            <Circle center={position.latlng} radius={position.accuracy / 2} />
          </>
        )}
      </MapContainer>
      {positionError && <small className="text-warning d-block">{positionError}</small>}
      {validationError.latitude && (
        <small className="text-warning d-block">{validationError.latitude}</small>
      )}
      {validationError.longitude && (
        <small className="text-warning d-block">{validationError.longitude}</small>
      )}
    </>
  );
}
