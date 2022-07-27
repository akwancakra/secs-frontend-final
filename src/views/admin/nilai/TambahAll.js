import {
  CAlert,
  CForm,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Select from 'react-select'
import { BannerMedium } from 'src/components'
import * as Yup from 'yup'
import AOS from 'aos'
import 'aos/dist/aos.css'

const Tambah = () => {
  const [msg, setMsg] = useState('')

  useEffect(() => {
    document.title = 'Tambah Nilai Berdasarkan Jadwal | Aplis'
    AOS.init()
    AOS.refresh()
  }, [])

  const banner = { title: 'Ubah Nilai', text: '' }
  const jadwals = [
    { value: 1, label: 'Matematika - 22 Juni 2022' },
    { value: 2, label: 'Bahasa Indonesia - 22 Juni 2022' },
  ]

  const jadwal = {
    id: 1,
    ruangan: 'RPL 1',
    tanggal: '2022-07-21 00:00:00.000',
    dosen: { nama: 'Prof. H. Naimin', matpel: { id: 1, nama: 'Matematika' } },
    siswas: [
      { nama: 'Akwan Cakra', nis: 192010382 },
      { nama: 'Dandy Alyahmin', nis: 192010383 },
    ],
  }

  const formik = useFormik({
    initialValues: {
      jadwal: '',
      siswa: 0,
      nilai: 0,
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
      console.log(values)
    },
  })

  return (
    <div>
      <BannerMedium data={banner} />

      <div className="my-2">
        <Link
          to="/nilai/main"
          className="btn btn-soft-purple rounded-15 fw-bold"
          data-aos="fade-up"
          data-aos-easing="ease-in-sine"
          data-aos-duration="300"
        >
          Kembali
        </Link>
      </div>

      <CForm className="card-form" onSubmit={formik.handleSubmit}>
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
            <div className="mb-3 select2">
              <label>Jadwal</label>
              <Select
                placeholder="Pilih Jadwal"
                name="jadwal"
                options={jadwals}
                className={formik.errors.jadwal && formik.touched.jadwal ? ' is-invalid' : ''}
                onChange={(e) => formik.setFieldValue('jadwal', e.value)}
              />
              {formik.errors.jadwal && formik.touched.jadwal && (
                <small className="text-danger">{formik.errors.jadwal}</small>
              )}
            </div>
          </div>

          <div className="jadwal-card jadwal-change preview-wrapper py-2">
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
                    {jadwal.dosen.matpel.nama} - {new Date(jadwal.tanggal).toLocaleString()}
                  </h4>
                </div>
                <div className="col-12">
                  <div className="d-flex align-items-center">
                    <i className="bx bx-chalkboard me-1"></i>
                    <p className="mb-0">Pengajar</p>
                  </div>
                  <h4 className="fw-bold">{jadwal.dosen.nama}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div data-aos="fade-up" data-aos-easing="ease-in-sine" data-aos-duration="600">
          <CTable hover borderless className="bg-white rounded-15">
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell className="fw-bold" scope="col">
                  #
                </CTableHeaderCell>
                <CTableHeaderCell className="fw-bold" scope="col">
                  Nama
                </CTableHeaderCell>
                <CTableHeaderCell className="fw-bold" scope="col">
                  Nilai
                </CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {/* {jadwal.siswas > 0 ? ( */}
              {jadwal.siswas ? (
                jadwal.siswas.map((siswa, index) => (
                  // eslint-disable-next-line react/jsx-key
                  <CTableRow className="align-middle">
                    <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                    <CTableDataCell className="mb-0">{siswa.nama}</CTableDataCell>
                    <CTableDataCell>
                      <input
                        type="hidden"
                        name="siswa[]"
                        value={formik.values.siswa}
                        onChange={(e) => formik.setFieldValue('siswa[]', e.target.value)}
                      />
                      <div className="mb-3">
                        <input
                          type="number"
                          className={
                            'form-control rounded-15' +
                            (formik.errors.nilai && formik.touched.nilai ? ' is-invalid' : '')
                          }
                          name="nilai[]"
                          placeholder="ex: 80"
                          max="100"
                          min="1"
                          style={{ maxWidth: '90px' }}
                          value={formik.values.nilai}
                          onChange={formik.handleChange}
                        />
                        {formik.errors.nilai && formik.touched.nilai && (
                          <small className="text-danger">{formik.errors.nilai}</small>
                        )}
                      </div>
                    </CTableDataCell>
                  </CTableRow>
                ))
              ) : (
                <CTableRow className="align-middle">
                  <CTableDataCell colSpan="3">
                    <CAlert color="primary" className="rounded-15">
                      Tidak ada data <strong>Nilai</strong>
                    </CAlert>
                  </CTableDataCell>
                </CTableRow>
              )}
            </CTableBody>
          </CTable>
          <div className="d-flex justify-content-end">
            <Link to="/nilai/main" className="btn btn-secondary rounded-15 px-3 me-2">
              Batal
            </Link>
            <button className="btn btn-purple input-group-text btn-search rounded-15 px-3">
              Kirim
            </button>
          </div>
        </div>
      </CForm>
    </div>
  )
}

export default Tambah
