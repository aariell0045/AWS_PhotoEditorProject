import { Button, ButtonGroup } from '@mui/joy';
import AlertCustomeModule from './Alert';
const { AlertCustome,State } = AlertCustomeModule;
import { Colors, filters } from '../data/constants';
import { SetAlert } from '../App';
import { useState } from 'react';
import { removeFromLocalStorage } from '../utils/utils';


export default function NavBar({setFilter}) {
    const [Peaked, setPeaked] = useState(0);

      return (
      <div className='menuBar' style={{height:"10vh",position:"absolute",top:"20px",width:"100vw",left:0}}>
        <ButtonGroup variant="outlined" sx={{position:"fixed", left:"10px",display:"inline-block" }}>
        <Button className="buttonLight" sx={{border:"none",backgroundColor:Peaked==0?Colors.DarkColorOpacity:Colors.DarkColor,color:"white"}} onClick={e=>{e.preventDefault() ;setPeaked(0);setFilter(filters.Mirror_photo)}}>Mirror_photo</Button>
        <Button className="buttonLight" sx={{border:"none",backgroundColor:Peaked==1?Colors.DarkColorOpacity:Colors.DarkColor,color:"white"}} onClick={e=>{e.preventDefault() ;setPeaked(1);setFilter(filters.Circular_crop)}}>Circular_crop</Button>
        <Button className="buttonLight" sx={{border:"none",backgroundColor:Peaked==2?Colors.DarkColorOpacity:Colors.DarkColor,color:"white"}} onClick={e=>{e.preventDefault() ;setPeaked(2);setFilter(filters.Gray_scale)}}>Gray_scale</Button>
      </ButtonGroup>

        <ButtonGroup variant="outlined" sx={{position:"fixed", right:"10px",display:"inline-block"  }}>
        <Button className="buttonLight" sx={{zIndex:10,border:"none",backgroundColor:Peaked==2?Colors.DarkColorOpacity:Colors.DarkColor,color:"white"}} onClick={e=>{e.preventDefault() ;removeFromLocalStorage("logged");window.location.replace("https://photoeditor.auth.us-east-1.amazoncognito.com/login?client_id=2fqsersm22rgg8rug4cvj5dt07&response_type=token&scope=email+openid+phone&redirect_uri=https%3A%2F%2Fbucket-my-app1.s3.amazonaws.com%2Findex.html")}}>Logout</Button>
      </ButtonGroup>
      
      </div>
      );
  }