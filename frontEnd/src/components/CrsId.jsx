import Button from "@mui/material/Button";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../config";
import TextField from "@mui/material/TextField";
import Card from '@mui/material/Card';
import { Typography } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

function CrsId(){

    const navigate = useNavigate();
    const [course, setCourse] = useState({});
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [imageLink, setImageLink] = useState("");
    const [published, setPublished] = useState(false);
    const courseId = useParams().courseId;

    const getItem = async()=>{
        const response = await axios.get(`${BASE_URL}/admin/course/`+courseId,{
            headers: {
                "Content-type": "application/json",
                "authorization": "Bearer "+localStorage.getItem("AcaToken")
            }
        });
        setCourse(response.data.course);
    }

    useEffect(()=>{getItem()},[courseId]);
    useEffect(() => {
        setTitle(course.title);
        setDescription(course.description);
        setPrice(course.price);
        setImageLink(course.imageLink);
        setPublished(course.published);
    }, [course]);

    const handlePub=()=>{
        setPublished(!published);
    }

    return<div>
        <p style={{textAlign:"center", font: "25px Arial, sans-serif"}}>Welcome to AcaDemy, Update the Course below:<br/></p>
      <br/>
      <Button
          style={{marginLeft:"55px", marginTop:"-25px"}} 
          size="large" 
          variant={"contained"}
          onClick={()=>{navigate("/admin/courses")}}>
          Back
      </Button><br/>

      <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent:"center"
      }}>

      <Card variant="outlined" style={{width:230, padding: 20, minHeight:200, margin:"15px"}}>
        <div>
          <Typography variant="h5" textAlign={"center"}>{title}</Typography>
          <Typography variant="" textAlign={"center"}>{description}</Typography><br/>
          <Typography variant="" textAlign={"center"}>Price: {price}</Typography><br/>
          <Typography variant="" textAlign={"center"}>Published: {published?"true":"false"}</Typography>
          <div style={{display:"flex", justifyContent:"center", marginTop:"10px"}}><img src={imageLink} width="220px"/></div>
        </div>
    </Card>

    <Card variant="outlined" style={{width:400, padding: 20}}>
      <TextField 
        fullWidth={true} 
        id="title" 
        label="Title" 
        value={title}
        variant="outlined" 
        onChange={(e)=>{
          setTitle(e.target.value);
        }}
      />
      <br/><br/>
      <TextField 
        fullWidth={true} 
        id="pass" 
        label="Description" 
        value={description}
        type="text"
        variant="outlined"   
        onChange={(e)=>{
          setDescription(e.target.value);
        }}       
      />
      <br/><br/>
      <TextField 
        fullWidth={true} 
        id="prc" 
        label="Price" 
        value={price}
        type="number"
        variant="outlined"   
        onChange={(e)=>{
          setPrice(e.target.value);
        }}       
      />
      <br/><br/>
      <TextField 
        fullWidth={true} 
        id="img" 
        label="Image Link" 
        value={imageLink}
        type="text"
        variant="outlined"   
        onChange={(e)=>{
          setImageLink(e.target.value);
        }}       
      />
      <br/><br/>
      <FormControlLabel 
        control={<Checkbox checked = {published} />} 
        label="Published" 
        onChange={handlePub}
      />
      <br/><br/>
      <Button 
        size="large"
        variant="contained"
        onClick={()=>{
          fetch(`${BASE_URL}/admin/courses/`+courseId, {
            method: "PUT",
            body: JSON.stringify({
              title,
              description,
              price,
              imageLink,
              published
            }),
            headers: {
              "Content-type": "application/json",
              "authorization": "Bearer "+localStorage.getItem("AcaToken")
            }
          }).then((res)=>{
            res.json().then((data)=>{
              alert(data.message);
            })
          })
        }}
      >Update Course</Button>
    </Card>
    </div>
    </div>
}

export default CrsId;