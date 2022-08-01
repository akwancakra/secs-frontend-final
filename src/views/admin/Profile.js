import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BannerMedium } from 'src/components'
import profilImg from 'src/assets/images/avatars/user.png'
import siswaImg from 'src/assets/images/avatars/siswa.png'
import { useSelector } from 'react-redux'
import AOS from 'aos'
import 'aos/dist/aos.css'
import axios from 'axios'
import { CImage } from '@coreui/react'

const Profile = () => {
  const auth = useSelector((state) => state.auth)
  const banner = { title: 'Profil', text: '' }
  // const dispatch = useDispatch()
  const [profil, setProfil] = useState([])

  useEffect(() => {
    document.title = 'Profil | Aplis'
    AOS.init()
    AOS.refresh()
    getData()
  }, [])

  const getData = async () => {
    let url = ''
    if (auth.role == 1) {
      url = `http://localhost:5000/admin/user-id/${auth.id}`
    } else if (auth.role == 2) {
      url = `http://localhost:5000/guru/user-id/${auth.id}`
    } else if (auth.role == 3) {
      url = `http://localhost:5000/siswa/user-id/${auth.id}`
    }

    const response = await axios.get(url)
    setProfil(response.data)
  }

  return (
    <div>
      <BannerMedium data={banner} />

      <div
        className="jadwal-card-detail preview-wrapper my-3 bg-white"
        data-aos="fade-up"
        data-aos-easing="ease-in-sine"
        data-aos-duration="400"
      >
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
          {auth.role === 1 && (
            <CImage
              src={profilImg}
              alt="Image Profil"
              className="position-absolute"
              style={{ bottom: '-20px', left: '20px', objectFit: 'cover' }}
            />
          )}
          {auth.role === 2 && (
            <CImage
              src={profil.photo !== 'user.png' ? profil.photo : profilImg}
              alt="Image Profil"
              className="position-absolute"
              style={{ bottom: '-20px', left: '20px', objectFit: 'cover' }}
            />
          )}
          {auth.role === 3 && (
            <CImage
              src={profil.photo !== 'siswa.png' ? profil.photo : siswaImg}
              alt="Image Profil"
              className="position-absolute"
              style={{ bottom: '-20px', left: '20px', objectFit: 'cover' }}
            />
          )}
        </div>
        <div className="content p-3 row rounded-15" style={{ marginTop: '25px' }}>
          <div className="col-12 col-md-6">
            <div className="d-flex align-items-center">
              <p className="mb-0">Nama</p>
            </div>
            <h4 className="fw-bold">{profil.nama}</h4>
          </div>
          {auth.role === 3 && (
            <div className="col-12 col-md-6">
              <div className="d-flex align-items-center">
                <p className="mb-0">NIS</p>
              </div>
              <h4 className="fw-bold">{profil.nis}</h4>
            </div>
          )}
          {auth.role === 2 && (
            <div className="col-12 col-md-6">
              <div className="d-flex align-items-center">
                <p className="mb-0">NIP</p>
              </div>
              <h4 className="fw-bold">{profil.nip}</h4>
            </div>
          )}
          {auth.role !== 1 && (
            <>
              <div className="col-12 col-md-6">
                <div className="d-flex align-items-center">
                  <p className="mb-0">Agama</p>
                </div>
                <h4 className="fw-bold">{profil.agama}</h4>
              </div>
              <div className="col-12 col-md-6">
                <div className="d-flex align-items-center">
                  <p className="mb-0">Jenis Kelamin</p>
                </div>
                <h4 className="fw-bold">{profil.jenis_kelamin}</h4>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile
