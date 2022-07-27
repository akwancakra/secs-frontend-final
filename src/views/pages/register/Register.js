import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../../../assets/css/login.css'
import Select from 'react-select'
import { CForm, CFormFloating } from '@coreui/react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { toast } from 'react-toastify'

const Register = () => {
  const [msg, setMsg] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    document.title = 'Daftar | Aplis'
    AOS.init()
    AOS.refresh()
  }, [])

  const formik = useFormik({
    initialValues: {
      nama: '',
      nis: '',
      agama: '',
      jenis_kelamin: '',
      username: '',
      email: '',
      password: '',
      password_confirm: '',
    },
    validationSchema: Yup.object({
      nama: Yup.string()
        .min(4, 'Minimal 4 karakter!')
        .max(30, 'Maksimal 30 karakter!')
        .matches(
          /^(?=.*[a-z])[a-z0-9 ]{4,30}$/,
          'Hanya alfabet dan angka yang diperbolehkan, tidak hanya angak, dan huruf kecil!',
        )
        .required('Nama wajib diisi!'),
      nis: Yup.number()
        .positive('Angka harus bersifat positif!')
        .min(100000, 'NIS harus lebih dari 6 digit!')
        .max(100000000000, 'Maksimal 12 digit!')
        .required('NIS wajib diisi!'),
      agama: Yup.string().required('Agama wajib dipilih!'),
      jenis_kelamin: Yup.string().required('Jenis Kelamin wajib dipilih!'),
      email: Yup.string()
        .min(4, 'Minimal 4 karakter!')
        .max(50, 'Maksimal 50 karakter!')
        .required('Email wajib diisi!'),
      username: Yup.string()
        .min(4, 'Minimal 4 karakter!')
        .max(30, 'Maksimal 30 karakter!')
        .required('Username wajib diisi!'),
      password: Yup.string()
        .min(8, 'Minimal 8 karakter')
        .matches(/[a-z]+/, 'Minimal 1 huruf kecil!')
        .matches(/[A-Z]+/, 'Minimal 1 huruf besar!')
        .matches(/[@$!%*#?&]+/, 'Minimal 1 simbol!')
        .matches(/\d+/, 'Minimal 1 angka!')
        .required('Password wajib diisi!'),
      password_confirm: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Password konfirmasi harus sesuai dengan password!')
        .required('Password wajib diisi!'),
    }),
    onSubmit: (values) => {
      console.log(values)
      toast.success('Berhasil daftar!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    },
  })

  const agamaData = [
    { value: 'Islam', label: 'Islam' },
    { value: 'Protestan', label: 'Protestan' },
    { value: 'Katolik', label: 'Katolik' },
    { value: 'Hindu', label: 'Hindu' },
    { value: 'Buddha', label: 'Buddha' },
    { value: 'Konghucu', label: 'Konghucu' },
  ]

  const jenisData = [
    { value: 'laki', label: 'Laki-laki' },
    { value: 'perempuan', label: 'Perempuan' },
  ]
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
            Mulai pekerjaan baru dan cepat
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
              <h5 className="text-purple fw-bold">Daftar</h5>
              <h3 className="mb-4 fw-bold">Mari bergabung!</h3>
              <CForm onSubmit={formik.handleSubmit}>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className={
                      'form-control rounded-15' +
                      (formik.errors.nama && formik.touched.nama ? ' is-invalid' : '')
                    }
                    id="name"
                    placeholder="Your name..."
                    name="nama"
                    value={formik.values.nama}
                    onChange={formik.handleChange}
                  />
                  <label htmlFor="name">Name</label>
                  {formik.errors.nama && formik.touched.nama && (
                    <small className="text-danger">{formik.errors.nama}</small>
                  )}
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="number"
                    className={
                      'form-control rounded-15' +
                      (formik.errors.nis && formik.touched.nis ? ' is-invalid' : '')
                    }
                    id="nis"
                    placeholder="NIS"
                    name="nis"
                    value={formik.values.nis}
                    min="1"
                    onChange={formik.handleChange}
                  />
                  <label htmlFor="nis">NIS</label>
                  {formik.errors.nis && formik.touched.nis && (
                    <small className="text-danger">{formik.errors.nis}</small>
                  )}
                </div>
                <CFormFloating className="mb-3 select2 select2-register">
                  <Select
                    placeholder="Pilih Agama"
                    options={agamaData}
                    id="floatingInput"
                    name="agama"
                    className={formik.errors.agama && formik.touched.agama ? ' is-invalid' : ''}
                    onChange={(e) => formik.setFieldValue('agama', e.value)}
                  />
                  {formik.errors.agama && formik.touched.agama && (
                    <small className="text-danger">{formik.errors.agama}</small>
                  )}
                </CFormFloating>
                <CFormFloating className="mb-3 select2 select2-register">
                  <Select
                    placeholder="Pilih Jenis Kelamin"
                    options={jenisData}
                    id="floatingInput"
                    name="jenis_kelamin"
                    className={
                      formik.errors.jenis_kelamin && formik.touched.jenis_kelamin
                        ? ' is-invalid'
                        : ''
                    }
                    onChange={(e) => formik.setFieldValue('jenis_kelamin', e.value)}
                  />
                  {formik.errors.jenis_kelamin && formik.touched.jenis_kelamin && (
                    <small className="text-danger">{formik.errors.jenis_kelamin}</small>
                  )}
                </CFormFloating>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className={
                      'form-control rounded-15' +
                      (formik.errors.username && formik.touched.username ? ' is-invalid' : '')
                    }
                    id="username"
                    placeholder="Username..."
                    name="username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                  />
                  <label htmlFor="username">Username</label>
                  {formik.errors.username && formik.touched.username && (
                    <small className="text-danger">{formik.errors.username}</small>
                  )}
                </div>
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
                <div className="form-floating mb-3">
                  <input
                    type="password"
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
                  <label htmlFor="password">Password</label>
                  {formik.errors.password && formik.touched.password && (
                    <small className="text-danger">{formik.errors.password}</small>
                  )}
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className={
                      'form-control rounded-15' +
                      (formik.errors.password_confirm && formik.touched.password_confirm
                        ? ' is-invalid'
                        : '')
                    }
                    placeholder="KonfirmasiPassword"
                    id="password"
                    name="password_confirm"
                    value={formik.values.password_confirm}
                    onChange={formik.handleChange}
                  />
                  <label htmlFor="password">Konfirmasi Password</label>
                  {formik.errors.password_confirm && formik.touched.password_confirm && (
                    <small className="text-danger">{formik.errors.password_confirm}</small>
                  )}
                </div>
                <button type="submit" className="btn btn-purple w-100 fw-bold rounded-15 py-2 mb-3">
                  Daftar
                </button>
                <p>
                  Sudah punya akun?{' '}
                  <Link to="/login" className="text-purple text-decoration-none">
                    Masuk
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

export default Register
