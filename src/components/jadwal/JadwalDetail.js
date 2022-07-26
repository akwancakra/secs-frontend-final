/* eslint-disable react/prop-types */
import React from 'react'
import { Link } from 'react-router-dom'
import defaultBanner from 'src/assets/images/banner-default.jpg'
import swal from 'sweetalert'

const JadwalDetail = ({ jadwal, auth }) => {
  const handleDaftar = async () => {
    console.log('anda terdaftarkan')
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

  return (
    <div className="jadwal-card-detail preview-wrapper my-3 bg-white shadow">
      <div
        className="head px-3 d-flex align-items-center justify-content-end"
        style={{ backgroundImage: `url(${defaultBanner})` }}
      >
        {auth === 'admin' && (
          <>
            <Link
              to={`/jadwal/ubah/${jadwal.id}`}
              className="btn btn-warning fw-bold rounded-15 me-2"
            >
              Ubah
            </Link>
            <button
              type="button"
              className="btn btn-danger fw-bold rounded-15"
              onClick={() => swalDisplay(jadwal.id)}
            >
              Hapus
            </button>
          </>
        )}
        {auth == 'siswa' && (
          <>
            <button
              type="button"
              className="btn btn-soft-purple fw-bold rounded-15 me-2"
              onClick={handleDaftar}
            >
              Daftar
            </button>
          </>
        )}
      </div>
      <div className="over-head"></div>
      <div className="content p-3 row rounded-15">
        <div className="col-12 col-md-6">
          <div className="d-flex align-items-center">
            <i className="bx bxs-school me-1"></i>
            <p className="mb-0">Ruangan</p>
          </div>
          <h4 className="fw-bold">{jadwal.ruangan}</h4>
        </div>
        <div className="col-12 col-md-6">
          <div className="d-flex align-items-center">
            <i className="bx bx-calendar me-1"></i>
            <p className="mb-0">Tanggal</p>
          </div>
          <h4 className="fw-bold">{new Date(jadwal.tanggal).toLocaleString()}</h4>
        </div>
        <div className="col-12 col-md-6">
          <div className="d-flex align-items-center">
            <i className="bx bx-chalkboard me-1"></i>
            <p className="mb-0">Pengajar</p>
          </div>
          <h4 className="fw-bold">{jadwal.dosen.nama}</h4>
        </div>
        <div className="col-12 col-md-6">
          <div className="d-flex align-items-center">
            <i className="bx bx-book me-1"></i>
            <p className="mb-0">Pelajaran</p>
          </div>
          <h4 className="fw-bold">{jadwal.dosen.matpel.nama}</h4>
        </div>
      </div>
    </div>
  )
}

export default JadwalDetail
