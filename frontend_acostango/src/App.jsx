import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageIndex from "./Pages/PageIndex";
import PageClasses from "./Pages/PageClasses";
import PageMilonga from "./Pages/PageMilonga";
import PageEvents from "./Pages/PageEvents";
import PageRent from "./Pages/PageRent";
import Error404 from "./Pages/Error404";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageIndex />} />
        <Route path="/classes" element={<PageClasses />} />
        <Route path="/milonga" element={<PageMilonga />} />
        <Route path="/events" element={<PageEvents />} />
        <Route path="/rent" element={<PageRent />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;