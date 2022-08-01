import { CAlert, CForm } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Select from 'react-select'
// DROPZONE
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { BannerMedium } from 'src/components'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from 'react-toastify'

const Ubah = () => {
  const [files, setFiles] = useState([])
  const [preview, setPreview] = useState('')
  const auth = useSelector((state) => state.auth)
  const [gurus, setGurus] = useState([])
  const [jadwal, setJadwal] = useState([])

  const [msg, setMsg] = useState('')
  const navigate = useNavigate()
  const { id } = useParams()
  const banner = { title: 'Ubah Siswa', text: '' }

  useEffect(() => {
    document.title = 'Ubah Jadwal | Aplis'
    AOS.init()
    AOS.refresh()
    getGurus()
  }, [])

  const getGurus = async () => {
    if (auth.role === 1) {
      const response = await axios.get('http://localhost:5000/guru/data')
      if (response.data == '') {
        navigate('/jadwal/main')
      }
      if (auth.role === 1) {
        setGurus(
          response.data.map((d) => ({
            value: d.id,
            label: `${d.nama} - ${d.mataPelajaran.nama}`,
          })),
        )
      }
    } else if (auth.role === 2) {
      const response = await axios.get(`http://localhost:5000/guru/user-id/${auth.id}`)
      if (response.data == '') {
        navigate('/jadwal-saya')
      }
      formik.setFieldValue('guru', response.data.id)
    }
    const responseTwo = await axios.get(`http://localhost:5000/jadwal/${id}`)
    if (responseTwo.data == '') {
      navigate('/jadwal/main')
    }
    setJadwal(responseTwo.data)
    if (auth.role === 1) {
      formik.setFieldValue('guru', responseTwo.data.guru.id)
    }
    formik.setFieldValue('ruangan', responseTwo.data.ruang)
    formik.setFieldValue('tanggal', responseTwo.data.tanggal)
    setPreview(responseTwo.data.photo)
  }

  const uploadImage = (e) => {
    const image = e.target.files[0]
    if (!image.name.match(/\.(jpg|jpeg|png)$/)) {
      toast.error('Ekstensi gambar harus .png, .jpg or .jpeg', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      return false
    }
    if (image.size >= 1000000) {
      toast.error('Gambar tidak boleh lebih besar dari 1MB', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      return false
    }
    setFiles(image)
    setPreview(URL.createObjectURL(image))
  }

  const formik = useFormik({
    initialValues: {
      guru: '',
      ruangan: '',
      tanggal: '',
    },
    validationSchema: Yup.object({
      guru: Yup.number().required('Guru wajib dipilih!'),
      ruangan: Yup.string()
        .min(4, 'Minimal 4 karakter!')
        .max(70, 'Maksimal 70 karakter!')
        .required('Ruangan wajib diisi!'),
      tanggal: Yup.string().required('Tanggal wajib diisi!'),
    }),
    onSubmit: (values) => {
      HandleUpload(values)
    },
  })

  const HandleUpload = async (values) => {
    try {
      await axios.patch(
        `http://localhost:5000/jadwal/update/${id}`,
        {
          id_guru: values.guru,
          ruang: values.ruangan,
          tanggal: values.tanggal,
          file: files,
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      )
      toast.success('Berhasil mengubah jadwal!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })

      if (auth.role !== 2) {
        navigate(`/jadwal/${id}`)
      } else {
        navigate('/jadwal-saya')
      }
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
    }
  }

  return (
    <div>
      <BannerMedium data={banner} />

      <div className="my-2">
        <Link
          to={`/jadwal/${id}`}
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
            <h3 className="fw-bold mb-0">Ubah Jadwal</h3>
          </div>
          {msg && (
            <CAlert color="danger" className="rounded-15">
              <i className="bi bi-exclamation-triangle-fill"></i> {msg}
            </CAlert>
          )}
          <CForm className="card-form" onSubmit={formik.handleSubmit}>
            {auth.role == 1 ? (
              <div className="mb-3 select2">
                <label>Guru</label>
                <Select
                  placeholder="Pilih Guru"
                  name="guru"
                  options={gurus}
                  value={gurus.filter((option) => option.value == formik.values.guru)}
                  className={formik.errors.guru && formik.touched.guru ? ' is-invalid' : ''}
                  onChange={(e) => formik.setFieldValue('guru', e.value)}
                />
                {formik.errors.guru && formik.touched.guru && (
                  <small className="text-danger">{formik.errors.guru}</small>
                )}
              </div>
            ) : (
              ''
            )}
            <div className="mb-3">
              <label>Ruangan</label>
              <input
                type="text"
                className={
                  'form-control rounded-15' +
                  (formik.errors.ruangan && formik.touched.ruangan ? ' is-invalid' : '')
                }
                name="ruangan"
                placeholder="Nama Ruangan"
                value={formik.values.ruangan}
                onChange={formik.handleChange}
              />
              {formik.errors.ruangan && formik.touched.ruangan && (
                <small className="text-danger">{formik.errors.ruangan}</small>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label">Banner</label>
              <input
                className="form-control"
                type="file"
                name="files"
                onChange={(e) => uploadImage(e)}
              />
            </div>
            <div className="img-preview">
              <img
                src={preview}
                className="img-thumbnail rounded-15"
                style={{
                  width: '100%',
                  height: '150px',
                  objectFit: 'cover',
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                }}
              />
            </div>
            <div className="mb-3">
              <label>Tanggal</label>
              <input
                type="datetime-local"
                className={
                  'form-control rounded-15' +
                  (formik.errors.tanggal && formik.touched.tanggal ? ' is-invalid' : '')
                }
                name="tanggal"
                value={formik.values.tanggal}
                onChange={formik.handleChange}
              />
              {formik.errors.tanggal && formik.touched.tanggal && (
                <small className="text-danger">{formik.errors.tanggal}</small>
              )}
            </div>
            <div className="d-flex justify-content-end">
              <Link to="/jadwal/main" className="btn btn-secondary rounded-15 px-3 me-2">
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
          className="jadwal-card jadwal-change preview-wrapper py-2 overflow-hidden"
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
              style={{ backgroundColor: `var(--purple-main)`, maxHeight: '150px' }}
            ></div>
            <div className="over-head"></div>
            <div className="contents px-3 row">
              <div className="col-6">
                <div className="d-flex align-items-center">
                  <i className="bx bxs-school me-1"></i>
                  <p className="mb-0">Ruangan</p>
                </div>
                <h4 className="fw-bold">
                  {formik.values.ruangan ? formik.values.ruangan : 'Ruangan'}
                </h4>
              </div>
              <div className="col-6">
                <div className="d-flex align-items-center">
                  <i className="bx bx-calendar me-1"></i>
                  <p className="mb-0">Tanggal</p>
                </div>
                <h4 className="fw-bold">
                  {formik.values.tanggal
                    ? new Date(formik.values.tanggal).toLocaleString()
                    : 'Tanggal'}
                </h4>
              </div>
              <div className="col-12">
                <div className="d-flex align-items-center">
                  <i className="bx bx-chalkboard me-1"></i>
                  <p className="mb-0">Guru</p>
                </div>
                <h4 className="fw-bold">{jadwal.guru ? jadwal.guru.nama : 'Guru'}</h4>
              </div>
              <div className="col-12">
                <div className="d-flex align-items-center">
                  <i className="bx bx-book me-1"></i>
                  <p className="mb-0">Pelajaran</p>
                </div>
                <h4 className="fw-bold">
                  {jadwal.guru ? jadwal.guru.mataPelajaran.nama : 'Pelajaran'}
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Ubah
