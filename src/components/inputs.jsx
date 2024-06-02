import { Colors, filters } from '../data/constants';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const colors = [
  { label: "red" },
  { label: "orange" },
  { label: "yellow" },
  { label: "green" },
  { label: "blue" },
  { label: "indigo" },
  { label: "violet" },
  { label: "purple" },
  { label: "pink" },
  { label: "black" },
  { label: "white" },
  { label: "gray" },
  { label: "brown" },
  { label: "cyan" },
  { label: "magenta" },
  { label: "gold" },
  { label: "silver" },
  { label: "teal" },
  { label: "olive" },
  { label: "maroon" }
];

export function ColorPicker() {
  return (
    <div className="inputParams">
    <div  style={{fontWeight:"700",textAlign:"center",color:"black",marginBottom:"10px"}}>border_color</div>
    <Autocomplete
      disablePortal
      options={colors}
      sx={{ width: 200 }}
      defaultValue={"red"}
      renderInput={(params) => <TextField {...params} label="ColorsPicker" />}
    />
    </div>
  );
}

export default function Inputs({filterNum=filters.Mirror_photo}) {
    const [Peaked, setPeaked] = useState(0);
    switch (filterNum) {
      case filters.Mirror_photo:
        return (
          <div className='menuBar' style={{display:"flex", justifyContent:"center", alignItems:"center",width:"100%",flexDirection:"column"}}>
           <AlwaysVisibleLabelSlider txt={"direction"} step={1}/>
            </div>
          );
        break;
      case filters.Gray_scale:
        return (
          <div className='menuBar' style={{display:"flex", justifyContent:"center", alignItems:"center",width:"100%",flexDirection:"column"}}>
           <AlwaysVisibleLabelSlider txt={"blur"} step={0.01} max={7} min={0.1}/>
           <AlwaysVisibleLabelSlider txt={"contrast"} step={0.01} max={5} min={0.5}/>
           <AlwaysVisibleLabelSlider txt={"brightness"} step={0.01}  max={5} min={0.5}/>
            </div>
          );
        break;
      case filters.Circular_crop:
        return (
          <div className='menuBar' style={{display:"flex", justifyContent:"center", alignItems:"center",width:"100%",flexDirection:"column"}}>
           <AlwaysVisibleLabelSlider txt={"shadow"} step={1}/>
           <AlwaysVisibleLabelSlider txt={"antialias"} step={1}/>
            </div>
          );
        break;

    }
  }

  import * as React from 'react';
import Box from '@mui/joy/Box';
import Slider from '@mui/joy/Slider';
import { Button } from '@mui/joy';



function valueText(value) {
    if(value)
  return `${value}`;
else
return `$0`;
}

function AlwaysVisibleLabelSlider({txt="",step=0.1,max=1,min=0}) {
  return (
    <Box className="inputParams" sx={{ width: "80%",color:"black",display:"flex",justifyContent:"center",flexDirection:"column"}}>
      <div style={{fontWeight:"700",textAlign:"center"}}>{txt}</div>
      <Slider
      color='warning'
        aria-label="Always visible"
        getAriaValueText={valueText}
        step={step}
        max={max}
        min={min}
        valueLabelDisplay="on"
      />
      
    </Box>
  );
}