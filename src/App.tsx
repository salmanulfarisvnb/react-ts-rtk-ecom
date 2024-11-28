import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./rootLayout/RootLayout";

import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<MainContent />} />
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
