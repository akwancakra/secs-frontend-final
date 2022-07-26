import { CAlert, CButton, CForm, CFormInput, CPagination, CPaginationItem } from '@coreui/react'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { SiswaCard, BannerMedium } from 'src/components'

const Daftar = () => {
  useEffect(() => {
    document.title = 'Daftar Siswa | Aplis'
  }, [])

  const auth = 'admin'
  const banner = { title: 'Daftar Siswa', text: 'Berikut ini adalah daftar siswa yang ada.' }
  const siswas = [
    { id: 1, nama: 'Akwan Cakra', nis: 192010382, agama: 'Islam', jenis_kelamin: 'Laki-laki' },
    { id: 2, nama: 'Dandy Alyahmin', nis: 192010383, agama: 'Islam', jenis_kelamin: 'Laki-laki' },
  ]

  return (
    <div>
      <BannerMedium data={banner} />

      <div className="search mt-2">
        <CForm className="position-relative d-flex justify-content-center">
          <div className="input-group mb-3">
            <CButton color="primary" className="input-group-text btn-search">
              <i className="bx bx-search" />
            </CButton>
            <CFormInput
              type="text"
              id="search"
              name="search"
              placeholder="Cari berdasarkan nama, atau nis"
            />
          </div>
        </CForm>
      </div>

      <div className="mb-4 row">
        {/* {siswas > 0 ? ( */}
        {siswas ? (
          siswas.map((siswa) => (
            // eslint-disable-next-line react/jsx-key
            <SiswaCard siswa={siswa} auth={auth} key={siswa.id} />
          ))
        ) : (
          <CAlert color="primary" className="rounded-15">
            Tidak ada data <strong>Siswa</strong>
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
