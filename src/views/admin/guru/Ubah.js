import { CAlert, CForm, CSpinner } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Select from 'react-select'
// DROPZONE
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { BannerMedium } from 'src/components'
import AOS from 'aos'
import 'aos/dist/aos.css'
import axios from 'axios'
import { toast } from 'react-toastify'

const Ubah = () => {
  const [msg, setMsg] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [guru, setGuru] = useState([])
  const [matpels, setMatpels] = useState([])
  const [files, setFiles] = useState([])
  const [preview, setPreview] = useState('')

  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    document.title = 'Ubah Guru | Aplis'
    AOS.init()
    AOS.refresh()
    getDatas()
  }, [])

  const banner = { title: 'Ubah Guru', text: '' }

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

  const agamaData = [
    { value: 'Islam', label: 'Islam' },
    { value: 'Protestan', label: 'Protestan' },
    { value: 'Katolik', label: 'Katolik' },
    { value: 'Hindu', label: 'Hindu' },
    { value: 'Buddha', label: 'Buddha' },
    { value: 'Konghucu', label: 'Konghucu' },
  ]

  const jenisData = [
    { value: 'Laki-laki', label: 'Laki-laki' },
    { value: 'Perempuan', label: 'Perempuan' },
  ]

  const getDatas = async () => {
    const response = await axios.get('http://localhost:5000/mata-pelajaran/data')
    setMatpels(
      response.data.map((d) => ({
        value: d.id,
        label: `${d.nama}`,
      })),
    )

    const responseTwo = await axios.get(`http://localhost:5000/guru/${id}`)
    if (responseTwo.data == '') {
      navigate('/guru/main')
    }
    setPreview(responseTwo.data.photo)
    setGuru(responseTwo.data)
    formik.setFieldValue('nama', responseTwo.data.nama)
    formik.setFieldValue('nip', responseTwo.data.nip)
    formik.setFieldValue('agama', responseTwo.data.agama)
    formik.setFieldValue('jenis_kelamin', responseTwo.data.jenis_kelamin)
    formik.setFieldValue('matpel', responseTwo.data.mataPelajaran.id)
  }

  const formik = useFormik({
    initialValues: {
      nama: '',
      nip: '',
      matpel: '',
      agama: '',
      jenis_kelamin: '',
      username: '',
      email: '',
      password: '',
      confPassword: '',
    },
    validationSchema: Yup.object({
      nama: Yup.string()
        .min(4, 'Minimal 4 karakter!')
        .max(40, 'Maksimal 40 karakter!')
        .required('Nama wajib diisi'),
      nip: Yup.number()
        .positive('Angka harus bersifat positif!')
        .min(100000, 'NIP harus lebih dari 6 digit!')
        .max(10000000000000000000, 'Maksimal 20 digit!')
        .required('NIP wajib diisi!'),
      matpel: Yup.number().required('Mata pelajaran wajib dipilih!'),
      agama: Yup.string().required('Agama wajib dipilih!'),
      jenis_kelamin: Yup.string().required('Jenis Kelamin wajib dipilih!'),
      email: Yup.string().min(4, 'Minimal 4 karakter!').max(50, 'Maksimal 50 karakter!'),
      username: Yup.string().min(4, 'Minimal 4 karakter!').max(30, 'Maksimal 30 karakter!'),
      password: Yup.string()
        .min(8, 'Minimal 8 karakter')
        .matches(/[a-z]+/, 'Minimal 1 huruf kecil!')
        .matches(/[A-Z]+/, 'Minimal 1 huruf besar!')
        .matches(/[@$!%*#?&]+/, 'Minimal 1 simbol!')
        .matches(/\d+/, 'Minimal 1 angka!'),
      confPassword: Yup.string().oneOf(
        [Yup.ref('password'), null],
        'Password konfirmasi harus sesuai dengan password!',
      ),
    }),
    onSubmit: (values) => {
      // CARI EMAIL YANG SAMA, CARI NIP YANG SAMA
      UploadHandle(values)
    },
  })

  const UploadHandle = async (value) => {
    setIsLoading(true)
    let urlUser = ''
    if (value.email || value.username || (value.password && value.confPassword)) {
      urlUser = `http://localhost:5000/user/update/${guru.userId}`
    }

    try {
      await axios.patch(
        `http://localhost:5000/guru/update/${id}`,
        {
          nama: value.nama,
          nip: value.nip,
          jenis_kelamin: value.jenis_kelamin,
          agama: value.agama,
          id_mata_pelajaran: value.matpel,
          file: files,
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      )

      if (urlUser !== '') {
        await axios.patch(urlUser, value)
      }

      toast.success('Berhasil mengubah guru!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      setIsLoading(false)

      navigate('/guru/main')
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

      <div className="my-2">
        <Link
          to="/guru/main"
          className="btn btn-soft-purple rounded-15 fw-bold"
          data-aos="fade-up"
          data-aos-easing="ease-in-sine"
          data-aos-duration="300"
        >
          Kembali
        </Link>
      </div>

      {isLoading ? (
        <div
          className="d-flex justify-content-center align-items-center position-fixed"
          style={{
            zIndex: 99,
            width: '100vw',
          }}
        >
          <div
            className="rounded-15 d-flex justify-content-center align-items-center"
            style={{ backgroundColor: 'var(--white)', width: '200px', height: '200px' }}
          >
            <CSpinner color="purple" style={{ height: '150px', width: '150px' }} size="lg" />
          </div>
        </div>
      ) : (
        ''
      )}

      <div className="d-md-flex justify-content-around my-3">
        <div
          className="input-wrapper my-3 pe-md-2"
          data-aos="fade-up"
          data-aos-easing="ease-in-sine"
          data-aos-duration="400"
        >
          <div className="d-flex align-items-center mb-3">
            <span className="icon-bx rounded-15 text-white p-2 me-2 bg-purple">
              <i
                className="bx-fw bx bxs-book-add"
                style={{ fontSize: '24px', width: 'fit-content' }}
              ></i>
            </span>
            <h3 className="fw-bold mb-0">Ubah Guru</h3>
          </div>
          {msg && (
            <CAlert color="danger" className="rounded-15">
              <i className="bi bi-exclamation-triangle-fill"></i> {msg}
            </CAlert>
          )}
          <CForm className="card-form" onSubmit={formik.handleSubmit}>
            <p className="fw-bold">Biodata</p>
            <div className="mb-3">
              <label>Nama</label>
              <input
                type="text"
                className={
                  'form-control rounded-15' +
                  (formik.errors.nama && formik.touched.nama ? ' is-invalid' : '')
                }
                name="nama"
                placeholder="Nama Guru"
                value={formik.values.nama}
                onChange={formik.handleChange}
              />
              {formik.errors.nama && formik.touched.nama && (
                <small className="text-danger">{formik.errors.nama}</small>
              )}
            </div>
            <div className="mb-3">
              <label>NIP</label>
              <input
                type="number"
                className={
                  'form-control rounded-15' +
                  (formik.errors.nip && formik.touched.nip ? ' is-invalid' : '')
                }
                name="nip"
                min="1"
                placeholder="ex: 0012345"
                value={formik.values.nip}
                onChange={formik.handleChange}
              />
              {formik.errors.nip && formik.touched.nip && (
                <small className="text-danger">{formik.errors.nip}</small>
              )}
            </div>
            <div className="mb-3 select2">
              <label>Mata Pelajaran</label>
              <Select
                placeholder="Pilih Matpel"
                name="matpel"
                options={matpels}
                value={matpels.filter((option) => option.value == formik.values.matpel)}
                className={formik.errors.matpel && formik.touched.matpel ? ' is-invalid' : ''}
                onChange={(e) => formik.setFieldValue('matpel', e.value)}
              />
              {formik.errors.matpel && formik.touched.matpel && (
                <small className="text-danger">{formik.errors.matpel}</small>
              )}
            </div>
            <div className="mb-3 select2">
              <label>Agama</label>
              <Select
                placeholder="Pilih Agama"
                name="agama"
                options={agamaData}
                value={agamaData.filter((option) => option.value == formik.values.agama)}
                className={formik.errors.agama && formik.touched.agama ? ' is-invalid' : ''}
                onChange={(e) => formik.setFieldValue('agama', e.value)}
              />
              {formik.errors.agama && formik.touched.agama && (
                <small className="text-danger">{formik.errors.agama}</small>
              )}
            </div>
            <div className="mb-3 select2">
              <label>Jenis Kelamin</label>
              <Select
                placeholder="Pilih Jenis Kelamin"
                name="jenis_kelamin"
                options={jenisData}
                value={jenisData.filter((option) => option.value == formik.values.jenis_kelamin)}
                className={
                  formik.errors.jenis_kelamin && formik.touched.jenis_kelamin ? ' is-invalid' : ''
                }
                onChange={(e) => formik.setFieldValue('jenis_kelamin', e.value)}
              />
              {formik.errors.jenis_kelamin && formik.touched.jenis_kelamin && (
                <small className="text-danger">{formik.errors.jenis_kelamin}</small>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label">Foto</label>
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
                  height: '300px',
                  objectFit: 'cover',
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                }}
              />
            </div>
            <hr />
            <p className="fw-bold">Akun</p>
            <CAlert color="primary" className="rounded-15">
              Kosongkan inputan dibawah jika tidak ingin mengubah data <strong>Akun</strong>
            </CAlert>
            <div className="mb-3">
              <label>Username</label>
              <input
                type="text"
                className={
                  'form-control rounded-15' +
                  (formik.errors.username && formik.touched.username ? ' is-invalid' : '')
                }
                name="username"
                placeholder="Username"
                value={formik.values.username}
                onChange={formik.handleChange}
              />
              {formik.errors.username && formik.touched.username && (
                <small className="text-danger">{formik.errors.username}</small>
              )}
            </div>
            <div className="mb-3">
              <label>E-mail</label>
              <input
                type="email"
                className={
                  'form-control rounded-15' +
                  (formik.errors.email && formik.touched.email ? ' is-invalid' : '')
                }
                name="email"
                placeholder="example@mail.com"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              {formik.errors.email && formik.touched.email && (
                <small className="text-danger">{formik.errors.email}</small>
              )}
            </div>
            <div className="mb-3">
              <label>Password</label>
              <input
                type="password"
                className={
                  'form-control rounded-15' +
                  (formik.errors.password && formik.touched.password ? ' is-invalid' : '')
                }
                name="password"
                placeholder="Password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              {formik.errors.password && formik.touched.password && (
                <small className="text-danger">{formik.errors.password}</small>
              )}
            </div>
            <div className="mb-3">
              <label>Konfirmasi Password</label>
              <input
                type="password"
                className={
                  'form-control rounded-15' +
                  (formik.errors.confPassword && formik.touched.confPassword ? ' is-invalid' : '')
                }
                name="confPassword"
                placeholder="Konfirmasi Password"
                value={formik.values.confPassword}
                onChange={formik.handleChange}
              />
              {formik.errors.confPassword && formik.touched.confPassword && (
                <small className="text-danger">{formik.errors.confPassword}</small>
              )}
            </div>
            <div className="d-flex justify-content-end">
              <Link to="/guru/main" className="btn btn-secondary rounded-15 px-3 me-2">
                Batal
              </Link>
              <button
                type="submit"
                className="btn btn-purple input-group-text btn-search rounded-15 px-3 d-flex align-items-center"
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
          data-aos-duration="700"
        >
          <div
            className="preview shadow bg-white rounded-15"
            style={{ width: '100%', maxWidth: '100vw' }}
          >
            <div
              className="head px-3 py-2"
              style={{
                backgroundColor: `var(--purple-main)`,
                minHeight: '20px',
              }}
            ></div>
            <div className="over-head"></div>
            <div className="contents px-3 row">
              <div className="col-12">
                <div className="d-flex align-items-center">
                  <i className="bx bx-chalkboard me-1"></i>
                  <p className="mb-0">Pengajar</p>
                </div>
                <h4 className="fw-bold">{formik.values.nama ? formik.values.nama : 'Guru'}</h4>
              </div>
              <div className="col-12">
                <div className="d-flex align-items-center">
                  <i className="bx bx-book me-1"></i>
                  <p className="mb-0">Pelajaran</p>
                </div>
                <h4 className="fw-bold">
                  {guru.mataPelajaran ? guru.mataPelajaran.nama : 'Nama Pelajaran'}
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
