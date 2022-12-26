import RootRouter from "./routes";
import Header from "./components/Header";
import {useAuth} from "./context/authContext";

function App() {
  const user = useAuth();
  return (
    <>
      {
        !user.user?(''):(
          <Header />
        )
      }
      <RootRouter />
    </>
  );
}

export default App;
