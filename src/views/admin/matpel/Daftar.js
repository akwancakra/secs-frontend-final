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
import AOS from 'aos'
import 'aos/dist/aos.css'

const Daftar = () => {
  useEffect(() => {
    document.title = 'Daftar Mata Pelajaran | Aplis'
    AOS.init()
    AOS.refresh()
  }, [])

  const banner = {
    title: 'Daftar Mata Pelajaran',
    text: 'Berikut ini adalah daftar mata pelajaran yang ada.',
  }
  const matpels = [
    { id: 1, nama: 'Matematika' },
    { id: 2, nama: 'Dasar Desain Grafis' },
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
              placeholder="Cari berdasarkan nama mata pelajaran"
            />
          </div>
        </CForm>
      </div>

      <div className="d-flex mb-3">
        <Link
          to="/ad/matpel/tambah"
          className="btn btn-purple rounded-15"
          data-aos="fade-up"
          data-aos-easing="ease-in-sine"
          data-aos-duration="300"
        >
          Tambah Mata Pelajaran
        </Link>
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
                Nama
              </CTableHeaderCell>
              <CTableHeaderCell scope="col" className="fw-bold">
                Aksi
              </CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {/* {matpels > 0 ? ( */}
            {matpels ? (
              matpels.map((matpel, index) => (
                // eslint-disable-next-line react/jsx-key
                <CTableRow className="align-middle">
                  <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                  <CTableDataCell>{matpel.nama}</CTableDataCell>
                  <CTableDataCell>
                    <Link
                      to={`/ad/matpel/ubah/${matpel.id}`}
                      className="btn btn-warning rounded-15 me-2"
                    >
                      Ubah
                    </Link>
                    <button
                      className="btn btn-danger rounded-15"
                      onClick={() => swalDisplay(matpel.id)}
                    >
                      Hapus
                    </button>
                  </CTableDataCell>
                </CTableRow>
              ))
            ) : (
              <CTableRow className="align-middle">
                <CTableDataCell colSpan="3">
                  <CAlert color="primary" className="rounded-15">
                    Tidak ada data <strong>Mata pelajaran</strong>
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
