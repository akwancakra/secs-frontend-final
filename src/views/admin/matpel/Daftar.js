import { CButton, CForm, CFormInput, CSpinner } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BannerMedium } from 'src/components'
import swal from 'sweetalert'
import AOS from 'aos'
import 'aos/dist/aos.css'
import DataTable from 'react-data-table-component'
import 'src/assets/css/datatables.css'
import axios from 'axios'

const Daftar = () => {
  const [datas, setDatas] = useState([])

  useEffect(() => {
    document.title = 'Daftar Mata Pelajaran | Aplis'
    AOS.init()
    AOS.refresh()
    getData()
  }, [])

  const banner = {
    title: 'Daftar Mata Pelajaran',
    text: 'Berikut ini adalah daftar mata pelajaran yang ada.',
  }

  const swalDisplay = async (id) => {
    swal({
      title: 'Apakah anda yakin?',
      text: 'Data yang anda hapus tidak bisa dipulihkan kembali!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        await axios.delete(`http://localhost:5000/mata-pelajaran/${id}`).then(() => {
          swal('Data sukses dihapus!', {
            icon: 'success',
          })
        })
        getData()
      }
    })
  }

  const getData = async () => {
    const response = await axios.get('http://localhost:5000/mata-pelajaran/data')
    setDatas(
      response.data.map((d, index) => ({
        id: d.id,
        number: index + 1,
        nama: d.nama,
        aksi: (
          <>
            <Link to={`/ad/matpel/ubah/${d.id}`} className="btn btn-warning rounded-15 me-1">
              Ubah
            </Link>
            <button
              type="button"
              className="btn btn-danger rounded-15"
              onClick={() => swalDisplay(d.id)}
            >
              Hapus
            </button>
          </>
        ),
      })),
    )
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
          data={datas}
          progressComponent={<CSpinner color="primary" />}
          pagination
        />
      </div>
    </div>
  )
}

export default Daftar
