import {useState, useEffect} from "react";
import Login from "../../components/Login";
import {logout} from "../../actions/user";
import {Container, Grid} from "@mui/material";
import Reset from "../../components/Reset";

const LoginPage: React.FC = () => {
  const [page, setPage] = useState(0);
  useEffect(() => {
    logout();
  }, []);

  return (
    <div>
      <main>
        <Container fixed>
          <Grid container>
            {page === 0 ? (
              <Login setPage={setPage} />
            ) : (
              <Reset setPage={setPage} />
            )}
          </Grid>
        </Container>
      </main>
    </div>
  );
};

export default LoginPage;
