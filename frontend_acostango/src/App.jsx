import React from 'react'
import '../src/App.css'
import NavBar from './components/NavBar/NavBar.jsx'
import Footer from './components/Footer/Footer.jsx'
import Calendar from './components/Calendar/Calendar.jsx'
import Contact from './components/Contact/Contact.jsx'
import Index from './components/Index/Index.jsx'

function App() {
  return (
    <div className='App__container'>
        <NavBar />
        <Index />
        <Calendar />
        <Contact />
        <Footer />
    </div>
  )
}

export default App