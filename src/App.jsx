import * as React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Lobby from "./routes/Lobby";
import Join from "./routes/Join";
import Course from "./routes/Course";
import Undefined from "./routes/Undefined";
import "./style/style.css";
import { socket } from "./services/socket";

export default function App() {
  return (
      <Routes>
        <Route path="/" element={<Home socket={socket} />} />
        <Route path="/join/:gameId" element={<Join socket={socket}/>}/>
        <Route path="/course/lobby/:id" element={<Lobby socket={socket} />} />
        <Route path="/course/:id" element={<Course socket={socket} />} />
        <Route path="/course/error" element={<Undefined />} />
      </Routes>
  );
}
