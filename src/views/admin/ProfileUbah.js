import { CAlert, CForm } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Select from 'react-select'
// DROPZONE
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { BannerMedium } from 'src/components'
import { useSelector } from 'react-redux'
import AOS from 'aos'
import 'aos/dist/aos.css'
import axios from 'axios'

const ProfileUbah = () => {
  const [msg, setMsg] = useState('')
  const [preview, setPreview] = useState('')
  const [files, setFiles] = useState([])
  const [profil, setProfil] = useState([])

  const auth = useSelector((state) => state.auth)
  const banner = { title: 'Ubah Profil', text: '' }
  const navigate = useNavigate()

  const agamaData = [
    { value: 'Islam', label: 'Islam' },
    { value: 'Protestan', label: 'Protestan' },
    { value: 'Katolik', label: 'Katolik' },
    { value: 'Hindu', label: 'Hindu' },
    { value: 'Buddha', label: 'Buddha' },
    { value: 'Konghucu', label: 'Konghucu' },
  ]

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

  useEffect(() => {
    document.title = 'Ubah Profil | Aplis'
    AOS.init()
    AOS.refresh()
    getData()
  }, [])

  const getData = async () => {
    let url = ''
    if (auth.role == 1) {
      url = `http://localhost:5000/admin/user-id/${auth.id}`
    } else if (auth.role == 2) {
      url = `http://localhost:5000/guru/user-id/${auth.id}`
    } else if (auth.role == 3) {
      url = `http://localhost:5000/siswa/user-id/${auth.id}`
    }

    await axios.get(url).then((result) => {
      setProfil(result.data)
      setPreview(result.data.photo)
      formik.setFieldValue('nama', result.data.nama)
      formik.setFieldValue('agama', result.data.agama)
    })
  }

  const formik = useFormik({
    initialValues: {
      nama: '',
      agama: '',
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
      agama: Yup.string(),
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
      UploadHandler(values)
    },
  })

  const UploadHandler = async (values) => {
    let url = ''
    if (auth.role == 1) {
      url = `http://localhost:5000/admin/update/${profil.id}`
    } else if (auth.role == 2) {
      url = `http://localhost:5000/guru/update/${profil.id}`
    } else if (auth.role == 3) {
      url = `http://localhost:5000/siswa/update/${profil.id}`
    }

    let urlUser = ''
    if (values.email || values.username || (values.password && values.confPassword)) {
      urlUser = `http://localhost:5000/user/update/${profil.userId}`
    }

    try {
      await axios.patch(
        url,
        {
          nama: values.nama,
          agama: values.agama,
          file: files,
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      )
      if (urlUser !== '') {
        await axios.patch(urlUser, values)
      }
      toast.success('Profil berhasil diubah!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      navigate('/profil')
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
          to="/profil"
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
            <h3 className="fw-bold mb-0">Ubah Profil</h3>
          </div>
          {msg && (
            <CAlert color="danger" className="rounded-15">
              <i className="bi bi-exclamation-triangle-fill"></i> {msg}
            </CAlert>
          )}
          <CForm className="card-form" encType="multipart/form-data" onSubmit={formik.handleSubmit}>
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
                placeholder="Nama"
                value={formik.values.nama}
                onChange={formik.handleChange}
              />
              {formik.errors.nama && formik.touched.nama && (
                <small className="text-danger">{formik.errors.nama}</small>
              )}
            </div>
            {auth.role !== 1 && (
              <>
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
                  {formik.errors.nama && formik.touched.nama && (
                    <small className="text-danger">{formik.errors.nama}</small>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">Foto</label>
                  <input
                    className="form-control rounded-15"
                    type="file"
                    name="files"
                    onChange={(e) => uploadImage(e)}
                  />
                </div>
                <div className="img-preview">
                  {preview ? (
                    <img
                      src={preview}
                      className="img-thumbnail rounded-15"
                      style={{
                        width: '100%',
                        height: '350px',
                        objectFit: 'cover',
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                      }}
                    />
                  ) : (
                    ''
                  )}
                </div>
              </>
            )}
            <hr />
            <p className="fw-bold">Akun</p>
            <CAlert color="primary" className="rounded-15">
              Kosongkan inputan <strong>Akun</strong> jika anda tidak ingin mengubahnya.
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
              <Link to="/siswa/main" className="btn btn-secondary rounded-15 px-3 me-2">
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
          data-aos="fade-up"
          data-aos-easing="ease-in-sine"
          data-aos-duration="600"
        >
          <div
            className="preview shadow bg-white rounded-15"
            style={{ width: '100%', maxWidth: '100vw', minWidth: '250px' }}
          >
            <div
              className="head px-3 py-2"
              style={{
                background: 'var(--purple-main)',
                minHeight: '150px',
              }}
            ></div>
            <div className="over-head"></div>
            <div className="contents px-3 row">
              <div className="col-12">
                <div className="d-flex align-items-center">
                  <i className="bx bx-chalkboard me-1"></i>
                  <p className="mb-0">Nama</p>
                </div>
                <h4 className="fw-bold">{formik.values.nama ? formik.values.nama : profil.nama}</h4>
              </div>
              {auth.role === 3 && (
                <>
                  <div className="col-6">
                    <div className="d-flex align-items-center">
                      <i className="bx bx-id-card me-1"></i>
                      <p className="mb-0">NIS</p>
                    </div>
                    <h4 className="fw-bold">
                      {formik.values.nis ? formik.values.nis : profil.nis}
                    </h4>
                  </div>
                  <div className="col-6">
                    <div className="d-flex align-items-center">
                      <i className="bx bx-book me-1"></i>
                      <p className="mb-0">Agama</p>
                    </div>
                    <h4 className="fw-bold">
                      {formik.values.agama ? formik.values.agama : profil.agama}
                    </h4>
                  </div>
                </>
              )}
              {auth.role === 2 && (
                <>
                  <div className="col-6">
                    <div className="d-flex align-items-center">
                      <i className="bx bx-id-card me-1"></i>
                      <p className="mb-0">NIM</p>
                    </div>
                    <h4 className="fw-bold">
                      {formik.values.nip ? formik.values.nip : profil.nip}
                    </h4>
                  </div>
                  <div className="col-6">
                    <div className="d-flex align-items-center">
                      <i className="bx bx-book me-1"></i>
                      <p className="mb-0">Materi</p>
                    </div>
                    <h4 className="fw-bold">Matematika</h4>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileUbah
