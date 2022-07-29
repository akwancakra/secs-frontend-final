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
import { Link } from 'react-router-dom'
import { BannerMedium } from 'src/components'
import swal from 'sweetalert'
import AOS from 'aos'
import 'aos/dist/aos.css'
import DataTable from 'react-data-table-component'
import 'src/assets/css/datatables.css'

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

  const columns = [
    {
      name: '#',
      maxWidth: '70px',
      minWidth: '60px',
      selector: (row) => row.number,
      sortable: true,
    },
    {
      name: 'Nama',
      selector: (row) => row.nama,
      sortable: true,
    },
    {
      name: 'Aksi',
      selector: (row) => row.aksi,
    },
  ]

  const data = [
    {
      id: 1,
      number: 1,
      nama: 'Matematika',
      aksi: (
        <>
          <Link to="/ad/matpel/ubah/1" className="btn btn-warning rounded-15 me-1">
            Ubah
          </Link>
          <button
            type="button"
            className="btn btn-soft-danger rounded-15"
            onClick={() => swalDisplay(1)}
          >
            Hapus
          </button>
        </>
      ),
    },
    {
      id: 2,
      number: 2,
      nama: 'Sastra Arab',
      aksi: (
        <>
          <Link to="/ad/matpel/ubah/2" className="btn btn-warning rounded-15 me-1">
            Ubah
          </Link>
          <button
            type="button"
            className="btn btn-soft-danger rounded-15"
            onClick={() => swalDisplay(2)}
          >
            Hapus
          </button>
        </>
      ),
    },
    {
      id: 3,
      number: 3,
      nama: 'Bahasa Inggris',
      aksi: (
        <>
          <Link to="/ad/matpel/ubah/3" className="btn btn-warning rounded-15 me-1">
            Ubah
          </Link>
          <button
            type="button"
            className="btn btn-soft-danger rounded-15"
            onClick={() => swalDisplay(3)}
          >
            Hapus
          </button>
        </>
      ),
    },
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
        <DataTable
          columns={columns}
          data={data}
          progressComponent={<CSpinner color="primary" />}
          pagination
        />
      </div>
    </div>
  )
}

export default Daftar
