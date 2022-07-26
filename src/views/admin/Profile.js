import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BannerMedium } from 'src/components'
import profilImg from '../../assets/images/avatars/user.png'

const Profile = () => {
  const auth = 'admin'

  useEffect(() => {
    document.title = 'Profil | Aplis'
  }, [])

  const banner = { title: 'Profil', text: '' }
  const user = {
    id: 1,
    nama: 'Akwan Cakra Tajimalela',
    nis: 192010382,
    agama: 'Islam',
    jenis_kelamin: 'Laki-laki',
  }

  return (
    <div>
      <BannerMedium data={banner} />

      <div className="jadwal-card-detail preview-wrapper my-3 bg-white">
        <div
          className="head px-3 d-flex align-items-center justify-content-end"
          style={{ backgroundColor: 'var(--purple-main)', maxHeight: '150px' }}
        >
          <Link to="/profil/ubah" className="btn btn-warning fw-bold rounded-15 me-2">
            Ubah
          </Link>
        </div>
        <div className="over-head"></div>
        <div className="img-profil position-relative">
          <img
            src={profilImg}
            alt="Image Profil"
            className="position-absolute"
            style={{ bottom: '-20px', left: '20px' }}
          />
        </div>
        <div className="content p-3 row rounded-15" style={{ marginTop: '25px' }}>
          <div className="col-12 col-md-6">
            <div className="d-flex align-items-center">
              <p className="mb-0">Nama</p>
            </div>
            <h4 className="fw-bold">{user.nama}</h4>
          </div>
          <div className="col-12 col-md-6">
            <div className="d-flex align-items-center">
              <p className="mb-0">NIS</p>
            </div>
            <h4 className="fw-bold">{user.nis}</h4>
          </div>
          <div className="col-12 col-md-6">
            <div className="d-flex align-items-center">
              <p className="mb-0">Agama</p>
            </div>
            <h4 className="fw-bold">{user.agama}</h4>
          </div>
          <div className="col-12 col-md-6">
            <div className="d-flex align-items-center">
              <p className="mb-0">Jenis Kelamin</p>
            </div>
            <h4 className="fw-bold">{user.jenis_kelamin}</h4>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
