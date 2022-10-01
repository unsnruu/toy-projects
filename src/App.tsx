import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./routes/Home";
import DnDContainer from "./pages/drag-and-drop/DnDContainer";
import TemplateMaker from "./pages/template-maker/Container";
import AutoBanner from "./pages/auto-banner/Container";
import NotFound from "./routes/NotFound";
import Switch from "./pages/switch/Swtich";
import DraggableBar from "./pages/draggable-bar/Container";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dragndrop" element={<DnDContainer />} />
      <Route path="/templatemaker" element={<TemplateMaker />} />
      <Route path="/autobanner" element={<AutoBanner />} />
      <Route path="/switch" element={<Switch />} />
      <Route path="/draggablebar" element={<DraggableBar />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
