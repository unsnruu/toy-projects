import { Route, Routes } from "react-router-dom";

import Home from "./Home";
import CounterRoute from "./Counter";
import DragAndDropRoutes from "./DragAndDropRoute";

function IndexRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/counter" element={<CounterRoute />}></Route>
      <Route path="/dragndrop" element={<DragAndDropRoutes />}></Route>
    </Routes>
  );
}

export default IndexRouter;
