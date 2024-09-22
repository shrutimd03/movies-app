import { useEffect } from "react";
import Layout from "./components/Layout";
import { Outlet } from "react-router-dom";

function App() {
  useEffect(() => {
    localStorage.removeItem('chakra-ui-color-mode');
  }, []);

  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}

export default App
