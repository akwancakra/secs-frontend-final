import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CRow,
} from '@coreui/react'
import { CChartBar } from '@coreui/react-chartjs'
import React, { useEffect, useState } from 'react'
import AOS from 'aos'
import { useSelector } from 'react-redux'
import 'aos/dist/aos.css'
import axios from 'axios'

const Dashboard = () => {
  const jadwalDiambil = [12, 20, 32, 50, 32]
  const jadwalSelesai = [22, 10, 12, 31, 8]

  const [jadwal, setJadwal] = useState('')

  const [guru, setGuru] = useState([])
  const auth = useSelector((state) => state.auth)

  useEffect(() => {
    document.title = 'Dashboard Guru | Aplis'
    AOS.init()
    AOS.refresh()
    getGuru()
  }, [])

  const getGuru = async () => {
    const response = await axios.get(`http://localhost:5000/guru/user-id/${auth.id}`)
    setGuru(response.data)

    const responseTwo = await axios.get(
      `http://localhost:5000/jadwal/total/guru/${response.data.id}`,
    )
    setJadwal(responseTwo.data)
  }

  return (
    <div>
      <div
        className="banner-large text-white p-3 rounded-15 position-relative overflow-hidden"
        data-aos="fade-up"
        data-aos-easing="ease-in-sine"
        data-aos-duration="300"
      >
        <div className="my-4 position-relative" style={{ zIndex: 10 }}>
          <h2 className="fw-bold mb-0">Halo, {guru.nama}</h2>
          <p className="mb-0">Selamat datang kembali!</p>
        </div>
        <div className="position-absolute" style={{ left: 0, bottom: '20px' }}>
          <div
            className="square-left me-2"
            style={{
              width: '230px',
              height: '50px',
              backgroundColor: 'var(--purple-second)',
              borderRadius: '0 0 50px 0',
            }}
          />
          <div className="d-flex">
            <div
              className="square-left me-2"
              style={{
                width: '400px',
                height: '50px',
                backgroundColor: 'var(--purple-main)',
                borderRadius: '0 0 50px 0',
              }}
            />
            <div
              className="dot"
              style={{
                width: '50px',
                height: '50px',
                backgroundColor: 'var(--purple-main)',
                borderRadius: '100%',
              }}
            />
          </div>
        </div>
        <div className="position-absolute" style={{ right: '30px', top: '45px' }}>
          <div
            className="square-left me-2"
            style={{
              width: '230px',
              height: '50px',
              backgroundColor: 'var(--purple-main)',
              borderRadius: '50px 0 50px 0',
            }}
          />
          <div className="d-flex mt-2">
            <div
              className="dot me-2"
              style={{
                width: '50px',
                height: '50px',
                backgroundColor: 'var(--purple-main)',
                borderRadius: '100%',
              }}
            />
            <div
              className="dot"
              style={{
                width: '50px',
                height: '50px',
                backgroundColor: 'var(--purple-main)',
                borderRadius: '100%',
              }}
            />
          </div>
        </div>
      </div>

      <div className="three-graph row g-0">
        <div
          className="col-12 text-white"
          data-aos="fade-up"
          data-aos-easing="ease-in-sine"
          data-aos-duration="300"
        >
          <div className="my-sm-3 mt-3 ms-0 p-2 bg-purple rounded-15 position-relative overflow-hidden">
            <div className="position-relative" style={{ zIndex: 10 }}>
              <p className="mb-0">Total Jadwal</p>
              <h1 className="fw-bold mb-0 py-3" style={{ fontSize: '58px' }}>
                {jadwal}
              </h1>
            </div>
            <div
              className="square-left me-2 position-absolute"
              style={{
                top: 0,
                right: '20px',
                width: '40px',
                height: '90px',
                backgroundColor: 'var(--purple-dark)',
                borderRadius: '0 0 50px 0',
              }}
            />
          </div>
        </div>
      </div>

      <div data-aos="fade-up" data-aos-easing="ease-in-sine" data-aos-duration="500">
        <CRow>
          <CCol xs={12} md={6}>
            <CCard className="mb-4 rounded-15" style={{ maxHeight: '400px' }}>
              <CCardHeader className="d-flex align-items-center justify-content-between">
                <p className="mb-0">Siswa mengambil jadwal</p>
              </CCardHeader>
              <CCardBody>
                <CChartBar
                  data={{
                    labels: ['MTK', 'IPA', 'IPS', 'B. IND', 'B. ING'],
                    datasets: [
                      {
                        label: 'Jadwal diambil',
                        backgroundColor: '#A449FF',
                        data: jadwalDiambil,
                      },
                    ],
                  }}
                  labels="months"
                />
              </CCardBody>
            </CCard>
          </CCol>
          <CCol xs={12} md={6}>
            <CCard className="mb-4 rounded-15 mt-2" style={{ maxHeight: '400px' }}>
              <CCardHeader>
                <p className="mb-0">Jadwal Selesai</p>
              </CCardHeader>
              <CCardBody>
                <CChartBar
                  data={{
                    labels: ['MTK', 'IPA', 'IPS', 'B. IND', 'B. ING'],
                    datasets: [
                      {
                        label: 'Jadwal Selesai',
                        backgroundColor: '#A449FF',
                        data: jadwalSelesai,
                      },
                    ],
                  }}
                  labels="months"
                />
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </div>
    </div>
  )
}

export default Dashboard
