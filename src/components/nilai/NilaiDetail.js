/* eslint-disable react/prop-types */
import React from 'react'
import swal from 'sweetalert'
import AOS from 'aos'
import 'aos/dist/aos.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const NilaiDetail = ({ nilai, auth }) => {
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
        await axios
          .delete(`http://localhost:5000/nilai/delete/${id}`)
          .then(() => {
            swal({
              title: 'Sukses?',
              text: 'Anda berhasil menghapus data nilai!',
              icon: 'success',
            }).then(() => {
              navigate('/nilai/main')
            })
          })
          .catch((error) => {
            if (error.response) {
              swal(error.response.data.message, {
                icon: 'error',
                dangerMode: true,
              })
            }
          })
      }
    })
  }

  return (
    <div
      className="jadwal-card-detail preview-wrapper my-3 bg-white"
      data-aos="fade-up"
      data-aos-easing="ease-in-sine"
      data-aos-duration="500"
    >
      <div
        className="head px-3 d-flex align-items-center justify-content-end"
        style={{ backgroundColor: 'var(--purple-main)', height: '150px' }}
      >
        {auth === 1 && (
          <button
            type="button"
            className="btn btn-danger fw-bold rounded-15"
            onClick={() => swalDisplay(nilai.id)}
          >
            Hapus
          </button>
        )}
      </div>
      <div className="over-head"></div>
      <div className="content p-3 row rounded-15">
        <div className="col-12 col-md-6">
          <div className="d-flex align-items-center">
            <i className="bx bxs-school me-1"></i>
            <p className="mb-0">Ruangan</p>
          </div>
          <h4 className="fw-bold">{nilai.jadwal ? nilai.jadwal.ruang : 'Ruangan'}</h4>
        </div>
        <div className="col-12 col-md-6">
          <div className="d-flex align-items-center">
            <i className="bx bx-calendar me-1"></i>
            <p className="mb-0">Tanggal</p>
          </div>
          <h4 className="fw-bold">
            {nilai.jadwal ? new Date(nilai.jadwal.tanggal).toLocaleString() : 'Tanggal'}
          </h4>
        </div>
        <div className="col-12 col-md-6">
          <div className="d-flex align-items-center">
            <i className="bx bx-chalkboard me-1"></i>
            <p className="mb-0">Pengajar</p>
          </div>
          <h4 className="fw-bold">{nilai.jadwal ? nilai.jadwal.guru.nama : 'Pengajar'}</h4>
        </div>
        <div className="col-12 col-md-6">
          <div className="d-flex align-items-center">
            <i className="bx bx-book me-1"></i>
            <p className="mb-0">Pelajaran</p>
          </div>
          <h4 className="fw-bold">
            {nilai.jadwal ? nilai.jadwal.guru.mataPelajaran.nama : 'Pelajaran'}
          </h4>
        </div>
        <div className="col-12 col-md-6">
          <div className="d-flex align-items-center">
            <i className="bx bx-user me-1"></i>
            <p className="mb-0">Siswa</p>
          </div>
          <h4 className="fw-bold">{nilai.siswa ? nilai.siswa.nama : 'Siswa'}</h4>
        </div>
        <div className="col-12 col-md-6">
          <div className="d-flex align-items-center">
            <i className="bx bx-receipt me-1"></i>
            <p className="mb-0">Nilai</p>
          </div>
          <h4 className="fw-bold" style={{ fontSize: '46px' }}>
            {(() => {
              if (nilai.nilai >= 91) {
                return <span>{nilai.nilai} (A+)</span>
              } else if (nilai.nilai >= 81) {
                return <span>{nilai.nilai} (B+)</span>
              } else if (nilai.nilai >= 61) {
                return <span>{nilai.nilai} (C+)</span>
              } else if (nilai.nilai >= 51) {
                return <span>{nilai.nilai} (D+)</span>
              } else {
                return 'Nilai'
              }
            })()}
          </h4>
        </div>
      </div>
    </div>
  )
}

export default NilaiDetail
