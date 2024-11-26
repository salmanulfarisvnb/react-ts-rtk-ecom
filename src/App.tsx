import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./rootLayout/RootLayout";
import Home from "./page/Home";
import Sidebar from "./components/Sidebar";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
      </Route>
    ),
    {
      basename: "/react-ts-rtk-ecom",
    }
  );
  return (
    <div className="flex h-screen">
      <Sidebar />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
