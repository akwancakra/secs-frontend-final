import { CAlert, CSpinner } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { BannerMedium, JadwalDetail } from 'src/components'
import JadwalSiswa from 'src/components/jadwal/JadwalSiswa'
import { useSelector } from 'react-redux'
import AOS from 'aos'
import 'aos/dist/aos.css'
import axios from 'axios'

const Detail = () => {
  const [loading, setLoading] = useState([])
  const [jadwal, setJadwal] = useState([])
  const navigate = useNavigate()
  const auth = useSelector((state) => state.auth)
  const { id } = useParams()

  const banner = { title: 'Detil Jadwal', text: '' }

  useEffect(() => {
    document.title = 'Detail Jadwal | Aplis'
    AOS.init()
    AOS.refresh()
    setLoading(true)
    getJadwal()
  }, [])

  const getJadwal = async () => {
    const response = await axios.get(`http://localhost:5000/jadwal/${id}`)
    if (response.data == '') {
      navigate('/jadwal/main')
    }
    setJadwal(response.data)
    setLoading(false)
  }

  return (
    <div>
      <BannerMedium data={banner} />

      <div>
        <Link
          to="/jadwal/main"
          className="btn btn-soft-purple rounded-15 fw-bold d-flex align-items-center mt-3"
          style={{ width: 'fit-content' }}
          data-aos="fade-up"
          data-aos-easing="ease-in-sine"
          data-aos-duration="300"
        >
          <i className="bx bxs-chevron-left"></i> Kembali
        </Link>
      </div>

      <div className="mb-4 mt-1">
        {loading ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ width: '100%', minHeight: '250px' }}
          >
            <CSpinner color="purple" />
          </div>
        ) : (
          <JadwalDetail jadwal={jadwal} auth={auth} />
        )}
      </div>

      <h2 className="mb-0 fw-bold mt-4 mb-2">Siswa</h2>
      <div className="row">
        {loading ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ width: '100%', minHeight: '250px' }}
          >
            <CSpinner color="purple" />
          </div>
        ) : jadwal.siswa[0] ? (
          jadwal.siswa.map((siswa, index) => (
            // eslint-disable-next-line react/jsx-key
            <JadwalSiswa siswa={siswa} index={index} key={siswa.id} />
          ))
        ) : (
          <CAlert color="primary" className="rounded-15">
            Tidak ada data <strong>siswa</strong> untuk ditampilkan.
          </CAlert>
        )}
      </div>
    </div>
  )
}

export default Detail
