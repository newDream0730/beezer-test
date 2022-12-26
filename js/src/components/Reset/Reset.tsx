import {
  Button,
  Card,
  CardMedia,
  CardContent,
  Typography,
  TextField,
  CardActions,
} from "@mui/material";
import React, {useState} from "react";
import {resetPassword} from "../../actions/user";
interface ResetProps {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const Reset = (props: ResetProps) => {
  const [email, setEmail] = useState("");
  const [isSuccess, setisSuccess] = useState<boolean>();
  const handlePassReset = async () => {
    const response = await resetPassword(email);
    if (response.status === 200) setisSuccess(true);
    else {
      setisSuccess(false);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        flexDirection: "column",
        height: "95vh",
        justifyContent: "center",
      }}
    >
      <Card
        sx={{
          width: "350px",
          height: "280px",
          backgroundColor: "transparent",
        }}
        elevation={0}
      >
        <CardContent>
          <Typography variant="h5" component="h2">
            EcoSync Stock Password reset
          </Typography>

          <TextField
            error={isSuccess === false && true}
            variant="standard"
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {isSuccess === true && (
            <Typography variant="subtitle1">
              Password reset email sent!
            </Typography>
          )}
          {isSuccess === false && (
            <Typography
              variant="subtitle2"
              sx={{
                color: "red",
              }}
            >
              Email does not exists!
            </Typography>
          )}
        </CardContent>
        <CardActions sx={{marginBottom: "60px", padding: "16px"}}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handlePassReset}
              sx={{
                width: "100%",
              }}
            >
              Reset your password
            </Button>
            <Typography
              onClick={() => props.setPage(0)}
              variant="subtitle1"
              sx={{
                textDecoration: "none",
                color: "#0645AD",
                cursor: "pointer",
                marginTop: "10px",
              }}
            >
              Back
            </Typography>
          </div>
        </CardActions>
      </Card>
    </div>
  );
};

export default Reset;
