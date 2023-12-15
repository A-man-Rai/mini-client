import axios from 'axios';
const url="http://localhost:9000";

export const authenticateRegister=async(data)=>{
try{
  
  return await axios.post(`${url}/register`,data)

}
catch(err){
    console.log(err.message);
}

}

export const authenticateLogin=async(data)=>{
  try{
    
    return await axios.post(`${url}/login`,data)
  
  }
  catch(err){
      console.log(err.message);
      return err.response;
  }
  
  }


 

/*function urlBase64ToUint8Array(base64String) {
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
}**/

