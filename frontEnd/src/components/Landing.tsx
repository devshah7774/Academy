import {useRecoilValue} from "recoil";
// import { location } from "../store/atoms/location";
import {userRole} from "../store/selectors/userRole"
// import {createPortal} from "react-dom";
import "./SignUpIn.css"
// import Signup from "./SignUp";
// import SignIn from "./SignIn";
// import AdminLanding from "./AdminLanding";
// import UserLanding from "./UserLanding";
import { ImageSlider } from "../store/elements/ImageSlider";

const SliderImages = ["slider-1", "slider-2", "slider-3", "slider-4", "slider-5"];

function Landing(){
  const role = useRecoilValue(userRole);
  // const loc = useRecoilValue(location);
  // const authMode = new URLSearchParams(loc.search).get("authMode");

  return(<div>

    {(role==="")&&<ImageSlider imageUrls={SliderImages}/>}
{/*     
    {authMode==="signup" && createPortal(
      <Signup/>,
      document.body
    )}
    {authMode==="login" && createPortal(
      <SignIn/>,
      document.body
    )}
    {(authMode==="signup" || authMode==="login") && <div className="overlay"/>}

    {(role==="user")&&<div>
      <h1>User Landing Page</h1>
      <UserLanding/>
    </div>}

    {(role==="admin")&&<div>
      <AdminLanding/>
    </div>} */}
  </div>);
}

export default Landing;