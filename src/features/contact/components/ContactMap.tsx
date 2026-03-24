import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const CONTACT_LOCATION = L.latLng(-33.43659, -70.68413);

const ContactMap: React.FC = () => {
  return (
    <MapContainer center={CONTACT_LOCATION} zoom={16}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={CONTACT_LOCATION}>
        <Popup>Huellitas Pets Store</Popup>
      </Marker>
    </MapContainer>
  );
};

export default ContactMap;
