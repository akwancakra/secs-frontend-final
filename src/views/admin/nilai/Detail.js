import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { BannerMedium, NilaiDetail } from 'src/components'
import { useSelector } from 'react-redux'
import AOS from 'aos'
import 'aos/dist/aos.css'
import axios from 'axios'
import { CSpinner } from '@coreui/react'

const Detail = () => {
  const [loading, setLoading] = useState(false)
  const [nilai, setNilai] = useState([])

  const { id } = useParams()
  const navigate = useNavigate()
  const auth = useSelector((state) => state.auth)

  useEffect(() => {
    document.title = 'Detil Nilai | Aplis'
    AOS.init()
    AOS.refresh()
    setLoading(true)
    getNilai()
  }, [])

  const getNilai = async () => {
    if (auth.role !== 3) {
      const response = await axios.get(`http://localhost:5000/nilai/${id}`)
      if (response.data == '') {
        navigate('/nilai/main')
      }
      setNilai(response.data)

      if (auth.role === 2) {
        const responseTwo = await axios.get(`http://localhost:5000/guru/user-id/${auth.id}`)
        if (response.data.jadwal.guru.id !== responseTwo.data.id) {
          navigate('/nilai/main')
        }
      }
    } else if (auth.role === 3) {
      const response = await axios.get(`http://localhost:5000/siswa/user-id/${auth.id}`)

      const responseTwo = await axios.get(
        `http://localhost:5000/nilai/siswa-id/${response.data.id}`,
      )
      if (!responseTwo || response.data.id !== responseTwo.data.siswaId) {
        navigate('/nilai/main')
      }
      setNilai(responseTwo.data)
    }
    setLoading(false)
  }

  const banner = { title: 'Detil Nilai', text: 'Berikut ini adalah detil nilai.' }

  return (
    <div>
      <BannerMedium data={banner} />

      <div>
        <Link
          to="/nilai/main"
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
          <NilaiDetail nilai={nilai} auth={auth.role} />
        )}
      </div>
    </div>
  )
}

export default Detail
