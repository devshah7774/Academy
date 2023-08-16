import React, { useState } from 'react';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Card from '@mui/material/Card';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

function AddCourse() {
  
  const [title, setTitle]=useState("");
  const [imageLink, setUrl]=useState("");
  const [description, setDescription]=useState("");
  const [price, setPrice]=useState(0);
  const [published, setPub]=useState(false);

  const handlePub=()=>{
    setPub(!published);
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: 100,
          marginBottom: 20,
          // backgroundColor: "#bbbb23"
        }}
      >
        Welcome to Coursera, Add Course below:
      </div>
      <div  style={{display:"flex", justifyContent:"center"}}>
      <Card variant="outlined" style={{width:400, padding: 20}}>
        <TextField 
          fullWidth={true} 
          id="title" 
          label="Title" 
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
          type="url"
          variant="outlined"   
          onChange={(e)=>{
            setUrl(e.target.value);
          }}       
        />
        <br/><br/>
        <FormControlLabel 
          control={<Checkbox />} 
          label="Published" 
          onChange={handlePub}
        />
        <br/><br/>
        <Button 
          size="large"
          variant="contained"
          onClick={()=>{
            fetch("http://localhost:3000/admin/courses", {
              method: "POST",
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
        >Create Course</Button>
      </Card>
      </div>
    </>
  );
}

export default AddCourse;
