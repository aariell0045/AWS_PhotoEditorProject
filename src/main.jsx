import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { getFromLocalStorage ,saveToLocalStorage} from './utils/utils.js'

function decodeJWT(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

const urlParams = new URLSearchParams(window.location.href);
const access_token = urlParams.get('access_token');

if (getFromLocalStorage("logged") == null && access_token == undefined) {
  window.location.replace("https://photoeditor.auth.us-east-1.amazoncognito.com/login?client_id=2fqsersm22rgg8rug4cvj5dt07&response_type=token&scope=email+openid+phone&redirect_uri=https%3A%2F%2Fbucket-my-app1.s3.amazonaws.com%2Findex.html");
} else {    
  if (access_token!=undefined && getFromLocalStorage("logged")==null) {
    const decodedToken = decodeJWT(access_token);
    saveToLocalStorage("logged", decodedToken["sub"]);
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
