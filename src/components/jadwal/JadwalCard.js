/* eslint-disable react/prop-types */
import React from 'react'
import defaultBanner from 'src/assets/images/banner-default.jpg'
import { Link } from 'react-router-dom'

// eslint-disable-next-line react/prop-types
const JadwalCard = ({ jadwalData }) => {
  return (
    <div className="col-12 col-md-6">
      <div className="jadwal-card preview-wrapper py-2">
        <div
          className="preview shadow bg-white rounded-15"
          style={{ width: '100%', maxWidth: '100vw' }}
        >
          <div
            className="head px-3 py-2"
            style={{ backgroundImage: `url(${defaultBanner})` }}
          ></div>
          <div className="over-head"></div>
          <div className="content px-3 row">
            <div className="col-6">
              <div className="d-flex align-items-center">
                <i className="bx bxs-school me-1"></i>
                <p className="mb-0">Ruangan</p>
              </div>
              <h4 className="fw-bold">{jadwalData.ruangan}</h4>
            </div>
            <div className="col-6">
              <div className="d-flex align-items-center">
                <i className="bx bx-calendar me-1"></i>
                <p className="mb-0">Tanggal</p>
              </div>
              <h4 className="fw-bold">{new Date(jadwalData.tanggal).toLocaleString()}</h4>
            </div>
            <div className="col-12">
              <div className="d-flex align-items-center">
                <i className="bx bx-chalkboard me-1"></i>
                <p className="mb-0">Pengajar</p>
              </div>
              <h4 className="fw-bold">{jadwalData.dosen.nama}</h4>
            </div>
            <div className="col-12">
              <div className="d-flex align-items-center">
                <i className="bx bx-book me-1"></i>
                <p className="mb-0">Pelajaran</p>
              </div>
              <h4 className="fw-bold">{jadwalData.dosen.matpel.nama}</h4>
            </div>
            <div className="mt-2 pb-3">
              <Link
                to={`/jadwal/${jadwalData.id}`}
                className="btn btn-purple fw-bold w-100 rounded-15 text-white"
              >
                Lihat Detil
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JadwalCard
