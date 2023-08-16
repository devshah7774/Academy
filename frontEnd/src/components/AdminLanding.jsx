import React from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

function AdminLanding() {
  const navigate = useNavigate();

  return (
    <div>
      <div style={{ margin: 20 }}>
        <Button
          variant={"contained"}
          onClick={() => {
            navigate("/admin/addcourse");
          }}
        >
          Create Course
        </Button>
      </div>
      <div style={{ margin: 20 }}>
        <Button
          variant={"contained"}
          onClick={() => {
            navigate("/admin/courses");
          }}
        >
          View Courses
        </Button>
      </div>
    </div>
  );
}

export default AdminLanding;
