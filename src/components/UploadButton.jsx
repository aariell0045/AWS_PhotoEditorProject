import * as React from 'react';
import Button from '@mui/joy/Button';
import SvgIcon from '@mui/joy/SvgIcon';
import { styled } from '@mui/joy';
import { Sleep, getFromLocalStorage, postRequest } from '../utils/utils';
import { SetAlert } from '../App';
import { State } from './Alert';

let imageInfo

async function handleImageUpload(event,setOriginalImage) {
  const file = event.target.files[0];
  if (file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = function (e) {
        const imageDataUrl = e.target.result;
        imageInfo = {
          path: imageDataUrl,
          fileName: file.name,
          fileSize: file.size,
          fileType: file.type.replace(/image\//g, ""),
          base64: imageDataUrl.split(',')[1]
        };
        setOriginalImage(imageInfo)
        resolve(imageInfo);
      };
      reader.onerror = function (error) {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  }
  return
}


const VisuallyHiddenInput = styled('input')`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

export default function UploadButton({setOriginalImage}) {

  async function uploadImgAWS(){
    const uploadToAwsImgAPI = 'https://pglpodtj62.execute-api.us-east-1.amazonaws.com/prod/upload_image';
    let reqBody = {
        "base64": imageInfo.base64,
        "user_id": getFromLocalStorage("logged"),
        "Type": imageInfo.fileType
    }
        let body = await postRequest(uploadToAwsImgAPI,reqBody)
        console.log(body)

        if(body!= null){
          let imageUrl = body["image_url"]
          return true
        }
        SetAlert("failed to upload image to aws", "", State.danger);
  return null
}



  return (
    <Button
    className='buttonSemiLight'
      sx={{maxHeight:"40px"}}
      component="label"
      role={undefined}
      tabIndex={-1}
      variant="outlined"
      color="neutral"
      startDecorator={
        <SvgIcon sx={{margin:"0 3px 0 3px"}}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
            />
          </svg>
        </SvgIcon>
      }
    >
      Upload Image
      <VisuallyHiddenInput type="file" 
      onChange={async (e)=>{e.preventDefault();setOriginalImage("");await handleImageUpload(e,setOriginalImage);uploadImgAWS()}}/>
    </Button>
  );
}