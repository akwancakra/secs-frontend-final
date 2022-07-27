import { CAlert, CForm } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
// FORMIK
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { BannerMedium } from 'src/components'
import AOS from 'aos'
import 'aos/dist/aos.css'

const Ubah = () => {
  const [msg, setMsg] = useState('')

  const matpel = { id: 1, nama: 'Matematika' }

  useEffect(() => {
    document.title = 'Ubah Mata Pelajaran | Aplis'
    AOS.init()
    AOS.refresh()
  }, [])

  const banner = { title: 'Ubah Mata Pelajaran', text: '' }
  const formik = useFormik({
    initialValues: {
      nama: matpel.nama,
    },
    validationSchema: Yup.object({
      nama: Yup.string()
        .min(2, 'Minimal 2 karakter!')
        .max(50, 'Maksimal 50 Karakter!')
        .required('Nama Matpel wajib diisi!'),
    }),
    onSubmit: (values) => {
      console.log(values)
    },
  })

  return (
    <div>
      <BannerMedium data={banner} />

      <div className="my-2">
        <Link
          to="/ad/matpel/main"
          className="btn btn-soft-purple rounded-15 fw-bold"
          data-aos="fade-up"
          data-aos-easing="ease-in-sine"
          data-aos-duration="300"
        >
          Kembali
        </Link>
      </div>

      <div className="d-md-flex justify-content-around my-3">
        <div
          className="input-wrapper my-3 pe-md-2"
          data-aos="fade-up"
          data-aos-easing="ease-in-sine"
          data-aos-duration="500"
        >
          <div className="d-flex align-items-center mb-3">
            <span className="icon-bx rounded-15 text-white p-2 me-2 bg-purple">
              <i
                className="bx-fw bx bxs-book-add"
                style={{ fontSize: '24px', width: 'fit-content' }}
              ></i>
            </span>
            <h3 className="fw-bold mb-0">Ubah Mata Pelajaran</h3>
          </div>
          {msg && (
            <CAlert color="danger" className="rounded-15">
              {msg}
            </CAlert>
          )}
          <CForm className="card-form" onSubmit={formik.handleSubmit}>
            <div className="mb-3">
              <label>Nama</label>
              <input
                type="text"
                className={
                  'form-control rounded-15' +
                  (formik.errors.nama && formik.touched.nama ? ' is-invalid' : '')
                }
                name="nama"
                placeholder="Nama mata pelajaran..."
                value={formik.values.nama}
                onChange={formik.handleChange}
              />
              {formik.errors.nama && formik.touched.nama && (
                <small className="text-danger">{formik.errors.nama}</small>
              )}
            </div>
            <div className="d-flex justify-content-end">
              <Link to="/ad/matpel/main" className="btn btn-secondary rounded-15 px-3 me-2">
                Batal
              </Link>
              <button
                type="submit"
                className="btn btn-purple input-group-text btn-search rounded-15 px-3"
              >
                Kirim
              </button>
            </div>
          </CForm>
        </div>

        <div
          className="jadwal-card jadwal-change preview-wrapper py-2"
          style={{ minWidth: '400px' }}
          data-aos="fade-up"
          data-aos-easing="ease-in-sine"
          data-aos-duration="600"
        >
          <div
            className="preview shadow bg-white rounded-15"
            style={{ width: '100%', maxWidth: '100vw' }}
          >
            <div
              className="head px-3 py-2"
              style={{ backgroundColor: 'var(--purple-main)', height: '100px' }}
            ></div>
            <div className="over-head"></div>
            <div className="contents px-3 row">
              <div className="col-12">
                <div className="d-flex align-items-center">
                  <i className="bx bx-calendar me-1"></i>
                  <p className="mb-0">Nama</p>
                </div>
                <h4 className="fw-bold">{formik.values.nama ? formik.values.nama : 'Nama'}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Ubah
