import { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { BASE_URL } from "../config";
import {useRecoilValue} from "recoil";
import {userRole} from "../store/selectors/userRole"
import axios from "axios";

const handlePurchase = async(courseId:string)=>{
    const response = await axios.post(`${BASE_URL}/user/courses/`+courseId, {},{
        headers:{
            "Content-type":"application/json",
            "authorization": "Bearer "+localStorage.getItem("AcaToken")
        }
    });
    alert(response.data.message);
}
const handleDelete = async(courseId:string)=>{
    const response = await axios.delete(`${BASE_URL}/admin/course/`+courseId,{
        headers:{
            "Content-type":"application/json",
            "authorization": "Bearer "+localStorage.getItem("AcaToken")
        }
    });
    alert(response.data.message);
}

function Courses(){
    const [courses, setCourses] = useState<CourseType[]>([]);
    const navigate = useNavigate();
    const role = useRecoilValue(userRole);

    const render = async()=>{
        const resp = await axios.get(`${BASE_URL}/${role}/courses`,{
            headers:{
                "Content-type":"application/json",
                "authorization": "Bearer "+localStorage.getItem("AcaToken")
            }
        });
        setCourses(resp.data.courses);
    }

    useEffect(()=>{render();},[role, courses]);

    return <>
    <br/>
      <Button
          style={{marginLeft:"55px", marginTop:"0px"}} 
          size="large" 
          variant={"contained"}
          onClick={()=>{navigate("/")}}>
          Back
      </Button><br/>
        <div style={{display:"flex", justifyContent:"center", flexWrap:"wrap"}}>
            {courses.map(course => {return <Course role={role} key={course._id} course={course} />})}
        </div>
    </>
}

function Course(props:createProp):React.ReactNode{
    const navigate=useNavigate();
    return <Card variant="outlined" style={{width:"380px", padding: 20, minHeight:200, margin:"5px"}}>
        <div>
            <Typography variant="h4" textAlign={"center"}>{props.course.title}</Typography>
            <Typography textAlign={"center"}>Id: {props.course._id}</Typography>
            <Typography variant="h5" textAlign={"center"}>{props.course.description}</Typography>
            <Typography variant="h6" textAlign={"center"}>Price: {props.course.price}</Typography>
            <Typography variant="h6" textAlign={"center"}>Published: {props.course.published?"true":"false"}</Typography>
            <div style={{display:"flex", justifyContent:"center", marginTop:"10px"}}><img src={props.course.imageLink} width="220px"/></div>
            <br/><br/>
            {(props.role==='admin')&&(<Button 
                size="large" 
                variant={"contained"}
                onClick={()=>{navigate("/admin/courses/"+props.course._id)}}>
                Update Course
            </Button>)}
            <br/><br/>
            {(props.role==='user')&&(<Button 
                size="large" 
                variant={"contained"} 
                onClick={()=>{handlePurchase(props.course._id)}}>
                Purchase Course
            </Button>
            )}
            {(props.role==='admin')&&(<Button 
                size="large" 
                variant={"contained"}
                onClick={()=>{handleDelete(props.course._id)}}>
                Delete Course
            </Button>
            )}
        </div>
    </Card>
}

export default Courses;


interface CourseType{
  _id: string,
  role: string,
  adminID: string,
  adminName: string,
  title: string,
  description: string,
  price: number,
  imageLink: string,
  published: boolean
}

interface createProp {
  key: string,
  course: CourseType,
  role: string
}