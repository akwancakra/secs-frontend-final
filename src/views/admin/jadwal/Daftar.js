import { CAlert, CButton, CForm, CFormInput, CPagination, CPaginationItem } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Select from 'react-select'
import { BannerMedium, JadwalCard } from 'src/components'
import AOS from 'aos'
import 'aos/dist/aos.css'

const Daftar = () => {
  const [tanggal, setTanggal] = useState('')
  const [guru, setGuru] = useState('')
  const [materi, setMateri] = useState('')
  const [search, setSearch] = useState('')
  const [msg, setMsg] = useState('')

  useEffect(() => {
    document.title = 'Daftar Jadwal | Aplis'
    AOS.init()
    AOS.refresh()
  }, [])

  const banner = { title: 'Daftar Jadwal', text: 'Berikut ini adalah daftar jadwal yang ada.' }

  const jadwals = [
    {
      id: 1,
      ruangan: 'RPL 1',
      tanggal: '2022-07-21 00:00:00.000',
      dosen: { nama: 'Prof. H. Naimin', matpel: { id: 1, nama: 'Matematika' } },
    },
    {
      id: 2,
      ruangan: 'TKJ 2',
      tanggal: '2022-07-28 00:00:00.000',
      dosen: { nama: 'Dr. Hasan Basri', matpel: { id: 4, nama: 'Dasar Desain Grafis' } },
    },
  ]

  const jadwalData = [
    { value: 1, label: 'Matematika - 20 Juli 2022' },
    { value: 2, label: 'Sastra Arab - 22 Juli 2022' },
    { value: 3, label: 'Penjas - 20 Juli 2022' },
  ]

  const guruData = [
    { value: 1, label: 'Prof. H. Naiman' },
    { value: 2, label: 'Syukri S.pd' },
    { value: 3, label: 'Maman Sukarman' },
  ]

  const handleSearch = async (e) => {
    e.preventDefault()

    console.log(search, materi, guru, tanggal)
    console.log(
      `http://localhost:5000/jadwal/main?search=` +
        search +
        `&materi=` +
        materi +
        `&guru=` +
        guru +
        `&tanggal=` +
        tanggal,
    )
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
                placeholder="Cari berdasarkan nama alumni, nis, angkatan, atau jurusan..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
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
            values={tanggal}
            onChange={(e) => setTanggal(e.target.value)}
          />
          <Select
            placeholder="Guru"
            name="guru"
            options={guruData}
            className="select2 rounded-15 col-12 col-md-auto me-2"
            values={guru}
            onChange={(e) => setGuru(e.value)}
          />
          <Select
            placeholder="Materi"
            name="materi"
            options={jadwalData}
            className="select2 rounded-15 col-12 col-md-auto me-2"
            values={materi}
            onChange={(e) => setMateri(e.value)}
          />
          <button type="submit" className="btn btn-soft-purple me-1 rounded-15 col-12 col-md-auto">
            Filter <i className="align-middle bi bi-funnel-fill"></i>
          </button>
        </div>
      </CForm>

      <div className="mb-4 row">
        {jadwals ? (
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

      <div className="d-flex justify-content-end">
        <CPagination>
          <CPaginationItem className="cursor-pointer">
            <Link to="#">Previous</Link>
          </CPaginationItem>
          <CPaginationItem className="cursor-pointer">
            <Link to="#">1</Link>
          </CPaginationItem>
          <CPaginationItem className="cursor-pointer">
            <Link to="#">2</Link>
          </CPaginationItem>
          <CPaginationItem className="cursor-pointer">
            <Link to="#">3</Link>
          </CPaginationItem>
          <CPaginationItem className="cursor-pointer">
            <Link to="#">Next</Link>
          </CPaginationItem>
        </CPagination>
      </div>
    </div>
  )
}

export default Daftar
