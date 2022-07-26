import { CAlert, CForm } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Select from 'react-select'
import defaultBanner from '../../../assets/images/banner-default.jpg'
// DROPZONE
import { useDropzone } from 'react-dropzone'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { BannerMedium } from 'src/components'
const Ubah = () => {
  const [files, setFiles] = useState([])

  const [msg, setMsg] = useState('')
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    document.title = 'Ubah Jadwal | Aplis'
  }, [])

  const banner = { title: 'Ubah Siswa', text: '' }
  const options = [
    { value: 1, label: 'Prof. H. Naimin - Matematika' },
    { value: 2, label: 'H. Sukma Jaya - Bahasa Indonesia' },
    { value: 3, label: 'Yanah Wulandari - Sastra Arab' },
  ]

  const jadwal = {
    id: 1,
    ruangan: 'RPL 1',
    tanggal: '2022-07-21 00:00:00.000',
    guru: { id: 1, nama: 'Prof. H. Naimin', matpel: { id: 1, nama: 'Matematika' } },
  }

  const auth = 'admin'

  const { getRootProps, getInputProps, fileRejections, acceptedFiles } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
    },
    multiple: false,
    maxSize: 1048576,
    onDrop: (acceptedFiles) => {
      setFiles(
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
    // eslint-disable-next-line react/jsx-key
    <div className="rounded-15">
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
      guru: jadwal.guru.id,
      ruangan: jadwal.ruangan,
      tanggal: jadwal.tanggal,
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
      // CARI EMAIL YANG SAMA, CARI NIP YANG SAMA
      console.log(values, files)
    },
  })

  return (
    <div>
      <BannerMedium data={banner} />

      <div className="my-2">
        <Link to="/jadwal/main" className="btn btn-soft-purple rounded-15 fw-bold">
          Kembali
        </Link>
      </div>

      <div className="d-md-flex justify-content-around my-3">
        <div className="input-wrapper my-3 pe-md-2">
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
            {auth == 'admin' ? (
              <div className="mb-3 select2">
                <label>Guru</label>
                <Select
                  placeholder="Pilih Guru"
                  name="guru"
                  options={options}
                  value={options.filter((option) => option.value == formik.values.guru)}
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
            <label>Banner</label>
            <div className="mb-3 rounded-15 input-drop" {...getRootProps()}>
              <input {...getInputProps()} />
              <p className="mb-0">Seret dan jatuhkan file Anda di sini.</p>
              <i className="bi bi-card-image"></i>
            </div>
            <div>{acceptedFileItems}</div>
            <div>{fileRejectionItems}</div>
            <div>{images}</div>
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

        <div className="jadwal-card jadwal-change preview-wrapper py-2">
          <div
            className="preview shadow bg-white rounded-15"
            style={{ width: '100%', maxWidth: '100vw' }}
          >
            <div
              className="head px-3 py-2"
              style={{ backgroundImage: `url(${previewImg != '' ? previewImg : defaultBanner})` }}
            ></div>
            <div className="over-head"></div>
            <div className="content px-3 row">
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
                <h4 className="fw-bold">{formik.values.guru ? formik.values.guru : 'Guru'}</h4>
              </div>
              <div className="col-12">
                <div className="d-flex align-items-center">
                  <i className="bx bx-book me-1"></i>
                  <p className="mb-0">Pelajaran</p>
                </div>
                <h4 className="fw-bold">{jadwal.guru.matpel.nama}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Ubah
