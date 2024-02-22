// // Middleware isAuthenticated used in index.js
// export const isAuthenticated = (req, res, next) => {
//   if (req.session && req.session.user) { // req.session.user generated if user is authenticated, else it will be undefined and the user will be redirected to the login page
//       // console.log("desde isAuthenticated, req.session:", req.session)
//       if (req.originalUrl === '/userValidation') { // if the user is already authenticated, it will be redirected to /home
//         // console.log(req)
//         return res.redirect('/home')
//       }
//       next()
//   } else { // if the user is not authenticated, it will be redirected to the login page
//     // console.log(req.session)
//     if (req.originalUrl !== '/userValidation') {
//       // console.log("user not authenticated, redirect to /")
//       return res.redirect('/')
//     }
//     next()
//   }
// }