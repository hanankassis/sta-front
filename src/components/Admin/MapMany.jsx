import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function MapComponent(providers) {

  return (
    <MapContainer
      center={position}
      zoom={20}
      style={{ width: "200px", height: "150px" }}
    >
      <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />

      {providers.map((p) => (
        <Marker key={p.id} position={[p.lat, p.lng]} />
      ))}
    </MapContainer>
  );
}
