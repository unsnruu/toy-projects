import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./routes/Home";
import { Counter } from "./features/counter/Counter";
import DnDContainer from "./features/drag-and-drop/DnDContainer";
import TemplateMaker from "./features/template-maker/Container";
import AutoBanner from "./features/auto-banner/Container";
import NotFound from "./routes/NotFound";
import Switch from "./features/switch/Swtich";
import DraggableBar from "./features/draggable-bar/Container";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/counter" element={<Counter />} />
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
