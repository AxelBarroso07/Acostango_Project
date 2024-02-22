// Middleware isAuthenticated used in index.js
export const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.user) {
      console.log("desde isAuthenticated, req.session:", req.session)

      if (req.session && req.session.user) {
        if (req.originalUrl === '/userValidation') {
          console.log(req)
          return res.redirect('/home')
        } else {
            return next()
        }
    } else {
        return next()
    }
  } else {
    console.log(req.session)
    if (req.originalUrl !== '/userValidation') {
      console.log("user not authenticated, redirect to /")
      return res.redirect('/')
    }
    next()
  }
}