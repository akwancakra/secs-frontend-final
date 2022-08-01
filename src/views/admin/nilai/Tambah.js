import { CAlert, CForm } from '@coreui/react'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Select from 'react-select'
import { BannerMedium } from 'src/components'
import * as Yup from 'yup'
import AOS from 'aos'
import 'aos/dist/aos.css'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const Tambah = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [jadwals, setJadwals] = useState([])
  const [siswas, setSiswas] = useState([])

  const navigate = useNavigate()
  const [msg, setMsg] = useState('')
  const auth = useSelector((state) => state.auth)

  useEffect(() => {
    document.title = 'Tambah Nilai | Aplis'
    AOS.init()
    AOS.refresh()
    getDatas()
  }, [])

  const banner = { title: 'Tambah Nilai', text: '' }

  const getDatas = async () => {
    if (auth.role === 1) {
      const response = await axios.get('http://localhost:5000/jadwal/data')
      setJadwals(
        response.data.map((d) => ({
          value: d.id,
          label: `${d.guru.nama} - ${d.guru.mataPelajaran.nama} - ${d.ruang} - ${d.tanggal}`,
        })),
      )
    } else if (auth.role === 2) {
      const responseGuru = await axios.get(`http://localhost:5000/guru/user-id/${auth.id}`)
      const response = await axios.get(`http://localhost:5000/guru/${responseGuru.data.id}/jadwal`)
      setJadwals(
        response.data.jadwal.map((d) => ({
          value: d.id,
          label: `${responseGuru.data.mataPelajaran.nama} - ${d.ruang} - ${d.tanggal}`,
        })),
      )
    }
  }

  const getSiswas = async (id) => {
    formik.setFieldValue('siswa', '')
    // if (auth.role === 1) {
    const response = await axios.get(`http://localhost:5000/jadwal/${id}`)
    setSiswas(
      response.data.siswa.map((d) => ({
        value: d.id,
        label: `${d.nis} - ${d.nama}`,
      })),
    )
    // }
  }

  const formik = useFormik({
    initialValues: {
      jadwal: '',
      siswa: '',
      nilai: '',
    },
    validationSchema: Yup.object({
      jadwal: Yup.number().required('Jadwal wajib dipilih!'),
      siswa: Yup.number().required('Siswa wajib dipilih!'),
      nilai: Yup.number()
        .min(1, 'Minial 1 digit!')
        .max(100, 'Maksimal 100 digit!')
        .required('Nilai wajib diisi!'),
    }),
    onSubmit: (values) => {
      // CARI EMAIL YANG SAMA, CARI NIP YANG SAMA
      UploadHandle(values)
      setIsLoading(true)
    },
  })

  const UploadHandle = async (value) => {
    try {
      await axios.post('http://localhost:5000/nilai/create', {
        id_jadwal: value.jadwal,
        id_siswa: value.siswa,
        nilai: value.nilai,
      })
      toast.success('Berhasil membuat nilai!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      setIsLoading(false)

      navigate('/nilai/main')
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.message)
        toast.error(error.response.data.message, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      }
      setIsLoading(false)
    }
  }

  return (
    <div>
      <BannerMedium data={banner} />

      <div
        className="my-2"
        data-aos="fade-up"
        data-aos-easing="ease-in-sine"
        data-aos-duration="300"
      >
        <Link to="/nilai/main" className="btn btn-soft-purple rounded-15 fw-bold">
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
            <h3 className="fw-bold mb-0">Tambah Nilai</h3>
          </div>
          {msg && (
            <CAlert color="danger" className="rounded-15">
              <i className="bi bi-exclamation-triangle-fill"></i> {msg}
            </CAlert>
          )}
          <CForm className="card-form" onSubmit={formik.handleSubmit}>
            <div className="mb-3 select2">
              <label>Jadwal</label>
              <Select
                placeholder="Pilih Jadwal"
                name="jadwal"
                options={jadwals}
                className={formik.errors.jadwal && formik.touched.jadwal ? ' is-invalid' : ''}
                onChange={(e) => {
                  formik.setFieldValue('jadwal', e.value)
                  getSiswas(e.value)
                }}
              />
              {formik.errors.jadwal && formik.touched.jadwal && (
                <small className="text-danger">{formik.errors.jadwal}</small>
              )}
            </div>
            <div className="mb-3 select2">
              <label>Siswa</label>
              <Select
                placeholder="Pilih Siswa"
                name="siswa"
                options={siswas}
                className={formik.errors.siswa && formik.touched.siswa ? ' is-invalid' : ''}
                onChange={(e) => formik.setFieldValue('siswa', e.value)}
              />
              {formik.errors.siswa && formik.touched.siswa && (
                <small className="text-danger">{formik.errors.siswa}</small>
              )}
            </div>
            <div className="mb-3">
              <label>Nilai</label>
              <input
                type="number"
                className={
                  'form-control rounded-15' +
                  (formik.errors.nilai && formik.touched.nilai ? ' is-invalid' : '')
                }
                name="nilai"
                placeholder="ex: 90"
                min="1"
                max="100"
                value={formik.values.nilai}
                onChange={formik.handleChange}
              />
              {formik.errors.nilai && formik.touched.nilai && (
                <small className="text-danger">{formik.errors.nilai}</small>
              )}
            </div>
            <div className="d-flex justify-content-end">
              <Link to="/nilai/main" className="btn btn-secondary rounded-15 px-3 me-2">
                Batal
              </Link>
              <button
                type="submit"
                className="btn btn-purple input-group-text btn-search rounded-15 px-3"
                disabled={isLoading}
              >
                Kirim
              </button>
            </div>
          </CForm>
        </div>

        <div
          className="jadwal-card jadwal-change preview-wrapper py-2"
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
                  <p className="mb-0">Jadwal</p>
                </div>
                <h4 className="fw-bold">
                  {formik.values.jadwal ? formik.values.jadwal : 'Jadwal'}
                </h4>
              </div>
              <div className="col-12">
                <div className="d-flex align-items-center">
                  <i className="bx bx-chalkboard me-1"></i>
                  <p className="mb-0">Pengajar</p>
                </div>
                <h4 className="fw-bold">Pengajar</h4>
              </div>
              <div className="col-12">
                <div className="d-flex align-items-center">
                  <i className="bx bx-user me-1"></i>
                  <p className="mb-0">Siswa</p>
                </div>
                <h4 className="fw-bold">{formik.values.siswa ? formik.values.siswa : 'Siswa'}</h4>
              </div>
              <div className="col-12">
                <div className="d-flex align-items-center">
                  <i className="bx bx-receipt me-1"></i>
                  <p className="mb-0">Nilai</p>
                </div>
                <h4 className="fw-bold">{formik.values.nilai ? formik.values.nilai : 'Nilai'}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tambah
