import { CAlert, CButton, CForm } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Select from 'react-select'
import defaultBanner from '../../assets/images/banner-default.jpg'
// DROPZONE
import { useDropzone } from 'react-dropzone'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { BannerMedium } from 'src/components'
import { useSelector } from 'react-redux'
import AOS from 'aos'
import 'aos/dist/aos.css'

const ProfileUbah = () => {
  const [msg, setMsg] = useState('')
  const [files, setFile] = useState([])
  const auth = useSelector((state) => state.auth)

  const akun = {
    id: 1,
    nama: 'Dandy Alyahmin',
    nis: 192010383,
    agama: 'Islam',
    jenis_kelamin: 'Laki-laki',
  }

  const agamaData = [
    { value: 'Islam', label: 'Islam' },
    { value: 'Protestan', label: 'Protestan' },
    { value: 'Katolik', label: 'Katolik' },
    { value: 'Hindu', label: 'Hindu' },
    { value: 'Buddha', label: 'Buddha' },
    { value: 'Konghucu', label: 'Konghucu' },
  ]

  useEffect(() => {
    document.title = 'Tambah Siswa | Aplis'
    AOS.init()
    AOS.refresh()
  }, [])

  const banner = { title: 'Ubah Profil', text: '' }
  const { getRootProps, getInputProps, fileRejections, acceptedFiles } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
    },
    multiple: false,
    maxSize: 1048576,
    onDrop: (acceptedFiles) => {
      setFile(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      )
    },
  })

  const acceptedFileItems = acceptedFiles.map((file) => (
    // eslint-disable-next-line react/jsx-key
    <p className="mb-0">
      {file.path} - {file.size} bytes
    </p>
  ))

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    // eslint-disable-next-line react/jsx-key
    <p className="mb-0">
      {file.path} - {file.size} bytes
      <ul>
        {errors.map((e) => (
          // eslint-disable-next-line react/jsx-key
          <li>{e.message}</li>
        ))}
      </ul>
    </p>
  ))

  const images = files.map((file) => (
    <div className="rounded-15" key={file.name}>
      <div>
        <img
          src={file.preview}
          alt="Image Preview"
          className="rounded-15 img-thumbnail"
          style={{ maxHeight: '250px' }}
        />
      </div>
    </div>
  ))

  const previewImg = files.map((file) => file.preview)

  const formik = useFormik({
    initialValues: {
      nama: akun.nama,
      agama: '',
      username: '',
      email: '',
      password: '',
      password_confirm: '',
    },
    validationSchema: Yup.object({
      nama: Yup.string()
        .min(4, 'Minimal 4 karakter!')
        .max(40, 'Maksimal 40 karakter!')
        .required('Nama wajib diisi'),
      email: Yup.string().min(4, 'Minimal 4 karakter!').max(50, 'Maksimal 50 karakter!'),
      username: Yup.string().min(4, 'Minimal 4 karakter!').max(30, 'Maksimal 30 karakter!'),
      password: Yup.string()
        .min(8, 'Minimal 8 karakter')
        .matches(/[a-z]+/, 'Minimal 1 huruf kecil!')
        .matches(/[A-Z]+/, 'Minimal 1 huruf besar!')
        .matches(/[@$!%*#?&]+/, 'Minimal 1 simbol!')
        .matches(/\d+/, 'Minimal 1 angka!'),
      password_confirm: Yup.string().oneOf(
        [Yup.ref('password'), null],
        'Password konfirmasi harus sesuai dengan password!',
      ),
    }),
    onSubmit: (values) => {
      // CARI EMAIL YANG SAMA, CARI NIP YANG SAMA
      console.log(values, files)
    },
  })

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
              {msg}
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
                placeholder="Nama"
                value={formik.values.nama}
                onChange={formik.handleChange}
              />
              {formik.errors.nama && formik.touched.nama && (
                <small className="text-danger">{formik.errors.nama}</small>
              )}
            </div>
            {auth.account.role !== 'admin' && (
              <div className="mb-3 select2">
                <label>Agama</label>
                <Select
                  placeholder="Pilih Agama"
                  name="agama"
                  options={agamaData}
                  className={formik.errors.agama && formik.touched.agama ? ' is-invalid' : ''}
                  onChange={(e) => formik.setFieldValue('agama', e.value)}
                />
                {formik.errors.nama && formik.touched.nama && (
                  <small className="text-danger">{formik.errors.nama}</small>
                )}
              </div>
            )}
            <label>Foto</label>
            <div className="mb-3 rounded-15 input-drop" {...getRootProps()}>
              <input {...getInputProps()} />
              <p className="mb-0">Seret dan jatuhkan file Anda di sini.</p>
              <i className="bi bi-card-image"></i>
            </div>
            <div>{acceptedFileItems}</div>
            <div>{fileRejectionItems}</div>
            <div>{images}</div>
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
                  (formik.errors.password_confirm && formik.touched.password_confirm
                    ? ' is-invalid'
                    : '')
                }
                name="password_confirm"
                placeholder="Konfirmasi Password"
                value={formik.values.password_confirm}
                onChange={formik.handleChange}
              />
              {formik.errors.password_confirm && formik.touched.password_confirm && (
                <small className="text-danger">{formik.errors.password_confirm}</small>
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
                backgroundImage: `url(${previewImg != '' ? previewImg : defaultBanner})`,
                minHeight: '250px',
              }}
            ></div>
            <div className="over-head"></div>
            <div className="contents px-3 row">
              <div className="col-12">
                <div className="d-flex align-items-center">
                  <i className="bx bx-chalkboard me-1"></i>
                  <p className="mb-0">Nama</p>
                </div>
                <h4 className="fw-bold">{formik.values.nama ? formik.values.nama : 'Nama'}</h4>
              </div>
              {auth.account.role === 'siswa' && (
                <>
                  <div className="col-6">
                    <div className="d-flex align-items-center">
                      <i className="bx bx-id-card me-1"></i>
                      <p className="mb-0">NIS</p>
                    </div>
                    <h4 className="fw-bold">{formik.values.nis ? formik.values.nis : 'NIS'}</h4>
                  </div>
                  <div className="col-6">
                    <div className="d-flex align-items-center">
                      <i className="bx bx-book me-1"></i>
                      <p className="mb-0">Agama</p>
                    </div>
                    <h4 className="fw-bold">
                      {formik.values.agama ? formik.values.agama : 'Agama'}
                    </h4>
                  </div>
                  <div className="col-6">
                    <div className="d-flex align-items-center">
                      <i className="bx bx-book me-1"></i>
                      <p className="mb-0">Jenis Kelamin</p>
                    </div>
                    <h4 className="fw-bold">
                      {formik.values.jenis_kelamin ? formik.values.jenis_kelamin : 'Jenis Kelamin'}
                    </h4>
                  </div>
                </>
              )}
              {auth.account.role === 'guru' && (
                <>
                  <div className="col-6">
                    <div className="d-flex align-items-center">
                      <i className="bx bx-id-card me-1"></i>
                      <p className="mb-0">NIM</p>
                    </div>
                    <h4 className="fw-bold">{formik.values.nip ? formik.values.nip : 'NIP'}</h4>
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
