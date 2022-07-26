/* eslint-disable react/prop-types */
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import defaultBanner from 'src/assets/images/avatars/siswa.png'
import swal from 'sweetalert'
import AOS from 'aos'
import 'aos/dist/aos.css'
import axios from 'axios'

const SiswaCard = ({ siswa, auth }) => {
  const navigate = useNavigate()
  AOS.init()
  AOS.refresh()

  const swalDisplay = async (id) => {
    swal({
      title: 'Apakah anda yakin?',
      text: 'Data yang anda hapus tidak bisa dipulihkan kembali!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          await axios.delete(`http://localhost:5000/siswa/delete/${id}`)
          swal({
            title: 'Sukses',
            text: 'Data berhasil dihapus!',
            icon: 'success',
          }).then(() => {
            navigate('/ad/siswa/tambah')
          })
        } catch (error) {
          if (error.response) {
            swal({
              title: 'Gagal',
              text: error.response.data.message,
              icon: 'error',
            })
          }
        }
      }
    })
  }

  return (
    <div className="col-12 col-md-4">
      <div
        className="jadwal-card preview-wrapper py-2 overflow-hidden"
        data-aos="fade-up"
        data-aos-easing="ease-in-sine"
        data-aos-duration="500"
      >
        <div
          className="preview shadow bg-white rounded-15"
          style={{ width: '100%', maxWidth: '100vw' }}
        >
          <div
            className="head px-3 py-2"
            style={{
              backgroundImage: `url(${siswa.photo !== 'siswa.png' ? siswa.photo : defaultBanner})`,
              minHeight: '250px',
            }}
          ></div>
          <div className="over-head"></div>
          <div className="contents px-3 row">
            <div className="col-6">
              <div className="d-flex align-items-center">
                <i className="bx bx-user me-1"></i>
                <p className="mb-0">Nama</p>
              </div>
              <h4 className="fw-bold">{siswa.nama}</h4>
            </div>
            <div className="col-6">
              <div className="d-flex align-items-center">
                <i className="bx bx-id-card me-1"></i>
                <p className="mb-0">NIS</p>
              </div>
              <h4 className="fw-bold">{siswa.nis}</h4>
            </div>
            <div className="col-6">
              <div className="d-flex align-items-center">
                <i className="bx bx-book me-1"></i>
                <p className="mb-0">Agama</p>
              </div>
              <h4 className="fw-bold">{siswa.agama}</h4>
            </div>
            <div className="col-6">
              <div className="d-flex align-items-center">
                <i className="bx bx-body me-1"></i>
                <p className="mb-0">Jenis Kelamin</p>
              </div>
              <h4 className="fw-bold">{siswa.jenis_kelamin}</h4>
            </div>
            {auth === 1 && (
              <div className="col-12 mb-3 d-flex">
                <Link
                  to={`/ad/siswa/ubah/${siswa.id}`}
                  className="btn btn-warning rounded-15 w-100 me-1"
                >
                  Ubah
                </Link>
                <button
                  type="button"
                  className="btn btn-danger rounded-15 w-100"
                  onClick={() => swalDisplay(siswa.id)}
                >
                  Hapus
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SiswaCard
