import React from 'react';
import { MapContainer , TileLayer, useMap, Marker, Tooltip } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import L from 'leaflet';

const MapLeaflet = ({mapCenter, mapZoom, cardData}) => {
    function ChangeView({ center, zoom }) {
        const map = useMap();
        map.setView(center, zoom);
        return null;
    }
    return (
        <div className="map-All">
            <MapContainer center={mapCenter} zoom={mapZoom} scrollWheelZoom={true}>
                <ChangeView center={mapCenter} zoom={mapZoom} />
                <TileLayer attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                <Marker position={mapCenter}>
                    <Tooltip direction="top">
                        <h6><strong>Country: </strong>{cardData.country}</h6>
                        <h6 className="text-dark"><strong>Continent: </strong>{cardData.continent}</h6>
                        <h6 className="text-dark"><strong>Total Cases: </strong>{cardData.cases}</h6>
                        <h6 className="text-dark"><strong>Population: </strong>{cardData.population}</h6>
                        <h6 className="text-dark"><strong>Critical Cases: </strong>{cardData.critical}</h6>
                    </Tooltip>
                </Marker>
            </MapContainer>
        </div>
    )
}
 export default MapLeaflet;
