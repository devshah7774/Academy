import "./SignUpIn.css"
import {useNavigate} from "react-router-dom"
import { useState } from "react";
import { BASE_URL } from "../config";
import axios from "axios";
import UserAdmin from "../store/muiCompo/UserAdmin";
import { useRecoilValue } from "recoil";
import { typeuser } from "../store/atoms/typeuser";

function Signup(){
  const navigate = useNavigate();
  const [showPass, setshowPass] = useState(false);
  const [name, setName] = useState("");
  const [username, setuserName] = useState("");
  const [password, setPassword] = useState("");
  const usertypo = useRecoilValue(typeuser);

   function isOk(){
    let str="";
    if(!name)str+="Name is empty";

    if(!username){str+="\nEmail is empty";}
    else{
      let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if(!emailPattern.test(username))str+="\nWrong email format";
    }   

    if(!password)str+="\nPassword is empty";

    if(usertypo==="")str+="\nSelect your role";

    if(str!==""){alert(str); return false;}
    return true;
  }

  return(<div className="signup">

    <div className="crossdiv" title="Back">
      <button type="button" className="btn-close" onClick={()=>{navigate("/")}}>
        <span className="icon-cross"></span>
        <span className="visually-hidden"></span>
      </button>
    </div>
    
    <h1 className="h1">Sign Up</h1>

    <p style={{fontFamily:"Open Sans", color:"#737373", fontSize:"17px", lineHeight:"21px", margin:"8px auto 0px", textAlign:"center"}}>
      Learn on your own time from top<br />universities and businesses.
    </p>

    <div className="heading">
      <label style={{fontFamily:"Arial", fontSize:"15px"}}>Full Name</label>
    </div>
    <div style={{paddingLeft:"4em", marginTop:"5px"}}>
      <input type="text" className="input-box" placeholder="Enter your full name" onChange={(e)=>{setName(e.target.value)}}/>
    </div>

    <div className="heading">
      <label style={{fontFamily:"Arial", fontSize:"15px"}}>Email</label>
    </div>
    <div style={{paddingLeft:"4em", marginTop:"5px"}}>
      <input type="text" className="input-box" placeholder="username@email.com" onChange={(e)=>{setuserName(e.target.value)}}/>
    </div>

    <div className="heading">
      <label style={{fontFamily:"Arial", fontSize:"15px"}}>Password</label>
    </div>
    <div style={{paddingLeft:"4em", marginTop:"5px", display:"flex", flexDirection:"row"}}>
      <input type={showPass?"text":"password"} className="input-box" placeholder="Create Password" onChange={(e)=>{setPassword(e.target.value)}}/>
      <svg className="eye-container" width="50" height="30" viewBox="0 0 100 60" onClick={()=>{setshowPass(!showPass)}}>
        <ellipse cx="50" cy="30" rx="20" ry="12" fill="none" stroke="black" strokeWidth="1.5" />
        <circle cx="50" cy="30" r="7" fill="none" stroke="black" strokeWidth="1.5" />
        {!showPass && <line x1="35" y1="50" x2="63" y2="10" stroke="black" strokeWidth="1.5" />}
      </svg>
    </div>

    <div style={{marginLeft:"6em", marginTop:"1em", marginBottom:"-1em"}}>
      <UserAdmin/>
    </div>

    <div 
      className="signup-button"
      onClick={async()=>{
        if(!isOk())return;
        const response = await axios.post(`${BASE_URL}/${usertypo}/signup`,{
          username, password, name
        })
        let data = response.data;
        alert(data.message);
        localStorage.setItem("AcaToken", data.token);
        if(!(response.status==403))navigate("/");
      }}
    >Sign up for free</div>

    <div className="divider">
      <div className="divider-line"></div>
      <div className="divider-text">or</div>
      <div className="divider-line"></div>
    </div>
    
    <div className="google" onClick={()=>{alert("Will be available soon!!")}}>
      <img src="../src/assets/google.png" style={{height:"28px", width:"28px", marginLeft:"-50%", marginRight:"25%"}} />
      Continue with Google
    </div>

    <div style={{display:"flex", justifyContent:"center"}}>
      Already on AcaDemy? 
      <label onClick={()=>{navigate("/?authMode=login")}} style={{color:"blue", marginLeft:"3px", cursor:"pointer"}}>Log In</label>
    </div>

  </div>);
}

export default Signup;