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
import swal from 'sweetalert'
import { CSVLink, CSVDownload } from 'react-csv'

const Daftar = () => {
  useEffect(() => {
    document.title = 'Daftar Nilai | Aplis'
  }, [])

  const banner = { title: 'Daftar Nilai', text: 'Berikut ini adalah daftar nilai yang ada.' }
  const nilais = [
    { id: 1, nama: 'Akwan Cakra', matpel: 'MTK', nilai: 92 },
    { id: 2, nama: 'Dandy Alyahmin', matpel: 'MTK', nilai: 87 },
    { id: 3, nama: 'Reza Mohammad', matpel: 'IPS', nilai: 65 },
  ]

  const auth = 'admin'

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
    { label: 'First Name', key: 'firstname' },
    { label: 'Last Name', key: 'lastname' },
    { label: 'Email', key: 'email' },
  ]

  const data = [
    { firstname: 'Ahmed', lastname: 'Tomi', email: 'ah@smthing.co.com' },
    { firstname: 'Raed', lastname: 'Labes', email: 'rl@smthing.co.com' },
    { firstname: 'Yezzi', lastname: 'Min l3b', email: 'ymin@cocococo.com' },
  ]

  return (
    <div>
      <BannerMedium data={banner} />

      <div className="search mt-2">
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

      <div className="d-flex mb-3">
        <Link to="/nilai/tambah" className="btn btn-purple rounded-15 me-2">
          Tambah Nilai
        </Link>
        <CSVLink
          data={data}
          headers={headers}
          className="btn btn-success rounded-15 text-white"
          filename={'my-file.csv'}
          onClick={() => {
            swal('Horeee!', 'Data nilai berhasil diunduh!', 'success')
          }}
        >
          Download Excel
        </CSVLink>
      </div>

      <div className="tabel-custom-wrapper">
        <CTable hover borderless className="bg-white rounded-15">
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col" className="fw-bold">
                #
              </CTableHeaderCell>
              <CTableHeaderCell scope="col" className="fw-bold">
                {auth == 'admin' && 'Nama'}
                {auth == 'guru' && 'Nama'}
                {auth == 'siswa' && 'Matpel'}
              </CTableHeaderCell>
              <CTableHeaderCell scope="col" className="fw-bold">
                {auth == 'admin' && 'Matpel'}
                {auth == 'guru' && 'Tanggal'}
                {auth == 'siswa' && 'Pengajar'}
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
                    {auth == 'admin' && (
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
