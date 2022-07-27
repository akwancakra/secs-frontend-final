import React, { useEffect } from 'react'
import { CCol, CContainer, CRow } from '@coreui/react'
import { Link } from 'react-router-dom'

const Page404 = () => {
  useEffect(() => {
    document.title = '404 Page Not Found | Aplis'
  }, [])

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <div className="clearfix mb-3">
              <h1 className="float-start display-3 me-4 text-purple fw-bold">404</h1>
              <h4 className="pt-3">Oops! kesalahan.</h4>
              <p className="text-medium-emphasis float-start">
                Halaman yang anda tuju tidak ditemukan.
              </p>
            </div>
            <Link to={`/ad/dashboard`} className="btn btn-purple rounded-15 w-100">
              Kembali ke dashboard
            </Link>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Page404
