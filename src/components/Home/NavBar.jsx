import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ReplyIcon from '@mui/icons-material/Reply';
import Login from '../Login/Login';
import { useEffect,useState } from 'react';
import { useDispatch ,useSelector} from "react-redux";
import { setNotify,setLatitude,setLongitude } from '../../store/slices/LoginSlice';
import axios from 'axios';
import { setMapStatus, setInfoStatus, setLoggedStatus,setData } from "../../store/slices/HomeSlice";
import { setShowReport,setCreateData } from '../../store/slices/GetAllReportSlice';
export default function NavBar(){
  const dispatch = useDispatch();
  const latitude=useSelector(state=>state.login.latitude);
  const longitude=useSelector(state=>state.login.longitude);
  const isLogin = useSelector(state => state.login.isLogin);
  const userId = useSelector(state => state.responseData.user.id);
  const userName = useSelector(state => state.responseData.user.userName);
  const showAllReport=(bool)=>{// to get all report of user
    dispatch(setShowReport(bool))
  }
  const createNewReport=(bool)=>{ // for new report 
     dispatch(setCreateData(bool))
  }

  const handleSetMapStatus = (bool) => {// to make map visible
    dispatch(setMapStatus(bool));
  };

  const handleSetInfoStatus = (bool) => {// to make map pointer details visible
    dispatch(setInfoStatus(bool));
  };

  const handleSetLoggedStatus = (bool) => {// to make report us visible
    dispatch(setLoggedStatus(bool));
  };

 
  const showMyLocation = () => {
   
    if(redIcon){
      startWatching();
      setPermissionGranted(true);
      dispatch(setNotify(true));
      setRedIcon(false);
    }
    else{
      stopWatching();
      setPermissionGranted(false);
       dispatch(setNotify(false));
       dispatch(setLatitude(""))
       dispatch(setLongitude(""))
       setRedIcon(true);
    }
    
    
      if (!navigator.geolocation) {
        alert('Geolocation is not supported by your browser');
        return;
      }
    navigator.geolocation.getCurrentPosition(
        (position) => {
        dispatch(setLatitude(position.coords.latitude))
        dispatch(setLongitude(position.coords.longitude))
        },
        (error) => {
          alert('Location permission denied');      
          console.warn(`ERROR(${error.code}): ${error.message}`);
        }
    ) 
   };  
    const [redIcon,setRedIcon]=React.useState(true);
  
    // watch position
   // Inside your component function
const [watchId, setWatchId] = React.useState(null);

// ...

function startWatching() {
  if ('geolocation' in navigator) {
    // Check if geolocation is supported by the browser

    // Options for geolocation (you can customize these as needed)
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    // Start watching the user's position
    const id = navigator.geolocation.watchPosition(
      handleSuccess,
      handleError,
      options
    );

    setWatchId(id);
    console.log('Watching position...');
  } else {
    console.error('Geolocation is not supported by your browser.');
  }
}

function stopWatching() {
  // Stop watching the user's position
  //setPermissionGranted(false);
  if (watchId) {
    navigator.geolocation.clearWatch(watchId);
    setWatchId(null); // Reset watchId after stopping
    console.log('Stopped watching position.');
  } else {
    console.warn('No position watch to stop.');
  }
}


function handleSuccess(position) {
  // Handle the user's current position (you can do something with the position object)
 const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  dispatch(setLatitude(latitude))
  dispatch(setLongitude(longitude))
  console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
}

function handleError(error) {
  // Handle errors that may occur while trying to get the user's position
  console.error(`Error getting position: ${error.message}`);
}

// Assuming you have your publicVapidKey defined
const publicVapidKey = "BJ1EwC8G27e1nJp26gCgnAhIsYqIO9x6KQwFZ1uYHWV-ses6qolQezJ-c_9PjR8NxJcqUGXtw0CZgAwUhVW_YW4";


if ("serviceWorker" in navigator) {
  document.addEventListener('DOMContentLoaded', () => {
    const notifyButton = document.getElementById("notifyButton");
    if (notifyButton) {
      notifyButton.addEventListener("click", async () => {
        try {
          // Register service worker, obtain push subscription, and send push notification
          await sendNotification();
        } catch (error) {
          console.error("Error:", error);
        }
      });
    } else {
      console.error("Element with id 'notifyButton' not found in the DOM.");
    }
  });
}
const [permissionGranted, setPermissionGranted] = useState(false);
useEffect(() => {
  if (permissionGranted && latitude !== null && longitude !== null) {
    sendNotification();
  }
}, [ latitude, longitude]);



// Register SW, Register Push, Send Push
async function sendNotification() {
  try {
    // Register Service Worker
    console.log("Registering service worker...");
    const register = await navigator.serviceWorker.register("worker.js", {
      scope: "/"
    });
    console.log("Service Worker Registered...");

    // Register Push
    console.log("Registering Push...");
    const subscription = await register.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    });
    console.log("Push Registered...");
    // Send Push Notification
    console.log("Sending Push...");

    // Prepare payload with subscription details
     //console.log(subscription);
    //const payload =JSON.stringify(subscription)
    const payload = {
      subscription,
      latitude,
      longitude,
      userId
    };
    
    // Send payload to backend for further processing and push notification
    const response = await axios.post(
      "http://localhost:9000/notify",
      
        payload,
      
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const voice=response.data.voice;
    console.log(voice);
    if(voice){
         speakHello();
    }
    console.log("Push Sent...");
  } catch (error) {
    console.error("Error sending push notification:", error);
  }
}
function speakHello() {
  // Create a new SpeechSynthesisUtterance object
  const message = new SpeechSynthesisUtterance(`${userName} YOUR ARE INSIDE ACCIDENT PRONE AREA`);
 // Use the SpeechSynthesis API to speak the message
  window.speechSynthesis.speak(message);
}
function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
  

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => {
              handleSetMapStatus(true);
              handleSetInfoStatus(false);
              handleSetLoggedStatus(false);
              createNewReport(false);
              showAllReport(false);
              dispatch(setData(""));
              

            }}
          >
            <ReplyIcon />
          </IconButton>
       
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
           MAPPING ACCIDENTS 
          </Typography>
      
        { isLogin &&
          <Button 
          variant="contained"
            color="success"
            sx={{ mr: 2 }} 
            onClick={() => {
              handleSetLoggedStatus(true);
              handleSetMapStatus(false);
              handleSetInfoStatus(false);
             
            }}
          >
            Report Us
          </Button> }  
          {isLogin && <Button   sx={{ mr: 2 }}  variant='contained' color='success' 
           onClick={()=>{
            showMyLocation()
             
           }
           }
           id="notifyButton">NOTIFY ME</Button>}
          <Login stopWatching={stopWatching} />
        </Toolbar>
      </AppBar>
    </Box>
  );

          }