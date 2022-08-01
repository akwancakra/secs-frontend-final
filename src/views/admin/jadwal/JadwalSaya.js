import {
  CAlert,
  CButton,
  CForm,
  CFormInput,
  CPagination,
  CPaginationItem,
  CSpinner,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BannerMedium } from 'src/components'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { useSelector } from 'react-redux'
import swal from 'sweetalert'
import axios from 'axios'

const Daftar = () => {
  const [isLoading, setIsLoading] = useState([])
  const [guru, setGuru] = useState([])
  const [jadwals, setJadwals] = useState([])
  const [siswa, setSiswa] = useState([])
  const auth = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const banner = {
    title: 'Daftar Jadwal',
    text: 'Berikut ini adalah daftar jadwal yang anda miliki.',
  }

  useEffect(() => {
    document.title = 'Jadwal Saya | Aplis'
    AOS.init()
    AOS.refresh()
    setIsLoading(true)
    getJadwals()
  }, [])

  const swalDisplay = async (id) => {
    swal({
      title: 'Apakah anda yakin?',
      text: 'Data yang anda hapus tidak bisa dipulihkan kembali!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        await axios.delete(`http://localhost:5000/jadwal/delete/${id}`)
        swal({
          title: 'Sukses',
          text: 'Data berhasil dihapus!',
          icon: 'success',
        }).then(() => {
          getJadwals()
        })
      }
    })
  }

  const getJadwals = async () => {
    if (auth.role === 2) {
      const response = await axios.get(`http://localhost:5000/guru/user-id/${auth.id}`)
      const responseTwo = await axios.get(`http://localhost:5000/guru/${response.data.id}/jadwal`)
      setGuru(responseTwo.data)
      setJadwals(responseTwo.data.jadwal)
    } else if (auth.role === 3) {
      const response = await axios.get(`http://localhost:5000/siswa/user-id/${auth.id}`)
      setSiswa(response.data)

      const responseTwo = await axios.get(`http://localhost:5000/siswa/${response.data.id}/jadwal`)
      setJadwals(responseTwo.data.jadwal)
    }
    setIsLoading(false)
  }

  return (
    <div>
      <BannerMedium data={banner} />

      <div
        className="search mt-2"
        data-aos="fade-up"
        data-aos-easing="ease-in-sine"
        data-aos-duration="300"
      >
        <CForm className="position-relative d-flex justify-content-center">
          <div className="input-group mb-3">
            <CButton color="primary" className="input-group-text btn-search">
              <i className="bx bx-search" />
            </CButton>
            <CFormInput
              type="text"
              id="search"
              name="search"
              placeholder="Cari berdasarkan nama jadwal, atau ruangan"
            />
          </div>
        </CForm>
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
            <CSpinner color="purple" style={{ height: '150px', width: '150px' }} />
          </div>
        </div>
      ) : (
        ''
      )}

      <div
        className="d-flex mb-3"
        data-aos="fade-up"
        data-aos-easing="ease-in-sine"
        data-aos-duration="300"
      >
        <Link to="/jadwal/tambah" className="btn btn-purple rounded-15">
          Tambah Jadwal
        </Link>
      </div>

      <div
        className="tabel-custom-wrapper"
        data-aos="fade-up"
        data-aos-easing="ease-in-sine"
        data-aos-duration="600"
      >
        {auth.role === 2 && (
          <CTable hover borderless className="bg-white rounded-15">
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col" className="fw-bold">
                  #
                </CTableHeaderCell>
                <CTableHeaderCell scope="col" className="fw-bold">
                  Nama
                </CTableHeaderCell>
                <CTableHeaderCell scope="col" className="fw-bold">
                  Ruangan
                </CTableHeaderCell>
                <CTableHeaderCell scope="col" className="fw-bold">
                  Tanggal
                </CTableHeaderCell>
                <CTableHeaderCell scope="col" className="fw-bold">
                  Aksi
                </CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {siswa ? (
                jadwals.map((jad, index) => (
                  // eslint-disable-next-line react/jsx-key
                  <CTableRow className="align-middle" key={jad.id}>
                    <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                    <CTableDataCell>{guru.mataPelajaran.nama}</CTableDataCell>
                    <CTableDataCell>{jad.ruang}</CTableDataCell>
                    <CTableDataCell>{new Date(jad.tanggal).toLocaleString()}</CTableDataCell>
                    <CTableDataCell>
                      <Link
                        to={`/jadwal/${jad.id}`}
                        className="btn btn-soft-purple rounded-15 me-1"
                      >
                        Detil
                      </Link>
                      <button
                        className="btn btn-danger rounded-15"
                        onClick={() => swalDisplay(jad.id)}
                      >
                        Hapus
                      </button>
                    </CTableDataCell>
                  </CTableRow>
                ))
              ) : (
                <CTableRow className="align-middle">
                  <CTableDataCell colSpan="5">
                    <CAlert color="primary" className="rounded-15">
                      Tidak ada data <strong>Jadwal</strong>
                    </CAlert>
                  </CTableDataCell>
                </CTableRow>
              )}
            </CTableBody>
          </CTable>
        )}
        {auth.role === 3 && (
          <CTable hover borderless className="bg-white rounded-15">
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col" className="fw-bold">
                  #
                </CTableHeaderCell>
                <CTableHeaderCell scope="col" className="fw-bold">
                  Nama
                </CTableHeaderCell>
                <CTableHeaderCell scope="col" className="fw-bold">
                  Mata Pelajaran
                </CTableHeaderCell>
                <CTableHeaderCell scope="col" className="fw-bold">
                  Ruangan
                </CTableHeaderCell>
                <CTableHeaderCell scope="col" className="fw-bold">
                  Jam
                </CTableHeaderCell>
                <CTableHeaderCell scope="col" className="fw-bold">
                  Aksi
                </CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {siswa ? (
                jadwals.map((jad, index) => (
                  // eslint-disable-next-line react/jsx-key
                  <CTableRow className="align-middle" key={jad.id}>
                    <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                    <CTableDataCell>{jad.guru.nama}</CTableDataCell>
                    <CTableDataCell>{jad.guru.mataPelajaran.nama}</CTableDataCell>
                    <CTableDataCell>{jad.ruang}</CTableDataCell>
                    <CTableDataCell>{new Date(jad.tanggal).toLocaleString()}</CTableDataCell>
                    <CTableDataCell>
                      <Link
                        to={`/jadwal/${jad.id}`}
                        className="btn btn-soft-purple rounded-15 me-1"
                      >
                        Detil
                      </Link>
                    </CTableDataCell>
                  </CTableRow>
                ))
              ) : (
                <CTableRow className="align-middle">
                  <CTableDataCell colSpan="6">
                    <CAlert color="primary" className="rounded-15">
                      Tidak ada data <strong>Jadwal</strong>
                    </CAlert>
                  </CTableDataCell>
                </CTableRow>
              )}
            </CTableBody>
          </CTable>
        )}

        {/* <div className="d-flex justify-content-end">
          <CPagination>
            <Link to="#" className="page-link cursor-pointer">
              Previous
            </Link>
            <Link to="#" className="page-link cursor-pointer">
              1
            </Link>
            <Link to="#" className="page-link cursor-pointer">
              2
            </Link>
            <Link to="#" className="page-link cursor-pointer">
              3
            </Link>
            <Link to="#" className="page-link cursor-pointer">
              Next
            </Link>
          </CPagination>
        </div> */}
      </div>
    </div>
  )
}

export default Daftar
