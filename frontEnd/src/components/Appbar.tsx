import * as React from 'react';
import { useNavigate} from "react-router-dom";
import { useRecoilValue } from "recoil";
import {userEmailState} from "../store/selectors/userEmailState";
import {isUserLoading} from "../store/selectors/isUserLoading";
import {name} from "../store/selectors/name";
import {userRole} from "../store/selectors/userRole";
import SearchBar from "../store/elements/Searchbar"
import { Cart, Bars, ThemeIcon } from "../store/elements/cart";
import "./Appbar.css";
import Dropdown from '../store/elements/Dropdown';

const Appbar: React.FC = () => {
  
  const categories = [
    {
      label: 'Electronics',
      children: [
        { label: 'Computers' },
        { label: 'Smartphones' },
        {
          label: 'Accessories',
          children: [
            { label: 'Headphones' },
            { label: 'Chargers' },
          ],
        },
      ],
    },
    {
      label: 'Clothing',
      children: [
        { label: 'Men' },
        { label: 'Women' },
        { label: 'Children' },
      ],
    },
    { label: 'Books' },
    {
      label: 'Home & Garden',
      children: [
        { label: 'Furniture' },
        { label: 'Decor' },
        { label: 'Gardening' },
      ],
    },
  ];
  
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
    <div className='flex sticky items-center justify-between h-16 w-screen border-b-2 border-[#034359] shadow-md sm:h-20 z-50'>
    <div className="flex cursor-pointer ml-2 px-4 md:hidden"><Bars/></div>
      <div className='flex justify-center'>
      <div className='mr-5 ml-2 cursor-pointer' onClick={() => { navigate("/"); }}>
        <img className='w-38 h-12 sm:w-52 sm:h-14 md:ml-4' src='../src/assets/init.png' alt="AcaDemy"/>
      </div>
      
      <div className='hidden lg:flex mr-32'>
        <Dropdown title="Categories" items={categories} />
      </div>
      <div className='hidden lg:flex ml-4'>
        <SearchBar/>        
      </div>
      </div>

      <div className='flex items-center justify-center'>
        <div className='mx-2 mr-2 md:mr-6 cursor-pointer'><ThemeIcon/></div>
        <div className='mx-2 mr-6 cursor-pointer'><Cart/></div>
        
        {!userEmail ? (
        <div className='hidden md:flex'>
        <div className='hidden lg:flex mr-2'>
          <button
            id="pricing"
            onClick={() => {
              navigate("/?authMode=signup")
            }}
          >Free Demo</button>
        </div>
  
        <div className='hidden lg:flex top-1'>
          <button
            id="pricing"
            onClick={() => {
              navigate("/?authMode=signup")
            }}
          >Pricing</button>
        </div>
        
        <div className='mr-2'>
          <button
            id="login"
            onClick={() => {
              navigate("/?authMode=login")
            }}
          >Login</button>
        </div>
  
        <div className='mr-3'>
          <button
            id="signup"
            onClick={() => {
              navigate("/?authMode=signup")
            }}
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
    </div>
  );
};

export default Appbar;
