import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="flex flex-wrap justify-between w-full rounded ">
      <Outlet />
    </div>
  );
};

export default RootLayout;
