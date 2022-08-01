import { CAlert, CForm, CFormCheck, CSpinner } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../../../assets/css/login.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useSelector, useDispatch } from 'react-redux'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { toast } from 'react-toastify'
import Cookies from 'universal-cookie'
import axios from 'axios'

const Login = () => {
  const [passwordType, setPasswordType] = useState('password')
  const [passwordToggle, setPasswordToggle] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [msg, setMsg] = useState('')
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)

  const cookies = new Cookies()
  const navigate = useNavigate()

  useEffect(() => {
    document.title = 'Masuk | Aplis'
    AOS.init()
    AOS.refresh()
  }, [])

  const passwordChange = () => {
    if (passwordToggle) {
      setPasswordType('password')
      setPasswordToggle(false)
    } else {
      setPasswordType('text')
      setPasswordToggle(true)
    }
  }

  const LoginHandler = async (values) => {
    try {
      await axios.post('http://localhost:5000/api/login', values).then((result) => {
        const data = result.data
        if (values.remember) {
          cookies.set('auth', data, { path: '/', maxAge: 2592000000 })
        } else {
          cookies.set('auth', data, { path: '/' })
        }

        dispatch({
          type: 'set',
          auth: data,
        })

        // PINDAH KE HOME
        toast.success('Berhasil masuk!', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      })
      setIsLoading(false)
      navigate('/ad/dashboard')
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.message)
      }
      setIsLoading(false)
    }
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: false,
    },
    validationSchema: Yup.object({
      email: Yup.string().required('Email wajib diisi!'),
      password: Yup.string().required('Password wajib diisi!'),
      remember: Yup.boolean(),
    }),
    onSubmit: (values) => {
      setIsLoading(true)
      LoginHandler(values)
    },
  })

  return (
    <div className="d-lg-flex half">
      <div
        className="d-none d-lg-block bg order-1 order-md-2 text-white position-relative"
        style={{ backgroundColor: 'var(--purple-dark)' }}
      >
        <div className="position-absolute d-flex" style={{ left: '80px' }}>
          <div
            className="square-bottom"
            style={{
              background: 'var(--purple-second)',
              borderRadius: '0 0 0 50px',
              height: '150px',
            }}
          />
          <div className="square-bottom me-2 position-relative">
            <div
              className="dot position-absolute"
              style={{ backgroundColor: 'var(--purple-main)', bottom: 0, left: '70px' }}
            />
          </div>
        </div>
        <div
          className="text-main-wrapper m-4 rounded-20 p-3 position-absolute"
          style={{ zIndex: 99 }}
          data-aos="fade-up"
          data-aos-easing="ease-in-sine"
          data-aos-duration="500"
        >
          <p className="fw-bold mb-0" style={{ fontSize: '50px' }}>
            Mari buat data anda terorganisir
          </p>
          <p className="mb-0">
            Dengan bantuan Aplis anda dapat membuat, melihat, dan memperbarui jadwal pelajaran anda.
          </p>
        </div>
        <div className="dot position-absolute" style={{ top: '280px' }} />
        <div className="d-flex position-absolute" style={{ top: '350px' }}>
          <div className="square-left me-2" />
          <div className="dot" style={{ backgroundColor: 'var(--purple-main)' }} />
        </div>
        <div className="position-absolute d-flex" style={{ bottom: 0, right: '150px' }}>
          <div
            className="square-bottom me-2 position-relative"
            style={{ borderRadius: '50px 0 0 0' }}
          >
            <div
              className="square-bottom position-absolute d-flex align-items-end"
              style={{
                bottom: 0,
                right: '60px',
                borderRadius: '0 50px 0 0',
                height: '170px',
                backgroundColor: 'var(--purple-second)',
              }}
            />
            <div className="dot position-absolute" style={{ top: 0, left: '65px' }} />
            <div
              className="dot position-absolute"
              style={{ backgroundColor: 'var(--purple-main-hover)', bottom: 0, right: '130px' }}
            />
          </div>
        </div>
      </div>

      <div className="contents order-2 order-md-1">
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div
              className="col-10 py-5"
              data-aos="fade-up"
              data-aos-easing="ease-in-sine"
              data-aos-duration="300"
            >
              <h5 className="text-purple fw-bold">Masuk</h5>
              <h3 className="mb-4 fw-bold">Senang melihatmu!</h3>
              {msg && (
                <CAlert color="danger" className="text-start rounded-15">
                  <span>
                    <i className="bi bi-exclamation-triangle-fill"></i> {msg}
                  </span>
                </CAlert>
              )}
              <CForm onSubmit={formik.handleSubmit}>
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className={
                      'form-control rounded-15' +
                      (formik.errors.email && formik.touched.email ? ' is-invalid' : '')
                    }
                    id="email"
                    placeholder="example@mail.com"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                  />
                  <label htmlFor="email">Email address</label>
                  {formik.errors.email && formik.touched.email && (
                    <small className="text-danger">{formik.errors.email}</small>
                  )}
                </div>
                <div className="form-floating mb-3 position-relative">
                  <input
                    type={passwordType}
                    className={
                      'form-control rounded-15' +
                      (formik.errors.password && formik.touched.password ? ' is-invalid' : '')
                    }
                    placeholder="Password"
                    id="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                  />
                  <i
                    className={
                      (passwordToggle === false ? 'bx bxs-hide' : 'bx bxs-show') +
                      ` position-absolute cursor-pointer`
                    }
                    style={{ right: 15, top: 20, fontSize: '20px' }}
                    onClick={() => passwordChange()}
                  ></i>
                  <label htmlFor="password">Password</label>
                  {formik.errors.password && formik.touched.password && (
                    <small className="text-danger">{formik.errors.password}</small>
                  )}
                </div>
                <div className="d-flex mb-3 align-items-center justify-content-between">
                  <CFormCheck
                    id="remember"
                    label="Remember me"
                    name="remember"
                    value={formik.values.remember}
                    onChange={formik.handleChange}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-purple w-100 fw-bold rounded-15 py-2 mb-3"
                  disabled={isLoading}
                >
                  {isLoading ? <CSpinner color="white" /> : 'Masuk'}
                </button>
                <p>
                  Belum punya akun?{' '}
                  <Link to="/register" className="text-purple text-decoration-none">
                    Buat akun
                  </Link>
                </p>
              </CForm>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
