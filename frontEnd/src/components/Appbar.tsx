import * as React from 'react';
import { useNavigate} from "react-router-dom";
import { useRecoilValue } from "recoil";
import {userEmailState} from "../store/selectors/userEmailState";
import {isUserLoading} from "../store/selectors/isUserLoading";
import {name} from "../store/selectors/name";
import {userRole} from "../store/selectors/userRole";
import SearchBar from "../store/elements/Searchbar"
import Cart from "../store/elements/cart";
import "./Appbar.css";
import Dropdown from '../store/elements/Dropdown';

const Appbar: React.FC = () => {
  
  const categories = ['Electronics', 'Clothing', 'Books', 'Home & Garden'];
  
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const navigate = useNavigate();
  const userEmail = useRecoilValue(userEmailState);
  const userLoading = useRecoilValue(isUserLoading);
  const name_:string = useRecoilValue(name);
  const role = useRecoilValue(userRole);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  
  const handleClick = (event:any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  if(userLoading){
    return <center><h1>Loading</h1></center>;
  }

  return (  
  <div style={{
    display:"flex",
    justifyContent:"space-between",
    width:"100 vw",
    height:"60px",
    borderBottom:"2mm ridge #2799be"
  }}>
    <div style={{ display:"flex", marginLeft: 10 }}>
      <div style={{ marginRight: 20, cursor: "pointer"}} onClick={() => { navigate("/"); }}>
        <img src='../src/assets/init.png' style={{ width:"200px", height:"50px" }} alt="AcaDemy"/>
      </div>
      <div style={{ marginTop:5, marginRight:10 }}>
        <Dropdown title="Categories" items={categories} />
      </div>
      <div style={{ marginTop:5, marginLeft:10 }}>
        <SearchBar/>        
      </div>
    </div>

    {!userEmail ? (
    <div style={{display: "flex"}}>

      <div style={{ marginRight:10, marginTop:5 }}>
        <button
          id="pricing"
          onClick={() => {
            navigate("/?authMode=signup")
          }}
          // disabled={loc.pathname==="/signin"}
        >Free Demo</button>
      </div>

      <div style={{ marginRight:10, marginTop:5 }}>
        <button
          id="pricing"
          onClick={() => {
            navigate("/?authMode=signup")
          }}
          // disabled={loc.pathname==="/signin"}
        >Pricing</button>
      </div>

      <div style={{ cursor:"pointer", alignContent:"center", marginRight:20, marginLeft:-10 }}><Cart/></div>

      <div style={{ marginRight: 10, marginTop:5}}>
        <button
          id="login"
          onClick={() => {
            navigate("/?authMode=login")
          }}
          // disabled={loc.pathname==="/signup"}
        >Login</button>
      </div>

      <div style={{ marginRight:10, marginTop:5 }}>
        <button
          id="signup"
          onClick={() => {
            navigate("/?authMode=signup")
          }}
          // disabled={loc.pathname==="/signin"}
        >Signup</button>
      </div>
    </div>) :  
      (<div style={{ marginRight:20, marginTop: 3, cursor: "pointer" }}>
        {/* <Avatar onClick={handleClick}
          sx={{ bgcolor: deepOrange[500], width: 46, height: 46, fontSize: 20, cursor: "pointer" }}>{name_.charAt(0)}
        </Avatar>
        <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}>
          <div style={{margin:20, display:"flex", flexDirection:"column", fontSize:"15px", fontFamily:"sans-serif"}}>
            {role==='user'&&(<div className="popo" onClick={()=>{navigate("/user/courses/?purchased=true")}}>My Courses</div>)}
            <div className="popo" onClick={()=>{}}>Profile</div>
            <div className="popo" onClick={()=>{localStorage.removeItem("AcaToken"); window.location.href="/";}}>Log Out</div>
          </div>
          </Popover> */}
        </div>
      )}
    </div>
  );
};

export default Appbar;
