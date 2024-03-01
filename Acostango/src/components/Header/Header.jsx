import './Index.css'
import '../Header/Index.css'

import ImageHeader from '../../assets/image/image-index.png'

function Index() {
  return (
    <section className='index'>
        <img className='container__image' src={ImageHeader} />
    </section>
  )
}

export default Index