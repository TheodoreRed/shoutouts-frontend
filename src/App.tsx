import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ShoutoutList from "./components/ShoutoutList";
import Header from "./components/Header";
import UserShoutouts from "./components/UserShoutouts";
import { useState } from "react";
import MeRoute from "./routes/MeRoute";

function App() {
  const [userName, setUserName] = useState<string>("");

  const getUserNameFromPath = (uName: string) => {
    setUserName(uName);
  };

  return (
    <BrowserRouter>
      <Header userName={userName} />
      <Routes>
        <Route path="/" element={<ShoutoutList userName={userName} />} />
        <Route
          path="/user/:name"
          element={<UserShoutouts getUserNameFromPath={getUserNameFromPath} />}
        />
        <Route path="/me" element={<MeRoute />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
