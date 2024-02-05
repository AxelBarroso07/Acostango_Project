## [1.0.0] (2024-02-03)

- fix: add react-router-dom into the app ([ceed9782](https://github.com/AxelBarroso07/Acostango_Project/commit/ceed978243cd37fe2985313f72205bbe5e7ff452))

### 📝 Notes
- Eliminamos el paquete `BrowserRouter` del `main.js`, siempre trabajar dentro de `app.js`
- Dentro de `App.js` importamos `react-router-dom` y declaramos los componentes que envolverán los distintos `path` de la aplicación `BrowserRouter` y `Routes`
- Definimos una ruta para cada aplicativo `Route` con un `path` para cada sección
- Renombré el `Index` a `Header`, ya que en realidad ese componente es la cabecera de la web
- Cambié los `Link to` a las rutas definidas en `app.js`