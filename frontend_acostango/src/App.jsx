import "./App.css";
import { I18nextProvider } from "react-i18next";
import i18n from "./Translation/i18n.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageIndex from "./Pages/PageIndex";
import PageClasses from "./Pages/PageClasses";
import PageMilonga from "./Pages/PageMilonga";
import PageEvents from "./Pages/PageEvents";
import PageRent from "./Pages/PageRent";
import Error404 from "./Pages/Error404";

function App() {
  return (
    <I18nextProvider i18n={i18n}>
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
    </I18nextProvider>
  );
}

export default App;