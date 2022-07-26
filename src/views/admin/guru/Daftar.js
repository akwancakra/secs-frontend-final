import { CAlert, CButton, CForm, CFormInput, CPagination, CPaginationItem } from '@coreui/react'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { GuruCard, BannerMedium } from 'src/components'

const Daftar = () => {
  useEffect(() => {
    document.title = 'Daftar Guru | Aplis'
  }, [])

  const auth = 'admin'
  const banner = { title: 'Daftar Guru', text: 'Berikut ini adalah daftar guru yang ada.' }
  const gurus = [
    { id: 1, nama: 'Prof. H. Naimin', matpel: { id: 1, nama: 'Matematika' } },
    { id: 2, nama: 'Hj. Tasya Bahari', matpel: { id: 1, nama: 'Matematika' } },
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
              placeholder="Cari berdasarkan nama, nip, atau mata pelajaran"
            />
          </div>
        </CForm>
      </div>

      <div className="mb-4 row">
        {gurus ? (
          gurus.map((guru) => (
            // eslint-disable-next-line react/jsx-key
            <GuruCard guru={guru} auth={auth} key={guru.id} />
          ))
        ) : (
          <CAlert color="primary" className="rounded-15">
            Tidak ada data <strong>Guru</strong>
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
