import React from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

function UserLanding() {
  const navigate = useNavigate();

  return (
    <div>
      <div style={{ margin: 20 }}>
        <Button
          variant={"contained"}
          onClick={() => {
            navigate("/user/courses");
          }}
        >
          View Courses
        </Button>
      </div>
    </div>
  );
}

export default UserLanding;
