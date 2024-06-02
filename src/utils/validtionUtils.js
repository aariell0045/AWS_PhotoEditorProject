import { SetAlert } from "../App";
import { State } from "../components/Alert";
import { Sleep } from "./utils";

const statusColors ={
  Fail:"rgba(190, 0, 0, 0.8)",
  Success:"rgba(0, 160, 0, 0.8)",
  Warning:"rgba(255,190,0)"
}

export function setBadInput(className,txt){
    let errorTxt = document.querySelector(`.${className}Txt`);
    let icon = document.querySelector(`.${className}Icon`);
    errorTxt.textContent = txt;
    icon.style.color = statusColors.Fail;
  }

  export function setGoodInput(className){
    let errorTxt = document.querySelector(`.${className}Txt`);
    let icon = document.querySelector(`.${className}Icon`);
    errorTxt.textContent = "";
    icon.style.color = statusColors.Success;
  }

  export function disableButton(className){
    let button = document.querySelector(`.${className}`);
    button.style.opacity = "0.6";
    button.style.cursor = "not-allowed"
  }

  export function releaseButton(className){
    let button = document.querySelector(`.${className}`);
    button.style.opacity = "1";
    button.style.cursor = "default"
  }

  export function validateEmail(className="email") {
    const emailInput = document.querySelector(`.${className} input`);

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (emailRegex.test(emailInput.value) && emailInput.value!="") 
    {
      setGoodInput("email");
      releaseButton("email");
      return true;
    } else {
        setBadInput("email","");
        disableButton("finishBtn")
        return false;
    }
  }

  export function validatePassword(className="password") {
    const password = document.querySelector(`.${className} input`).value;
    // Rule: Minimum eight characters, at least one uppercase letter, one lowercase letter, and one number.
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    console.log(passwordRegex.test(password) && password != "")

    if (passwordRegex.test(password) && password != "") {
        setGoodInput("password");
        releaseButton("finishBtn");
        return true;

    } else {
        setBadInput("password", "");
        disableButton("finishBtn");
        return false;

    }
    
}

export function validateRepeatedPassword(className="rePassword") {
  const rePassword = document.querySelector(`.${className} input`).value;
  const password = document.querySelector(`.password input`).value;
  let iconPasswordColor = document.querySelector(`.passwordIcon`).style.color
  if (rePassword == password && iconPasswordColor===statusColors.Success) {
      setGoodInput("rePassword");
      releaseButton("finishBtn");
      return 1;

  } else {
      setBadInput("rePassword", "");
      disableButton("finishBtn");
      return 0;
  }
}

export function validatePhoneNumber(className="phone") {
  let phone = document.querySelector(`.${className} input`);
  let value = phone.value
  const _3digits = /^\d{3}\d$/;
  if(phone.value.length==4 && _3digits.test(value))
  phone.value=value.slice(0, 3)+"-"+value.slice(3)
  const israeliPhoneNumberRegex = /^05\d-\d{7}$/;
    if (israeliPhoneNumberRegex.test(value)) {
      setGoodInput("phone");
      releaseButton("finishBtn");
      return 1;
  } else {
      setBadInput("phone", "");
      disableButton("finishBtn");
      return 0;

  }
}

export function checkInputFilled(Btn){
  let ret = true
  document.querySelectorAll("input").forEach(e=>{
    if(e.value=="")ret =false;
  })
  console.log(ret)
  if(ret)releaseButton(Btn)
  else disableButton(Btn)
  return ret
}

export function checkRegisterPage2(strings){
  let ret = true
  if(document.querySelector(".name input").value=="")
    {document.querySelector(".nameTxt").textContent=strings.nameErr;
    ret=false}
  else
  document.querySelector(".nameTxt").textContent="";

  if(document.querySelector(".lastName input").value=="")
    {document.querySelector(".nameTxt").textContent=strings.nameErr;ret=false}
  else
  document.querySelector(".nameTxt").textContent="";

  if(!validateEmail())
    {setBadInput("email",strings.emailErr);ret=false}
  else
    setGoodInput("email")

    if( !validatePassword())
    {setBadInput("password",strings.passwordErr);ret=false}
  else
    setGoodInput("password")

  if(!validateRepeatedPassword())
    {setBadInput("rePassword",strings.rePasswordErr);ret=false}
  else
    setGoodInput("rePassword")

  if(!validatePhoneNumber())
    {setBadInput("phone",strings.phoneErr);ret=false}
  else
    setGoodInput("phone")
  
    if(!ret)SetAlert("Bad","BAD",State.danger)
    else SetAlert("good","good",State.success)
    return ret
}