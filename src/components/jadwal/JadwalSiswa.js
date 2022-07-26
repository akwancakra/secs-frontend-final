/* eslint-disable react/prop-types */
import React from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

const JadwalSiswa = ({ siswa, index }) => {
  AOS.init()
  AOS.refresh()

  return (
    <div
      className="col-6 col-md-4"
      data-aos="fade-up"
      data-aos-easing="ease-in-sine"
      data-aos-duration="600"
    >
      <div className="mahasiswa-wrapper my-2">
        <div className="head">
          <span className="fw-bold px-3 text-white">{index + 1}</span>
        </div>
        <div className="content shadow p-3 bg-white">
          <div className="my-2">
            <div className="d-flex align-items-center">
              <i className="bx bx-user-pin me-1"></i>
              <p className="mb-0">Nama</p>
            </div>
            <h5 className="mb-0 fw-bold">{siswa.nama}</h5>
          </div>
          <div className="my-2">
            <div className="d-flex align-items-center">
              <i className="bx bx-id-card me-1"></i>
              <p className="mb-0">NIS</p>
            </div>
            <h5 className="mb-0 fw-bold">{siswa.nis}</h5>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JadwalSiswa
