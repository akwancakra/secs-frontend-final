import { CAlert, CButton, CForm, CFormInput } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import { BannerMedium, JadwalCard } from 'src/components'
import AOS from 'aos'
import 'aos/dist/aos.css'
import axios from 'axios'

const Daftar = () => {
  const [jadwals, setJadwals] = useState([])
  const [guru, setGuru] = useState([])
  const [materi, setMateri] = useState([])

  const [searchVal, setSearchVal] = useState('')
  const [guruVal, setGuruVal] = useState('')
  const [tanggalVal, setTanggalVal] = useState('')
  const [materiVal, setMateriVal] = useState('')

  useEffect(() => {
    document.title = 'Daftar Jadwal | Aplis'
    AOS.init()
    AOS.refresh()
    getJadwal()
  }, [])

  const getJadwal = async () => {
    await axios.get('http://localhost:5000/jadwal/data').then((result) => {
      setJadwals(result.data)
    })

    const response = await axios.get('http://localhost:5000/guru/data')
    setGuru(
      response.data.map((d) => ({
        value: d.id,
        label: `${d.nama} - ${d.mataPelajaran.nama}`,
      })),
    )

    const responseTwo = await axios.get('http://localhost:5000/mata-pelajaran/data')
    setMateri(
      responseTwo.data.map((d) => ({
        value: d.nama,
        label: d.nama,
      })),
    )
  }

  const banner = { title: 'Daftar Jadwal', text: 'Berikut ini adalah daftar jadwal yang ada.' }

  const handleSearch = async (e) => {
    e.preventDefault()

    const response = await axios.get(
      `http://localhost:5000/jadwal?ruang=${searchVal}&guru=${guruVal}&matpel=${materiVal}&tanggal=${tanggalVal}`,
    )
    setJadwals(response.data)
    console.log(
      `http://localhost:5000/jadwal?ruang=${searchVal}&guru=${guruVal}&matpel=${materiVal}&tanggal=${tanggalVal}`,
    )
  }

  const clearSearch = async () => {
    setGuruVal('')
    setTanggalVal('')
    setMateriVal('')
    setSearchVal('')

    const response = await axios.get(`http://localhost:5000/jadwal?ruang=&guru=&matpel=&tanggal=`)
    setJadwals(response.data)
  }

  return (
    <div>
      <BannerMedium data={banner} />

      <CForm onSubmit={handleSearch}>
        <div
          className="position-relative"
          data-aos="fade-up"
          data-aos-easing="ease-in-sine"
          data-aos-duration="300"
        >
          <div className="search mt-2">
            <div className="input-group mb-3">
              <CButton
                color="purple"
                type="submit"
                className="input-group-text btn-search rounded-15"
              >
                <i className="bx bx-search" />
              </CButton>
              <CFormInput
                type="text"
                id="search"
                name="search"
                placeholder="Cari berdasarkan ruangan..."
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="d-row d-md-flex mb-3 daftar-input">
          <CFormInput
            type="date"
            name="tanggal"
            className="rounded-15 me-2 mb-2 mb-md-0 col-12 col-md-auto"
            style={{ maxWidth: '160px' }}
            values={tanggalVal}
            onChange={(e) => setTanggalVal(e.target.value)}
          />
          <Select
            placeholder="Guru"
            name="guru"
            options={guru}
            className="select2 rounded-15 col-12 col-md-auto me-2"
            // values={guruVal}
            // value={guru.filter((option) => option.value === guruVal)}
            onChange={(e) => setGuruVal(e.value)}
          />
          <Select
            placeholder="Materi"
            name="materi"
            options={materi}
            className="select2 rounded-15 col-12 col-md-auto me-2"
            values={materiVal}
            onChange={(e) => setMateriVal(e.value)}
          />
          <button
            type="button"
            className="btn btn-danger me-1 mb-2 mb-md-0 rounded-15 col-12 col-md-auto"
            onClick={() => clearSearch()}
          >
            Reset <i className="align-middle bi bi-x-circle"></i>
          </button>
          <button type="submit" className="btn btn-purple me-1 rounded-15 col-12 col-md-auto">
            Filter <i className="align-middle bi bi-funnel-fill"></i>
          </button>
        </div>
      </CForm>

      <div className="mb-4 row">
        {jadwals.length > 0 ? (
          jadwals.map((jadwal) => (
            // eslint-disable-next-line react/jsx-key
            <JadwalCard jadwalData={jadwal} key={jadwal.id} />
          ))
        ) : (
          <CAlert color="primary" className="rounded-15">
            Tidak ada data <strong>Jadwal</strong>
          </CAlert>
        )}
      </div>
    </div>
  )
}

export default Daftar
