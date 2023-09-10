
import Info from "../AccidentDetails/Info"
import MapComponent from "./MapComponent";
import NavBar from "./NavBar";
import MyForm from "../Report/MyForm";
import { useSelector } from "react-redux";
import GetAll from "../Report/GetAll";
import NewReportForm from "../Report/NewReportForm";
function Home(){
 
 const data= useSelector(state=>{
    return state.home;
  })
  const{isMapVisible,isInfoVisible,isLogged}=data;
  
   console.log(isMapVisible);
   console.log(isInfoVisible);
   console.log(isLogged);


   const showAllData=useSelector(state=>state.getAllReportData.showAllData);
   const showNewReport=useSelector(state=>state.getAllReportData.createNewData);


 return(
     <>
      <NavBar/>
      {isInfoVisible && <Info/>}
      {isMapVisible && <MapComponent/>} 
      {isLogged && <MyForm/>}
      {showAllData && <GetAll/>}
      {showNewReport && <NewReportForm/>}
     </>
   );
}
export default Home;