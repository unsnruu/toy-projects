import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./routes/Home";
import { Counter } from "./features/counter/Counter";
import DnDContainer from "./features/drag-and-drop/DnDContainer";
import TemplateMaker from "./features/template-maker/Container";
import NotFound from "./routes/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/counter" element={<Counter />} />
      <Route path="/dragndrop" element={<DnDContainer />} />
      <Route path="/templatemaker" element={<TemplateMaker />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
