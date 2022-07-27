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
// LINK
import { Link } from 'react-router-dom'
// COMPOENNTS
import { BannerMedium } from 'src/components'
// ALERT
import swal from 'sweetalert'
// STATE MANAGEMENT
import { useSelector } from 'react-redux'
// REPORT
import { CSVLink } from 'react-csv'
// AOX
import AOS from 'aos'
import 'aos/dist/aos.css'

const Daftar = () => {
  const auth = useSelector((state) => state.auth)

  useEffect(() => {
    document.title = 'Daftar Nilai | Aplis'
    AOS.init()
    AOS.refresh()
  }, [])

  const banner = { title: 'Daftar Nilai', text: 'Berikut ini adalah daftar nilai yang ada.' }
  const nilais = [
    { id: 1, nama: 'Akwan Cakra', matpel: 'MTK', nilai: 92 },
    { id: 2, nama: 'Dandy Alyahmin', matpel: 'MTK', nilai: 87 },
    { id: 3, nama: 'Reza Mohammad', matpel: 'IPS', nilai: 65 },
  ]

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

  const headers = [
    { label: 'Nama', key: 'nama' },
    { label: 'Mata Pelajaran', key: 'matpel' },
    { label: 'Nilai', key: 'nilai' },
  ]

  const data = [
    { nama: 'Ahmed Jayadi', matpel: 'Matematika', nilai: '89' },
    { nama: 'Akwan Cakra Tajimalela', matpel: 'Matematika', nilai: '90' },
    { nama: 'Dandy Alyahmin', matpel: 'Sastra Arab', nilai: '92' },
  ]

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
              placeholder="Cari berdasarkan nama, materi, atau pengajar"
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
        <Link to="/nilai/tambah" className="btn btn-purple rounded-15 me-2">
          Tambah Nilai
        </Link>
        <CSVLink
          data={data}
          headers={headers}
          filename={'Daftar-Nilai.csv'}
          className="btn btn-success rounded-15"
          onClick={() => {
            swal('Horeee!', 'Daftar nilai berhasil diunduh!', 'success')
          }}
        >
          Unduh daftar nilai
        </CSVLink>
      </div>

      <div
        className="tabel-custom-wrapper"
        data-aos="fade-up"
        data-aos-easing="ease-in-sine"
        data-aos-duration="500"
      >
        <CTable hover borderless className="bg-white rounded-15">
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col" className="fw-bold">
                #
              </CTableHeaderCell>
              <CTableHeaderCell scope="col" className="fw-bold">
                {auth.account.role === 'admin' && 'Nama'}
                {auth.account.role === 'guru' && 'Nama'}
                {auth.account.role === 'siswa' && 'Matpel'}
              </CTableHeaderCell>
              <CTableHeaderCell scope="col" className="fw-bold">
                {auth.account.role === 'admin' && 'Matpel'}
                {auth.account.role === 'guru' && 'Tanggal'}
                {auth.account.role === 'siswa' && 'Pengajar'}
              </CTableHeaderCell>
              <CTableHeaderCell scope="col" className="fw-bold">
                Nilai
              </CTableHeaderCell>
              <CTableHeaderCell scope="col" className="fw-bold">
                Aksi
              </CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {/* {nilais > 0 ? ( */}
            {nilais ? (
              nilais.map((nilai, index) => (
                // eslint-disable-next-line react/jsx-key
                <CTableRow className="align-middle">
                  <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                  <CTableDataCell>{nilai.nama}</CTableDataCell>
                  <CTableDataCell>{nilai.matpel}</CTableDataCell>
                  <CTableDataCell>{nilai.nilai}</CTableDataCell>
                  <CTableDataCell>
                    <Link to={`/nilai/${nilai.id}`} className="btn btn-soft-purple rounded-15 me-2">
                      Detil
                    </Link>
                    {auth.account.role === 'admin' && (
                      <button
                        type="button"
                        className="btn btn-danger rounded-15"
                        onClick={() => swalDisplay(nilai.id)}
                      >
                        Hapus
                      </button>
                    )}
                  </CTableDataCell>
                </CTableRow>
              ))
            ) : (
              <CTableRow className="align-middle">
                <CTableDataCell colSpan="5">
                  <CAlert color="primary" className="rounded-15">
                    Tidak ada data <strong>Nilai</strong>
                  </CAlert>
                </CTableDataCell>
              </CTableRow>
            )}
          </CTableBody>
        </CTable>

        <div className="d-flex justify-content-end">
          <CPagination>
            <CPaginationItem className="cursor-pointer">
              <Link to="#">Previous</Link>
            </CPaginationItem>
            <CPaginationItem className="cursor-pointer">
              <Link to="#">1</Link>
            </CPaginationItem>
            <CPaginationItem className="cursor-pointer">
              <Link to="#">2</Link>
            </CPaginationItem>
            <CPaginationItem className="cursor-pointer">
              <Link to="#">3</Link>
            </CPaginationItem>
            <CPaginationItem className="cursor-pointer">
              <Link to="#">Next</Link>
            </CPaginationItem>
          </CPagination>
        </div>
      </div>
    </div>
  )
}

export default Daftar
