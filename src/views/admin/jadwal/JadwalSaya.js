import {
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

const Daftar = () => {
  const banner = {
    title: 'Daftar Jadwal',
    text: 'Berikut ini adalah daftar jadwal yang anda miliki.',
  }

  useEffect(() => {
    document.title = 'Jadwal Saya | Aplis'
  }, [])

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
              placeholder="Cari berdasarkan nama jadwal, atau ruangan"
            />
          </div>
        </CForm>
      </div>

      <div className="d-flex mb-3">
        <Link to="/jadwal/tambah" className="btn btn-purple rounded-15">
          Tambah Jadwal
        </Link>
      </div>

      <div className="tabel-custom-wrapper">
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
                Jam
              </CTableHeaderCell>
              <CTableHeaderCell scope="col" className="fw-bold">
                Aksi
              </CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            <CTableRow className="align-middle">
              <CTableHeaderCell scope="row">1</CTableHeaderCell>
              <CTableDataCell>Mark</CTableDataCell>
              <CTableDataCell>Otto</CTableDataCell>
              <CTableDataCell>@mdo</CTableDataCell>
              <CTableDataCell>
                <Link to="/jadwal/1" className="btn btn-soft-purple rounded-15">
                  Detil
                </Link>
              </CTableDataCell>
            </CTableRow>
            <CTableRow className="align-middle">
              <CTableHeaderCell scope="row">2</CTableHeaderCell>
              <CTableDataCell>Jacob</CTableDataCell>
              <CTableDataCell>Thornton</CTableDataCell>
              <CTableDataCell>@fat</CTableDataCell>
              <CTableDataCell>
                <Link to="/jadwal/1" className="btn btn-soft-purple rounded-15">
                  Detil
                </Link>
              </CTableDataCell>
            </CTableRow>
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
