import { CButton, CForm, CFormInput } from '@coreui/react'
import React from 'react'

const Comp = () => {
  return (
    <div>
      <div>
        <h3 className="fw-bold my-2">Medium Banner</h3>
        <div
          className="banner-medium text-white p-3 rounded-15 position-relative overflow-hidden"
          style={{ backgroundColor: 'var(--purple-dark)' }}
        >
          <div className="my-4 position-relative" style={{ zIndex: 10 }}>
            <h2 className="fw-bold mb-0">Daftar Nilai</h2>
            <p className="mb-0">Berikut adalah daftar nilai-nilai anda.</p>
          </div>
          <div className="d-flex position-absolute" style={{ right: '30px', top: '45px' }}>
            <div
              className="square-left me-2"
              style={{
                width: '230px',
                height: '50px',
                backgroundColor: 'var(--purple-main)',
                borderRadius: '50px 0 50px 0',
              }}
            />
            <div
              className="dot me-2"
              style={{
                width: '50px',
                height: '50px',
                backgroundColor: 'var(--purple-main)',
                borderRadius: '100%',
              }}
            />
            <div
              className="dot"
              style={{
                width: '50px',
                height: '50px',
                backgroundColor: 'var(--purple-main)',
                borderRadius: '100%',
              }}
            />
          </div>
        </div>

        <h3 className="fw-bold my-2">Large Banner</h3>
        <div className="banner-large text-white p-3 rounded-15 position-relative overflow-hidden">
          <div className="my-4 position-relative" style={{ zIndex: 10 }}>
            <h2 className="fw-bold mb-0">Hello, Akwan Cakra Tajimalela</h2>
            <p className="mb-0">Selamat datang kembali!</p>
          </div>
          <div className="position-absolute" style={{ left: 0, bottom: '20px' }}>
            <div
              className="square-left me-2"
              style={{
                width: '230px',
                height: '50px',
                backgroundColor: 'var(--purple-second)',
                borderRadius: '0 0 50px 0',
              }}
            />
            <div className="d-flex">
              <div
                className="square-left me-2"
                style={{
                  width: '400px',
                  height: '50px',
                  backgroundColor: 'var(--purple-main)',
                  borderRadius: '0 0 50px 0',
                }}
              />
              <div
                className="dot"
                style={{
                  width: '50px',
                  height: '50px',
                  backgroundColor: 'var(--purple-main)',
                  borderRadius: '100%',
                }}
              />
            </div>
          </div>
          <div className="position-absolute" style={{ right: '30px', top: '45px' }}>
            <div
              className="square-left me-2"
              style={{
                width: '230px',
                height: '50px',
                backgroundColor: 'var(--purple-main)',
                borderRadius: '50px 0 50px 0',
              }}
            />
            <div className="d-flex mt-2">
              <div
                className="dot me-2"
                style={{
                  width: '50px',
                  height: '50px',
                  backgroundColor: 'var(--purple-main)',
                  borderRadius: '100%',
                }}
              />
              <div
                className="dot"
                style={{
                  width: '50px',
                  height: '50px',
                  backgroundColor: 'var(--purple-main)',
                  borderRadius: '100%',
                }}
              />
            </div>
          </div>
          <button
            className="btn btn-purple fw-bold rounded-15 px-5 position-absolute"
            style={{ right: '30px', bottom: '30px' }}
          >
            Mulai
          </button>
        </div>

        <h3 className="fw-bold my-2">Button</h3>
        <div className="d-flex my-2">
          <button className="btn btn-danger px-5 me-1">Danger</button>
          <button className="btn btn-warning px-5 me-1">Warning</button>
          <button className="btn btn-success px-5 me-1">Success</button>
          <button className="btn btn-purple px-5 me-1">Primary</button>
        </div>
        <div className="d-flex my-2">
          <button className="btn btn-soft-danger px-5 me-1">Danger</button>
          <button className="btn btn-soft-warning px-5 me-1">Warning</button>
          <button className="btn btn-soft-success px-5 me-1">Success</button>
          <button className="btn btn-soft-purple px-5 me-1">Primary</button>
        </div>
        <div className="d-flex my-2">
          <button className="btn btn-soft-danger me-1">
            <i className="bi bi-trash-fill" /> Danger
          </button>
          <button className="btn btn-soft-warning me-1">
            <i className="bi bi-pencil-square" /> Warning
          </button>
          <button className="btn btn-soft-success me-1">
            <i className="bi bi-check-circle-fill" /> Success
          </button>
          <button className="btn btn-soft-purple me-1">
            <i className="bi bi-award-fill" /> Primary
          </button>
        </div>

        <h3 className="fw-bold my-2">Three Graph</h3>
        <div className="three-graph row g-0">
          <div className="col text-white">
            <div className="m-2 p-2 bg-purple rounded-15 position-relative overflow-hidden">
              <div className="position-relative" style={{ zIndex: 10 }}>
                <p className="mb-0">Jadwal</p>
                <h1 className="fw-bold mb-0 py-3" style={{ fontSize: '58px' }}>
                  12
                </h1>
              </div>
              <div
                className="square-left me-2 position-absolute"
                style={{
                  top: 0,
                  right: '20px',
                  width: '40px',
                  height: '90px',
                  backgroundColor: 'var(--purple-dark)',
                  borderRadius: '0 0 50px 0',
                }}
              />
            </div>
          </div>
          <div className="col text-white">
            <div className="m-2 p-2 bg-purple rounded-15 position-relative overflow-hidden">
              <div className="position-relative" style={{ zIndex: 10 }}>
                <p className="mb-0">Jadwal</p>
                <h1 className="fw-bold mb-0 py-3" style={{ fontSize: '58px' }}>
                  12
                </h1>
              </div>
              <div
                className="dot position-absolute"
                style={{
                  top: '10px',
                  right: '20px',
                  width: '50px',
                  height: '50px',
                  backgroundColor: 'var(--purple-dark)',
                  borderRadius: '100%',
                }}
              />
              <div
                className="dot position-absolute"
                style={{
                  top: '60px',
                  right: '20px',
                  width: '50px',
                  height: '50px',
                  backgroundColor: 'var(--purple-dark)',
                  borderRadius: '100%',
                }}
              />
            </div>
          </div>
          <div className="col text-white">
            <div className="m-2 p-2 bg-purple rounded-15 position-relative overflow-hidden">
              <div className="position-relative" style={{ zIndex: 10 }}>
                <p className="mb-0">Jadwal</p>
                <h1 className="fw-bold mb-0 py-3" style={{ fontSize: '58px' }}>
                  12
                </h1>
              </div>
              <div
                className="square-left me-2 position-absolute"
                style={{
                  top: 0,
                  right: '20px',
                  width: '40px',
                  height: '90px',
                  backgroundColor: 'var(--purple-dark)',
                  borderRadius: '0 0 50px 0',
                }}
              />
              <div
                className="square-left me-2 position-absolute"
                style={{
                  top: 0,
                  right: '60px',
                  width: '40px',
                  height: '70px',
                  backgroundColor: 'var(--purple-main-hover)',
                  borderRadius: '0 0 50px 0',
                }}
              />
            </div>
          </div>
        </div>
        <h3 className="fw-bold my-2">Search Bar</h3>
        <div className="search">
          <CForm className="position-relative d-flex justify-content-center">
            <div className="input-group mb-3">
              <CButton color="primary" className="input-group-text btn-search">
                <i className="bx bx-search" />
              </CButton>
              <CFormInput
                type="text"
                id="search"
                name="search"
                placeholder="Cari berdasarkan nama alumni, nis, angkatan, atau jurusan..."
              />
            </div>
          </CForm>
        </div>
        <h3 className="fw-bold my-2">Pagination</h3>
        <nav className="m-2">
          <ul className="pagination">
            <li className="page-item active">
              <a className="page-link text-purple" href="#">
                Previous
              </a>
            </li>
            <li className="page-item">
              <a className="page-link text-purple" href="#">
                1
              </a>
            </li>
            <li className="page-item">
              <a className="page-link text-purple" href="#">
                2
              </a>
            </li>
            <li className="page-item">
              <a className="page-link text-purple" href="#">
                3
              </a>
            </li>
            <li className="page-item">
              <a className="page-link text-purple" href="#">
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default Comp
