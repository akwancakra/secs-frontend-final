/* eslint-disable react/prop-types */
import React from 'react'
import defaultBanner from 'src/assets/images/banner-default.jpg'
import { Link } from 'react-router-dom'
import swal from 'sweetalert'

const GuruCard = ({ guru, auth }) => {
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
    <div className="col-12 col-md-4">
      <div className="jadwal-card preview-wrapper py-2">
        <div
          className="preview shadow bg-white rounded-15"
          style={{ width: '100%', maxWidth: '100vw' }}
        >
          <div
            className="head px-3 py-2"
            style={{ backgroundImage: `url(${defaultBanner})`, minHeight: '350px' }}
          ></div>
          <div className="over-head"></div>
          <div className="content px-3 row">
            <div className="col-12">
              <div className="d-flex align-items-center">
                <i className="bx bx-chalkboard me-1"></i>
                <p className="mb-0">Pengajar</p>
              </div>
              <h4 className="fw-bold">{guru.nama}</h4>
            </div>
            <div className="col-12">
              <div className="d-flex align-items-center">
                <i className="bx bx-book me-1"></i>
                <p className="mb-0">Pelajaran</p>
              </div>
              <h4 className="fw-bold">{guru.matpel.nama}</h4>
            </div>
            {auth == 'admin' ? (
              <div className="col-12 mb-3 d-flex">
                <Link
                  to={`/ad/guru/ubah/${guru.id}`}
                  className="btn btn-warning rounded-15 w-100 me-1"
                >
                  Ubah
                </Link>
                <button
                  type="button"
                  className="btn btn-danger rounded-15 w-100"
                  onClick={() => swalDisplay(guru.id)}
                >
                  Hapus
                </button>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default GuruCard
