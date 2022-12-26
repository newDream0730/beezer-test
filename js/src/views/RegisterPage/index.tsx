import {useState, useEffect} from "react";
import Register from "../../components/Register";
import {logout} from "../../actions/user";
import {Container, Grid} from "@mui/material";
import Reset from "../../components/Reset";

const RegisterPage: React.FC = () => {
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
              <Register setPage={setPage} />
            ) : (
              <Reset setPage={setPage} />
            )}
          </Grid>
        </Container>
      </main>
    </div>
  );
};

export default RegisterPage;
