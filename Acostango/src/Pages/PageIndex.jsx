import Calendar from '../components/Calendar/Calendar'
import Contact from '../components/Contact/Contact'
import NavBar from '../components/NavBar/NavBar'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'


export default function PageIndex() {
  return (
    <div className='App__container'>
      <NavBar />
      <Header />
      <Calendar />
      <Contact />
      <Footer />
    </div>
  )
}
