import {
  CAlert,
  CButton,
  CForm,
  CFormInput,
  CPagination,
  CPaginationItem,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
// LINK
import { Link } from 'react-router-dom'
// COMPOENNTS
import { BannerMedium } from 'src/components'
// ALERT
import swal from 'sweetalert'
// STATE MANAGEMENT
import { useSelector } from 'react-redux'
// REPORT
import { CSVLink } from 'react-csv'
// AOX
import AOS from 'aos'
import 'aos/dist/aos.css'
import axios from 'axios'

const Daftar = () => {
  const [search, setSearch] = useState('')
  const [nilais, setNilais] = useState([])
  const [guru, setGuru] = useState([])
  const [headers, setHeaders] = useState([])
  const [data, setData] = useState([])
  const auth = useSelector((state) => state.auth)
  const banner = { title: 'Daftar Nilai', text: 'Berikut ini adalah daftar nilai yang ada.' }

  useEffect(() => {
    document.title = 'Daftar Nilai | Aplis'
    AOS.init()
    AOS.refresh()
    getNilais()
  }, [])

  const getNilais = async () => {
    if (auth.role === 1) {
      const responseTwo = await axios.get(`http://localhost:5000/nilai/data`)
      setNilais(responseTwo.data)

      setData(
        responseTwo.data.map((d) => ({
          nip: "'" + d.jadwal.guru.nip,
          namaGuru: `${d.jadwal.guru.nama}`,
          matpel: `${d.jadwal.guru.mataPelajaran.nama}`,
          ruang: `${d.jadwal.ruang}`,
          tanggal: `${new Date(d.jadwal.tanggal).toLocaleString()}`,
          nis: "'" + d.siswa.nis,
          namaSiswa: `${d.siswa.nama}`,
          nilai: `${d.nilai ? d.nilai : 'Belum ada nilai'}`,
        })),
      )

      setHeaders([
        { label: 'NIP', key: 'nip' },
        { label: 'Nama Guru', key: 'namaGuru' },
        { label: 'Mata Pelajaran', key: 'matpel' },
        { label: 'Ruang', key: 'ruang' },
        { label: 'Tanggal', key: 'tanggal' },
        { label: 'NIS', key: 'nis' },
        { label: 'Nama Siswa', key: 'namaSiswa' },
        { label: 'Nilai', key: 'nilai' },
      ])
    } else if (auth.role === 2) {
      const response = await axios.get(`http://localhost:5000/guru/user-id/${auth.id}`)
      setGuru(response.data)

      const responseTwo = await axios.get(`http://localhost:5000/guru/${response.data.id}/nilai`)
      setNilais(responseTwo.data)

      setData(
        responseTwo.data.map((d) => ({
          nis: "'" + d.siswa.nis,
          nama: d.siswa.nama,
          matpel: d.jadwal.guru.mataPelajaran.nama,
          ruang: d.jadwal.ruang,
          tanggal: new Date(d.jadwal.tanggal).toLocaleString(),
          nilai: d.nilai ? d.nilai : 'Belum ada nilai',
        })),
      )

      setHeaders([
        { label: 'NIS', key: 'nis' },
        { label: 'Nama', key: 'nama' },
        { label: 'Mata Pelajaran', key: 'matpel' },
        { label: 'Ruang', key: 'ruang' },
        { label: 'Tanggal', key: 'tanggal' },
        { label: 'Nilai', key: 'nilai' },
      ])
    } else if (auth.role === 3) {
      const response = await axios.get(`http://localhost:5000/siswa/user-id/${auth.id}`)

      const responseTwo = await axios.get(`http://localhost:5000/siswa/${response.data.id}/nilai`)
      setNilais(responseTwo.data)

      setData(
        responseTwo.data.map((d) => ({
          nip: "'" + d.jadwal.guru.nip,
          nama: d.jadwal.guru.nama,
          matpel: d.jadwal.guru.mataPelajaran.nama,
          ruang: d.jadwal.ruang,
          tanggal: new Date(d.jadwal.tanggal).toLocaleString(),
          nilai: d.nilai ? d.nilai : 'Belum ada nilai',
        })),
      )

      setHeaders([
        { label: 'NIP', key: 'nip' },
        { label: 'Nama', key: 'nama' },
        { label: 'Mata Pelajaran', key: 'matpel' },
        { label: 'Ruang', key: 'ruang' },
        { label: 'Tanggal', key: 'tanggal' },
        { label: 'Nilai', key: 'nilai' },
      ])
    }
  }

  const searchData = async (e) => {
    e.preventDefault()

    const resposne = await axios.get(`http://localhost:5000/api/nilai?search=${search}`)
    setNilais(resposne.data)
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
              placeholder="Cari berdasarkan nama, materi, atau pengajar"
            />
          </div>
        </CForm>
      </div>

      <div
        className="d-flex mb-3"
        data-aos="fade-up"
        data-aos-easing="ease-in-sine"
        data-aos-duration="300"
      >
        {auth.role !== 3 && (
          <Link to="/nilai/tambah" className="btn btn-purple rounded-15 me-2">
            Tambah Nilai
          </Link>
        )}
        <CSVLink
          data={data}
          headers={headers}
          filename={'Daftar-Nilai.csv'}
          className="btn btn-success rounded-15"
          onClick={() => {
            swal('Horeee!', 'Daftar nilai berhasil diunduh!', 'success')
          }}
        >
          Unduh daftar nilai
        </CSVLink>
      </div>

      <div
        className="tabel-custom-wrapper"
        data-aos="fade-up"
        data-aos-easing="ease-in-sine"
        data-aos-duration="500"
      >
        {auth.role === 2 ? (
          <CTable hover borderless className="bg-white rounded-15">
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col" className="fw-bold">
                  #
                </CTableHeaderCell>
                <CTableHeaderCell scope="col" className="fw-bold">
                  Nama
                </CTableHeaderCell>
                <CTableHeaderCell scope="col" className="fw-bold">
                  Tanggal
                </CTableHeaderCell>
                <CTableHeaderCell scope="col" className="fw-bold">
                  Nilai
                </CTableHeaderCell>
                <CTableHeaderCell scope="col" className="fw-bold">
                  Aksi
                </CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {nilais != '' ? (
                nilais.map((nilai, index) => (
                  // eslint-disable-next-line react/jsx-key
                  <CTableRow className="align-middle" key={nilai.id}>
                    <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                    <CTableDataCell>{nilai.siswa.nama}</CTableDataCell>
                    <CTableDataCell>{nilai.jadwal.tanggal}</CTableDataCell>
                    <CTableDataCell>{nilai.nilai}</CTableDataCell>
                    <CTableDataCell>
                      {nilai.nilai ? (
                        <Link
                          to={`/nilai/${nilai.id}`}
                          className="btn btn-soft-purple rounded-15 me-2"
                        >
                          Detil
                        </Link>
                      ) : (
                        ''
                      )}
                    </CTableDataCell>
                  </CTableRow>
                ))
              ) : (
                <CTableRow className="align-middle">
                  <CTableDataCell colSpan="5">
                    <CAlert color="primary" className="rounded-15">
                      Tidak ada data <strong>Nilai</strong>
                    </CAlert>
                  </CTableDataCell>
                </CTableRow>
              )}
            </CTableBody>
          </CTable>
        ) : (
          <CTable hover borderless className="bg-white rounded-15">
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col" className="fw-bold">
                  #
                </CTableHeaderCell>
                <CTableHeaderCell scope="col" className="fw-bold">
                  {auth.role === 1 && 'Nama'}
                  {auth.role === 3 && 'Matpel'}
                </CTableHeaderCell>
                <CTableHeaderCell scope="col" className="fw-bold">
                  {auth.role === 1 && 'Matpel'}
                  {auth.role === 3 && 'Pengajar'}
                </CTableHeaderCell>
                <CTableHeaderCell scope="col" className="fw-bold">
                  Nilai
                </CTableHeaderCell>
                <CTableHeaderCell scope="col" className="fw-bold">
                  Aksi
                </CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {nilais != '' ? (
                nilais.map((nilai, index) => (
                  // eslint-disable-next-line react/jsx-key
                  <CTableRow className="align-middle" key={nilai.id}>
                    <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                    {auth.role !== 3 ? (
                      <CTableDataCell>{nilai.jadwal.guru.nama}</CTableDataCell>
                    ) : (
                      <CTableDataCell>{nilai.jadwal.guru.mataPelajaran.nama}</CTableDataCell>
                    )}

                    {auth.role === 1 && (
                      <CTableDataCell>{nilai.jadwal.guru.mataPelajaran.nama}</CTableDataCell>
                    )}
                    {auth.role === 3 && <CTableDataCell>{nilai.jadwal.guru.nama}</CTableDataCell>}

                    {auth.role === 1 && <CTableDataCell>{nilai.nilai}</CTableDataCell>}
                    {auth.role === 3 && (
                      <CTableDataCell>{nilai.nilai ? nilai.nilai : '-'}</CTableDataCell>
                    )}

                    {auth.role === 1 && (
                      <CTableDataCell>
                        {nilai.nilai ? (
                          <Link
                            to={`/nilai/${nilai.id}`}
                            className="btn btn-soft-purple rounded-15 me-2"
                          >
                            Detil
                          </Link>
                        ) : (
                          ''
                        )}
                      </CTableDataCell>
                    )}
                    {auth.role === 3 && (
                      <CTableDataCell>
                        {nilai.nilai ? (
                          <Link
                            to={`/nilai/${nilai.id}`}
                            className="btn btn-soft-purple rounded-15 me-2"
                          >
                            Detil
                          </Link>
                        ) : (
                          ''
                        )}
                      </CTableDataCell>
                    )}
                  </CTableRow>
                ))
              ) : (
                <CTableRow className="align-middle">
                  <CTableDataCell colSpan="5">
                    <CAlert color="primary" className="rounded-15">
                      Tidak ada data <strong>Nilai</strong>
                    </CAlert>
                  </CTableDataCell>
                </CTableRow>
              )}
            </CTableBody>
          </CTable>
        )}
      </div>
    </div>
  )
}

export default Daftar
