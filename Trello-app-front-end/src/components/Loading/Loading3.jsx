import React, { useEffect } from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

export const Loading3 = (props) => {
  return (
    <Stack sx={{ width: "100%", text: "center" }}>
      <Alert severity="success">{props.message}</Alert>
    </Stack>
  );
};
