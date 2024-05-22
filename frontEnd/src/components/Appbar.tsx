import { deepOrange } from "@mui/material/colors";
import Avatar from "@mui/material/Avatar";
import { LinearProgress } from "@mui/material";
import Button from "@mui/material/Button"
import Popover from '@mui/material/Popover';
import { useNavigate} from "react-router-dom";
import { useRecoilValue } from "recoil";
import {userEmailState} from "../store/selectors/userEmailState";
import {isUserLoading} from "../store/selectors/isUserLoading";
import {name} from "../store/selectors/name";
import {userRole} from "../store/selectors/userRole";
import * as React from 'react';
import "./Appbar.css";

const Appbar: React.FC = () => {
  
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
    return <center><LinearProgress/></center>;
  }

  return (  
  <div style={{
    display:"flex",
    justifyContent:"space-between",
    width:"100 vw",
    height:"60px",
    borderBottom:"2mm ridge #2799be"
  }}>
    <div
      style={{ marginLeft: 10, cursor: "pointer" }}
      onClick={() => {
        navigate("/");
    }}>
      <img src='../src/assets/init.png' style={{width:"200px", height:"80%"}} alt="AcaDemy"/>
    </div>

    {!userEmail ? (<div style={{display: "flex"}}>
      <div style={{marginRight: 10, marginTop:10}}>
        <Button
          className="glow-on-hover"
          variant={"contained"}
          onClick={() => {
            navigate("/?authMode=signup")
          }}
          // disabled={loc.pathname==="/signup"}
        >Signup</Button>
      </div>

      <div style={{marginTop:10, marginRight:10}}>
        <Button
          variant={"contained"}
          onClick={() => {
            navigate("/?authMode=login")
          }}
          // disabled={loc.pathname==="/signin"}
        >Signin</Button>
      </div>
    </div>) :  
      (<div style={{ marginRight:20, marginTop: 3, cursor: "pointer" }}>
        <Avatar onClick={handleClick}
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
          </Popover>
        </div>
      )}
    </div>
  );
};

export default Appbar;
