import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  TextField,
  Typography,
  Box
} from "@mui/material";
import React, {useState} from "react";
import {useNavigate, Link} from "react-router-dom";
import {login} from "../../actions/user";

interface LoginProps {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const Login = (props: LoginProps) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [errorState, setErrorState] = useState(false);
  const navigate = useNavigate();
  const handleLogin = async () => {
    const loginResponse = await login(email, pass);
    if (loginResponse?.accessToken) {
      navigate("/");
    } else {
      setErrorState(true);
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
            Beezer test
          </Typography>
          <TextField
            error={errorState}
            variant="standard"
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            error={errorState}
            variant="standard"
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
          {errorState && (
            <Typography
              variant="subtitle2"
              sx={{
                color: "red",
              }}
            >
              Invalid email or password
            </Typography>
          )}
        </CardContent>
        <CardActions sx={{padding: '16px'}}>
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
              onClick={handleLogin}
              sx={{
                width: "100%",
              }}
            >
              Login
            </Button>
            <Box sx={{width: "100%", display: 'flex', justifyContent: 'space-between', mt: 2}}>
              <div onClick={() => props.setPage(1)} style={{cursor: 'pointer'}}>
                Forgotten Password
              </div>
              <Link to={'/register'}>Register</Link>
            </Box>
          </div>
        </CardActions>
      </Card>
    </div>
  );
};

export default Login;
