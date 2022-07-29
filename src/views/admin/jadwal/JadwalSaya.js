import {
  CAlert,
  CButton,
  CForm,
  CFormInput,
  CPagination,
  CPaginationItem,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BannerMedium } from 'src/components'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { useSelector } from 'react-redux'
import swal from 'sweetalert'

const Daftar = () => {
  const auth = useSelector((state) => state.auth)
  const banner = {
    title: 'Daftar Jadwal',
    text: 'Berikut ini adalah daftar jadwal yang anda miliki.',
  }

  const jadwals = [
    {
      id: 1,
      ruangan: 'RPL 1',
      tanggal: '2022-07-21 00:00:00.000',
      dosen: { nama: 'Prof. H. Naimin', matpel: { id: 1, nama: 'Matematika' } },
    },
    {
      id: 2,
      ruangan: 'TKJ 2',
      tanggal: '2022-07-28 00:00:00.000',
      dosen: { nama: 'Prof. H. Naimin', matpel: { id: 1, nama: 'Matematika' } },
    },
  ]

  useEffect(() => {
    document.title = 'Jadwal Saya | Aplis'
    AOS.init()
    AOS.refresh()
  }, [])

  const swalDisplay = async (id) => {
    swal({
      title: 'Apakah anda yakin?',
      text: 'Data yang anda hapus tidak bisa dipulihkan kembali!' + id,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal('Data sukses dihapus!', {
          icon: 'success',
        })
      }
    })
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
        {auth.account.role === 'guru' && (
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
              {/* {matpels > 0 ? ( */}
              {jadwals ? (
                jadwals.map((jadwal, index) => (
                  // eslint-disable-next-line react/jsx-key
                  <CTableRow className="align-middle" key={jadwal.id}>
                    <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                    <CTableDataCell>{jadwal.dosen.matpel.nama}</CTableDataCell>
                    <CTableDataCell>{jadwal.ruangan}</CTableDataCell>
                    <CTableDataCell>{new Date(jadwal.tanggal).toLocaleString()}</CTableDataCell>
                    <CTableDataCell>
                      <Link to="/jadwal/1" className="btn btn-soft-purple rounded-15 me-1">
                        Detil
                      </Link>
                      <button
                        className="btn btn-danger rounded-15"
                        onClick={() => swalDisplay(jadwal.id)}
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
                      Tidak ada data <strong>Mata pelajaran</strong>
                    </CAlert>
                  </CTableDataCell>
                </CTableRow>
              )}
            </CTableBody>
          </CTable>
        )}
        {auth.account.role === 'siswa' && (
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
              {/* {matpels > 0 ? ( */}
              {jadwals ? (
                jadwals.map((jadwal, index) => (
                  // eslint-disable-next-line react/jsx-key
                  <CTableRow className="align-middle" key={jadwal.id}>
                    <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                    <CTableDataCell>{jadwal.dosen.nama}</CTableDataCell>
                    <CTableDataCell>{jadwal.dosen.matpel.nama}</CTableDataCell>
                    <CTableDataCell>{jadwal.ruangan}</CTableDataCell>
                    <CTableDataCell>{new Date(jadwal.tanggal).toLocaleString()}</CTableDataCell>
                    <CTableDataCell>
                      <Link to="/jadwal/1" className="btn btn-soft-purple rounded-15 me-1">
                        Detil
                      </Link>
                      <button
                        className="btn btn-danger rounded-15"
                        onClick={() => swalDisplay(jadwal.id)}
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
                      Tidak ada data <strong>Mata pelajaran</strong>
                    </CAlert>
                  </CTableDataCell>
                </CTableRow>
              )}
            </CTableBody>
          </CTable>
        )}

        <div className="d-flex justify-content-end">
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
        </div>
      </div>
    </div>
  )
}

export default Daftar
