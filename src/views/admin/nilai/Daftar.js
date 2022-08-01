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
      setNilais(responseTwo.data.jadwal)

      console.log(
        responseTwo.data.jadwal.map((d) => ({
          nis: "'" + responseTwo.data.nip,
          nama: `${responseTwo.data.nama}`,
          matpel: `${responseTwo.data.mataPelajaran.nama}`,
          ruang: `${d.ruang}`,
          tanggal: `${new Date(d.tanggal).toLocaleString()}`,
          nilai: `${d.nilai[0] ? d.nilai[0].nilai : 'Belum ada nilai'}`,
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

      const responseTwo = await axios.get(`http://localhost:5000/siswa/${response.data.id}/jadwal`)
      setNilais(responseTwo.data.jadwal)

      setData(
        responseTwo.data.jadwal.map((d) => ({
          nip: "'" + d.guru.nip,
          nama: `${d.guru.nama}`,
          matpel: `${d.guru.mataPelajaran.nama}`,
          ruang: `${d.ruang}`,
          tanggal: `${new Date(d.tanggal).toLocaleString()}`,
          nilai: `${d.nilai[0] ? d.nilai[0].nilai : 'Belum ada nilai'}`,
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

  const swalDisplay = async (id) => {
    swal({
      title: 'Apakah anda yakin?',
      text: 'Data yang anda hapus tidak bisa dipulihkan kembali!' + id,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal('Data sukses dihapus!', {
          icon: 'success',
        })
      }
    })
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
        <CForm className="position-relative d-flex justify-content-center">
          <div className="input-group mb-3">
            <CButton color="primary" className="input-group-text btn-search">
              <i className="bx bx-search" />
            </CButton>
            <CFormInput
              type="text"
              id="search"
              name="search"
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
              {nilais ? (
                nilais.map((nilai, index) =>
                  nilai.nilai.map((nil) => (
                    // eslint-disable-next-line react/jsx-key
                    <CTableRow className="align-middle" key={nil.id}>
                      <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                      <CTableDataCell>{nil.siswa.nama}</CTableDataCell>
                      <CTableDataCell>{nilai.tanggal}</CTableDataCell>
                      <CTableDataCell>{nil.nilai}</CTableDataCell>
                      <CTableDataCell>
                        {nil.nilai ? (
                          <Link
                            to={`/nilai/${nil.id}`}
                            className="btn btn-soft-purple rounded-15 me-2"
                          >
                            Detil
                          </Link>
                        ) : (
                          ''
                        )}
                      </CTableDataCell>
                    </CTableRow>
                  )),
                )
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
              {nilais ? (
                nilais.map((nilai, index) => (
                  // eslint-disable-next-line react/jsx-key
                  <CTableRow className="align-middle" key={nilai.id}>
                    <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                    {auth.role !== 3 ? (
                      <CTableDataCell>{nilai.jadwal.guru.nama}</CTableDataCell>
                    ) : (
                      <CTableDataCell>{nilai.guru.mataPelajaran.nama}</CTableDataCell>
                    )}

                    {auth.role === 1 && (
                      <CTableDataCell>{nilai.jadwal.guru.mataPelajaran.nama}</CTableDataCell>
                    )}
                    {auth.role === 3 && <CTableDataCell>{nilai.guru.nama}</CTableDataCell>}

                    {auth.role === 1 && <CTableDataCell>{nilai.nilai}</CTableDataCell>}
                    {auth.role === 3 && (
                      <CTableDataCell>{nilai.nilai[0] ? nilai.nilai[0].nilai : '-'}</CTableDataCell>
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
                        {nilai.nilai[0] ? (
                          <Link
                            to={`/nilai/${nilai.nilai[0].id}`}
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
