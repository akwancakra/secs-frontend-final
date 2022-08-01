/* eslint-disable react/prop-types */
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import defaultBanner from 'src/assets/images/banner-default.jpg'
import swal from 'sweetalert'
import AOS from 'aos'
import 'aos/dist/aos.css'
import axios from 'axios'
import { toast } from 'react-toastify'

const JadwalDetail = ({ jadwal, auth }) => {
  const navigate = useNavigate()
  AOS.init()
  AOS.refresh()

  const handleDaftar = async () => {
    let siswaId = 0
    swal({
      title: 'Apakah anda yakin?',
      text: 'Anda akan mendaftar ke jadwal ini',
      icon: 'info',
      buttons: true,
    }).then(async (willDaftar) => {
      if (willDaftar) {
        try {
          await axios.get(`http://localhost:5000/siswa/user-id/${auth.id}`).then((result) => {
            siswaId = result.data.id
          })

          await axios
            .post('http://localhost:5000/jadwal-siswa-siswa/create', {
              id_siswa: siswaId,
              id_jadwal: jadwal.id,
            })
            .then(() => {
              toast.success('Berhasil mendaftar jadwal!', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              })

              navigate('/jadwal-saya')
            })
        } catch (error) {
          if (error.response) {
            toast.warning(error.response.data.message, {
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            })
          } else {
            toast.error('Maaf terjadi error pada server', {
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            })
          }
        }
      }
    })
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
        await axios.delete(`http://localhost:5000/jadwal/delete/${id}`)
        toast.success('Berhasil menghapus jadwal!', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
        navigate('/jadwal/main')
      }
    })
  }

  return (
    <div
      className="jadwal-card-detail preview-wrapper my-3 bg-white shadow"
      data-aos="fade-up"
      data-aos-easing="ease-in-sine"
      data-aos-duration="400"
    >
      <div
        className="head px-3 d-flex align-items-center justify-content-end"
        style={{
          backgroundImage: `url(${
            jadwal.photo !== 'banner-default.jpg' ? jadwal.photo : defaultBanner
          })`,
        }}
      >
        {auth.role === 1 ||
          (auth.id === jadwal.guru.userId && (
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
          ))}
        {auth.role === 3 && (
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
          <h4 className="fw-bold">{jadwal.ruang}</h4>
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
          <h4 className="fw-bold">{jadwal.guru.nama}</h4>
        </div>
        <div className="col-12 col-md-6">
          <div className="d-flex align-items-center">
            <i className="bx bx-book me-1"></i>
            <p className="mb-0">Pelajaran</p>
          </div>
          <h4 className="fw-bold">{jadwal.guru.mataPelajaran.nama}</h4>
        </div>
      </div>
    </div>
  )
}

export default JadwalDetail
