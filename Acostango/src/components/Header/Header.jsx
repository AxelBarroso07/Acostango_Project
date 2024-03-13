import './Index.css'
import '../Header/Index.css'

import ImageHeader from '../../assets/image/image-tango.jpg'

function Index() {
  return (
    <section className='index' id='index'>
        <div className='container__image'>
          <img className='image_tango' src={ImageHeader} />
        </div>
    </section>
  )
}

export default Index