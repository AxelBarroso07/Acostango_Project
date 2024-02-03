import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageIndex from "./Pages/PageIndex";
import PageClases from "./Pages/PageClases";
import PageMilonga from "./Pages/PageMilonga";
import PageEvents from "./Pages/PageEvents";
import PageRent from "./Pages/PageRent";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageIndex />} />
        <Route path="/clases" element={<PageClases />} />
        <Route path="/milonga" element={<PageMilonga />} />
        <Route path="/events" element={<PageEvents />} />
        <Route path="/rent" element={<PageRent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;