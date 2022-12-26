import {Button} from "@mui/material";

import {logout} from "../../actions/user";
import {useNavigate} from "react-router-dom";
const LogoutButton = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    const response = await logout();
    if (response.status === 200) {
      navigate("/login");
    }
  };
  return (
    <Button
      sx={{
        backgroundColor: "gray",
        color: "white",
        "&:hover": {
          backgroundColor: "gray",
          color: "white",
        },
      }}
      onClick={handleLogout}
    >
      Log out
    </Button>
  );
};

export default LogoutButton;
