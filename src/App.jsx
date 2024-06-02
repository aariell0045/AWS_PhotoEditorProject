import './App.css'
import { render } from 'react-dom';
import { Sleep, calculateTimeDifferenceInMinutes, downloadImage, getFromLocalStorage, getFromLocalStorageKeyTime, postRequest, removeFromLocalStorage, saveToLocalStorage, updateTimestamp } from './utils/utils';
import AlertCustomeModule from './components/Alert';
const { AlertCustome,State } = AlertCustomeModule;
import PopUpBox from './components/PopUpBoxs'
import { createRoot } from 'react-dom/client';
import { Colors, filters } from './data/constants';
import NavBar from './components/navBar';
import { useEffect, useRef, useState } from 'react';
import ImageCard from './components/ImageCard';
import UploadButton from './components/UploadButton';
import { Button } from '@mui/joy';
import Inputs from './components/inputs';
import TableHover, { getAdminData } from './components/TableHover';

let obj

export function SetAlert(title,description,state=State.neutral) {
  const domNode = document.getElementById('obj');
  obj=""
  const root = createRoot(domNode);
  root.render(<AlertCustome title={title} text={description} state={state}/>, document.getElementById('obj'));  
}

export function ShowPop(content=null) {
  const domNode = document.getElementById('obj');
  const root = createRoot(domNode);
  let pop = (<PopUpBox />);
  if(content!= null)
    pop = (<PopUpBox content={content}/>)
  root.render(pop);
}

function App() {
  const [filter, setFilter] = useState(filters.Mirror_photo);
  const [originalImage, setOriginalImage] = useState("");
  const [readyImage, setReadyImage] = useState(null);
  const [adminInfo, setAdminInfo] = useState("");
  async function startImageFilter() {
  const apiPath = `https://pglpodtj62.execute-api.us-east-1.amazonaws.com/prod/${filter}`;
  SetAlert("We are working on your image", "", State.neutral);
  let bodyReq = {};
  document.querySelectorAll(".inputParams").forEach(e => {
    let name = e.childNodes[0].textContent;
    let val = e.childNodes[1].querySelector("input").value;
    val = parseFloat(val)==NaN ?val:parseFloat(val)
    bodyReq[name] = val;
});
bodyReq["user_id"] = getFromLocalStorage("logged")
  let body = await postRequest(apiPath,bodyReq)

      if(body!= null){
        let imageUrl = body["image_url"]
        setReadyImage(imageUrl);
        return true
      }
return null


  } 


  useEffect(() => {
    getAdminData(setAdminInfo)
let timeDiff = calculateTimeDifferenceInMinutes(getFromLocalStorageKeyTime("logged"))
if(timeDiff>=30)
{
  SetAlert("Welcome back, we missed you!","",State.success)
  updateTimestamp("logged")
}
}, []);

  return (
    <div style={{left:0,display: 'flex' ,    justifyContent:'center',    alignItems:'center',backgroundColor:Colors.SemiLightColor, width:"100vw",height:"100vh"}}>
    <NavBar filter={filter} setFilter={setFilter}/>
    <div style={{display:"flex",flexDirection:"row", alignContent:"center",justifyContent:"center"}}>
      <div style={{display:"flex", alignItems:"center",height:"",position:"relative",right:"10px",flexDirection:"column"}}>
      <ImageCard txt={"FilteredImage"} imgUrl={readyImage} SX={{backgroundColor:Colors.LightColor,color:"red",width:"440px",height:"440px",borderRadius:"30px"}}/>
      {readyImage!=null && (<Button className='buttonSemiDark' sx={{maxHeight:"40px", marginTop:"10px",background:'white'}} component="label" role={undefined} tabIndex={-1} variant="outlined" color="neutral" onClick={e=>{e.preventDefault();downloadImage(readyImage,originalImage)}}> download image </Button>)}
      </div>
      <div>
        <div style={{flexDirection:"column",backgroundColor:Colors.LightColor,width:"470px",height:"225px",margin:"5px",borderRadius:"30px",display:"flex", justifyContent:"center",alignItems:"center"}}>
        <div className="glow-text" style={{fontSize:"20px",marginBottom:"5px",fontWeight:"600"}}>Current Mode</div>
          <div style={{fontSize:"20px",marginBottom:"5px",fontWeight:"600"}}>{filter}</div>
          <UploadButton setOriginalImage={setOriginalImage}/>
          {originalImage!="" && (<Button className='buttonSemiLight' sx={{maxHeight:"40px", marginTop:"5px"}} component="label" role={undefined} tabIndex={-1} variant="outlined" color="neutral" onClick={e=>{e.preventDefault();startImageFilter()}}> Run filter </Button>)}
        </div>
      <div style={{display:"flex",flexDirection:"row"}}>
      <ImageCard txt={"OriginalImage"} imgUrl={originalImage.path} SX={{backgroundColor:Colors.LightColor,width:"200px",height:"200px",margin:"5px",borderRadius:"30px"}}/>
      <div style={{backgroundColor:Colors.LightColor,color:"red",width:"230px",height:"230px",margin:"5px",borderRadius:"30px"}}>
        <Inputs filterNum={filter}/>
        </div>
      </div>
      <div style={{position:"absolute", top:"22px", display:"flex",justifyContent:"center"}}>
     {adminInfo!="" &&  (<Button className='buttonLight' sx={{border:"none",backgroundColor: Colors.DarkColor,color:"white"}} onClick={(e)=>{e.preventDefault();ShowPop((<div><TableHover rows={adminInfo}/></div>))}}> Show users information </Button>)}
      </div>
      </div>
    </div>
    
    <div id='obj'>
    {obj}
    </div>
    </div>
  )
}

export default App

