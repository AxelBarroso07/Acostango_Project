import React from "react"
import '../Pages/Error404.css'

export default function Error404() {
  return (
    <div className="container__body-error">
      <div className="container__error">
        <p className="text__error">404.</p>
        <span className="error">That's an error.</span>
        <p className="text__error-2">Page not found. The request URL was not found on this server.</p>
        <p className="text__back"><a href="/">Go Back</a></p>
      </div>
    </div>
  )
}
