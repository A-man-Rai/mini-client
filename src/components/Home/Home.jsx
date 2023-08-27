import { useState } from "react";
import Info from "../AccidentDetails/Info"
import MapComponent from "./MapComponent";
import NavBar from "./NavBar";
import MyForm from "../MyForm";
function Home(){
  const[map,setMap]=useState(true); 
  const[isLogged,setIsLogged]=useState(false);
 const [info,setInfo]=useState(false);
  return(
     <>
      <NavBar setMap={setMap}  setInfo={setInfo} setIsLogged={setIsLogged}/>
      {info?<Info/>:<MapComponent setMap={setMap} setInfo={setInfo} />} 
      {isLogged && <MyForm/>}
     </>
   );
}
export default Home;