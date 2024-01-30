import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Menu from './components/Menu/Menu.jsx'
import Header from './components/Header/Header.jsx'
import Footer from './components/Footer/Footer.jsx'
import Calendar from './components/Calendar/Calendar.jsx'
import Contact from './components/Contact/Contact.jsx'
import Index from './components/Index/Index.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Header />
    {/* <Menu /> */}
    <Index />
    <Calendar />
    <Contact />
    <Footer />
  </React.StrictMode>,
)
