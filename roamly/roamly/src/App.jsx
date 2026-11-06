import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./views/Login";
import Regis from "./views/Regis";
import BaseLayout from "./views/BaseLayout";
import Home from "./views/Home";
import Detail from "./views/Detail";
import AddTrip from "./views/AddTrip";
import EditActivity from "./views/EditActivity";
import EditTrip from "./views/EditTrip";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/regis" element={<Regis />} />

        <Route element={<BaseLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddTrip />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/edit/:id" element={<EditTrip />} />
          <Route path="/edit/activity/:tripId/:activityId" element={<EditActivity />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
