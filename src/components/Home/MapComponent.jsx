import React, { useState, useEffect } from 'react';
import { MapContainer,ZoomControl, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { ConstantData } from '../../ConstantData';
import 'leaflet/dist/leaflet.css';
import CustomCard from './CustomCard';

import { useMapEvents } from 'react-leaflet';

function ZoomPopupCloser() {
    const map = useMapEvents({
        zoomstart: () => {
            map.closePopup();  // Close any open popup
        }
    });
    return null; // This component doesn't render anything
}
function MapComponent({setMap,setInfo}) {
      
    return (
      <div className="map-container" >
            <MapContainer center={[27.187601, 88.499709]} zoom={12} minZoom={8}>
               <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
               />
               {ConstantData.map((info, index) => (
             <Marker key={index} position={[info.latitude, info.longitude]}>
             <Popup>
                 <CustomCard link={info.link} setMap={setMap} setInfo={setInfo}/>
             </Popup>
             <ZoomPopupCloser/>
             </Marker>
))}

     <ZoomControl position='bottomright'/>
            </MapContainer>
      </div>
   );
}

export default MapComponent;
