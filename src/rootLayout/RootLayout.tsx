import { Outlet } from "react-router-dom";
import TopSellers from "../components/TopSellers";

const RootLayout = () => {
  return (
    <div className="flex flex-wrap items-start justify-between w-full rounded ">
      <Outlet />
      <TopSellers />
    </div>
  );
};

export default RootLayout;
