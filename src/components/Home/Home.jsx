
import Info from "../AccidentDetails/Info"
import MapComponent from "./MapComponent";
import NavBar from "./NavBar";
import MyForm from "../MyForm";
import { useSelector } from "react-redux";
function Home(){
 
 const data= useSelector(state=>{
    return state.home;
  })
  const{isMapVisible,isInfoVisible,isLogged}=data;
  
   console.log(isMapVisible);
   console.log(isInfoVisible);
   console.log(isLogged);




 return(
     <>
      <NavBar/>
      {isInfoVisible && <Info/>}
      {isMapVisible && <MapComponent/>} 
      {isLogged && <MyForm/>}
     </>
   );
}
export default Home;