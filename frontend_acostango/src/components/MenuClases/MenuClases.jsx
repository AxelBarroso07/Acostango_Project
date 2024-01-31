import React from 'react'
import '../MenuClases/MenuClases.css';
import { Link } from 'react-router-dom';

function MenuClases() {
  return (
    <div className='container_clases'>
        <a href="#">
            <div className="clases">
                    <h1 className="clases__title">Events</h1>
            </div>
        </a>

        <a href="#">
            <div className="clases">
                <h1 className="clases__title">Rent Studio</h1>
            </div>
        </a>

        <a href="#">
            <div className="clases">
                <h1 className="clases__title">Milonga</h1>
            </div>     
        </a>

        <a href="#">
            <div className="clases">
                <h1 className="clases__title">Clases</h1>
            </div>
        </a>
    </div>
  )
}

export default MenuClases