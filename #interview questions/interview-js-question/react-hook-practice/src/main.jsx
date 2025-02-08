import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { MyContextPrvider } from "./hooks/Usecontext.jsx";

createRoot(document.getElementById("root")).render(
  <MyContextPrvider>
    <App />
  </MyContextPrvider>
);
