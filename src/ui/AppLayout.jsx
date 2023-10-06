import { Outlet, useNavigation } from "react-router";
import Header from "./Header";
import Loader from "./Loader";
// import Footer from "./Footer";
function AppLayout() {
  const status = useNavigation().state;
  return (
    <div>
      {status === "loading" && <Loader />}
      <Header />
      <Outlet />
      {/* <Footer /> */}
    </div>
  );
}

export default AppLayout;
