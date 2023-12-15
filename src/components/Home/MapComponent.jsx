import React, { useState, useEffect , useRef} from 'react';
import { MapContainer,ZoomControl, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import CustomCard from './CustomCard';
import axios from "axios";
import L from 'leaflet';
import { useMapEvents } from 'react-leaflet';
import { useSelector } from 'react-redux';


function ZoomPopupCloser() {
    const map = useMapEvents({
        zoomstart: () => {
            map.closePopup();  // Close any open popup
        }
    });
    return null; 
}
const redIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/6615/6615039.png',
  iconSize: [50, 60],
  iconAnchor: [12, 50],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
function MapComponent() {
  const [constantData,SetConstantData]=useState([]);
 
   useEffect(()=>{
    const fetchData = async () => {
      const response=await axios.get("http://localhost:9000") 
      SetConstantData(response.data);
      
    }
    fetchData()
  },[])
  const isNotify = useSelector(state => state.login.isNotify);
  const latitude= useSelector(state => state.login.latitude);
  const longitude = useSelector(state => state.login.longitude);

    return (

      <div className="map-container" >
            <MapContainer center={[27.187601, 88.499709]} zoom={13} minZoom={11}>
               <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
               />
               
               {constantData.map((info, index) => (
               
             <Marker key={index} position={[info.latitude, info.longitude]} >
             <Popup>
          
                 <CustomCard  description={info.description} title={info.title} id={info._id} /> 
             </Popup>
             <ZoomPopupCloser/>
             </Marker>
))}
      {isNotify && <Marker position={[latitude,longitude]} icon={redIcon}></Marker>}
      
     <ZoomControl position='bottomright'/>
            </MapContainer>
      </div>
   );
}

export default MapComponent;
