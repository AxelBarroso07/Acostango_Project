import React, {useRef} from 'react'
import '../Slider/Slider.css'
import { slider } from '../../data/slider'

const Slider = () => {

  const listRef = useRef()

  return (
    <div className="main__container">
      <div className="slider__container">
        <div className="container__images">
          <ul ref = {listRef}>
            {
              slider.map(() =>{
                return <li key ={item.id}>
                  <img src={item.imgUrl} alt="" />
                </li>
              })
            }
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Slider