import React, { useEffect } from 'react'
import { CCol, CContainer, CRow } from '@coreui/react'

const Page500 = () => {
  useEffect(() => {
    document.title = '500 Error on server | Aplis'
  }, [])

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <span className="clearfix mb-2">
              <h1 className="float-start display-3 me-4 fw-bold text-purple">500</h1>
              <h4 className="pt-3">Maaf, terdapat kesalahan disisi server!</h4>
              <p className="text-medium-emphasis float-start">
                Halaman yang anda tuju saat ini tidak bisa diakses.
              </p>
            </span>
            <button className="btn btn-purple rounded-15 w-100">Kembali ke dashboard</button>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Page500
