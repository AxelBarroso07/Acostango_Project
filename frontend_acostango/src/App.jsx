import React from 'react'
import '../src/App.css'
import Menu from './components/Menu/Menu.jsx'
import Header from './components/Header/Header.jsx'
import Footer from './components/Footer/Footer.jsx'
import Calendar from './components/Calendar/Calendar.jsx'
import Contact from './components/Contact/Contact.jsx'
import Index from './components/Index/Index.jsx'

function App() {
  return (
    <div className='App__container'>
        <Header />
        {/* <Menu /> */}
        <Index />
        <Calendar />
        <Contact />
        <Footer />
    </div>
  )
}

export default App