import React, { Component, Suspense } from 'react'
import { HashRouter, Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import './scss/style.scss'
import './assets/css/style.css'
import './assets/css/jadwal.css'

import * as Middleware from 'src/middleware/index'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login.js'))
const Register = React.lazy(() => import('./views/pages/register/Register.js'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404.js'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500.js'))

class App extends Component {
  render() {
    return (
      <HashRouter>
        <ToastContainer />
        <Suspense fallback={loading}>
          <Routes>
            <Route
              exact
              path="/login"
              name="Login Page"
              element={<Middleware.Auth render={<Login />} />}
            />
            <Route
              exact
              path="/register"
              name="Register Page"
              element={<Middleware.Auth render={<Register />} />}
            />
            <Route exact path="/404" name="Page 404" element={<Page404 />} />
            <Route exact path="/500" name="Page 500" element={<Page500 />} />
            <Route
              path="*"
              name="Home"
              element={<Middleware.NotAuth render={<DefaultLayout />} />}
            />
          </Routes>
        </Suspense>
      </HashRouter>
    )
  }
}

export default App
