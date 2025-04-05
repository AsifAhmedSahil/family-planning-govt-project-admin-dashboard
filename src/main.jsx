import { createRoot } from "react-dom/client";

import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Import Bootstrap JS (with Popper)

// import App from "./App";
import { StrictMode } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { UserProvider } from "./context/UserProvider";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
      <Toaster position="bottom-right"/>
    </UserProvider>
  </StrictMode>
);
