import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function MapComponent({ lat, lng }) {
  // Fallback Location 
  const position = lat ? [lat, lng] : [33.514, 36.277];
  return (
    <MapContainer
      center={position}
      zoom={20}
      style={{ width: "200px", height: "150px" }}
    >
      <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />

      <Marker position={position} />
    </MapContainer>
  );
}
