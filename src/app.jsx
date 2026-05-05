//import './app.css';
import { Outlet as RouterOutlet } from "react-router-dom";
import { ContainerFullWidth } from "@/components";
import { Header } from "./components/header";
//this should copy with copy-seed.ps1
export const App = (props) => {
  const { menu } = props;

  return (
    <>
      <Header menu={menu} />
      <ContainerFullWidth>
      <div style={{ width: "100%" }}>
        <RouterOutlet />
      </div>
      </ContainerFullWidth>
    </>
  );
};

export default App;
