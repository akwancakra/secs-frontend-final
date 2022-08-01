import { CAlert, CButton, CForm, CFormInput, CPagination, CPaginationItem } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { GuruCard, BannerMedium } from 'src/components'
import { useSelector } from 'react-redux'
import AOS from 'aos'
import 'aos/dist/aos.css'
import axios from 'axios'

const Daftar = () => {
  const [search, setSearch] = useState('')
  const [gurus, setGurus] = useState([])
  const auth = useSelector((state) => state.auth)

  const banner = { title: 'Daftar Guru', text: 'Berikut ini adalah daftar guru yang ada.' }

  useEffect(() => {
    document.title = 'Daftar Guru | Aplis'
    AOS.init()
    AOS.refresh()
    getGuru()
  }, [])

  const getGuru = async () => {
    await axios.get('http://localhost:5000/guru/data').then((result) => {
      setGurus(result.data)
    })
  }

  const SearchData = async (e) => {
    e.preventDefault()

    const resposne = await axios.get(`http://localhost:5000/api/guru?search=${search}`)
    setGurus(resposne.data)
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
          onSubmit={(e) => SearchData(e)}
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
              placeholder="Cari berdasarkan nama, nip, atau mata pelajaran"
            />
          </div>
        </CForm>
      </div>

      <div className="mb-4 row">
        {gurus.length > 0 ? (
          gurus.map((guru) => (
            // eslint-disable-next-line react/jsx-key
            <GuruCard guru={guru} auth={auth.role} key={guru.id} />
          ))
        ) : (
          <CAlert color="primary" className="rounded-15">
            Tidak ada data <strong>Guru</strong>
          </CAlert>
        )}
      </div>
    </div>
  )
}

export default Daftar
