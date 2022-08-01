import { CAlert, CButton, CForm, CFormInput, CPagination, CPaginationItem } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { SiswaCard, BannerMedium } from 'src/components'
import { useSelector } from 'react-redux'
import AOS from 'aos'
import 'aos/dist/aos.css'
import axios from 'axios'

const Daftar = () => {
  const [search, setSearch] = useState('')
  const [siswas, setSiswas] = useState([])
  const auth = useSelector((state) => state.auth)

  useEffect(() => {
    document.title = 'Daftar Siswa | Aplis'
    AOS.init()
    AOS.refresh()
    getDatas()
  }, [])

  const banner = { title: 'Daftar Siswa', text: 'Berikut ini adalah daftar siswa yang ada.' }

  const getDatas = async () => {
    const response = await axios.get('http://localhost:5000/siswa/data')
    setSiswas(response.data)
  }

  const searchData = async (e) => {
    e.preventDefault()

    const resposne = await axios.get(`http://localhost:5000/api/siswa?search=${search}`)
    setSiswas(resposne.data)
  }

  return (
    <div>
      <BannerMedium data={banner} />

      <div
        className="search mt-2"
        data-aos="fade-up"
        data-aos-easing="ease-in-sine"
        data-aos-duration="300"
      >
        <CForm
          className="position-relative d-flex justify-content-center"
          onSubmit={(e) => searchData(e)}
        >
          <div className="input-group mb-3">
            <CButton type="submit" color="primary" className="input-group-text btn-search">
              <i className="bx bx-search" />
            </CButton>
            <CFormInput
              type="text"
              id="search"
              name="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari berdasarkan nama, atau nis"
            />
          </div>
        </CForm>
      </div>

      <div className="mb-4 row">
        {siswas ? (
          siswas.map((siswa) => (
            // eslint-disable-next-line react/jsx-key
            <SiswaCard siswa={siswa} auth={auth.role} key={siswa.id} />
          ))
        ) : (
          <CAlert
            color="primary"
            className="rounded-15"
            data-aos="fade-up"
            data-aos-easing="ease-in-sine"
            data-aos-duration="500"
          >
            Tidak ada data <strong>Siswa</strong>
          </CAlert>
        )}
      </div>
    </div>
  )
}

export default Daftar
