
import * as React from 'react';
import Table from '@mui/joy/Table';
import { getFromLocalStorage, postRequest } from '../utils/utils';

function createData(userName, Email, registred_date) {
    return { userName, Email, registred_date };
  }
  
  const dataExmaple = [
    createData('Frozen yoghurt', 159, 6.0),
    createData('Ice cream sandwich', 237, 9.0),
    createData('Eclair', 262, 16.0),
    createData('Cupcake', 305, 3.7),
    createData('Gingerbread', 356, 16.0),
  ];

  function processData(jsonData) {

    const processedData = [];
    
    for (const user of jsonData) {
      const userData = createData(user.userName, user.Email, user.registred_date);
      processedData.push(userData);
    }
    
    return processedData;
  }
  
  export async function getAdminData(setAdminInfo){
    const uploadToAwsImgAPI = 'https://pglpodtj62.execute-api.us-east-1.amazonaws.com/prod/CheckAdmin';
    let reqBody = {
        "user_id": getFromLocalStorage("logged"),
    }
        let body = await postRequest(uploadToAwsImgAPI,reqBody)
        if(body == "" || body ==null)
        {
            setAdminInfo("");
            return
}
setAdminInfo(processData(body))
  }
  
  export default function TableHover({rows= dataExmaple}) {
    return (
      <Table hoverRow>
        <thead>
          <tr>
            <th>userName</th>
            <th>Email</th>
            <th>registred date</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.userName}>
              <td>{row.userName}</td>
              <td>{row.Email}</td>
              <td>{row.registred_date}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }