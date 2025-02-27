import { createRoot } from "react-dom/client";

import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap JS (with Popper)

// import App from "./App";
import { StrictMode } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./router";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
