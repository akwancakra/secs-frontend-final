import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'
import * as Middleware from 'src/middleware/index'

// routes config
import routes from '../routes'

// ROUTES
// ADMIN
const DashboardAdmin = React.lazy(() => import('src/views/admin/Dashboard'))
const DashboardGuru = React.lazy(() => import('src/views/guru/Dashboard'))
const DashboarSiswa = React.lazy(() => import('src/views/siswa/Dashboard'))

const TambahGuruAdmin = React.lazy(() => import('src/views/admin/guru/Tambah'))
const UbahGuruAdmin = React.lazy(() => import('src/views/admin/guru/Ubah'))

const TambahSiswaAdmin = React.lazy(() => import('src/views/admin/siswa/Tambah'))
const UbahSiswaAdmin = React.lazy(() => import('src/views/admin/siswa/Ubah'))

const MatpelAdmin = React.lazy(() => import('src/views/admin/matpel/Daftar'))
const TambahMatpelAdmin = React.lazy(() => import('src/views/admin/matpel/Tambah'))
const UbahMatpelAdmin = React.lazy(() => import('src/views/admin/matpel/Ubah'))

// GURU & SISWA
const JadwalSaya = React.lazy(() => import('src/views/admin/jadwal/JadwalSaya'))

// ADMIN & GURU
const TambahNilai = React.lazy(() => import('src/views/admin/nilai/Tambah'))
const TambahAllNilai = React.lazy(() => import('src/views/admin/nilai/TambahAll'))

const AppContent = () => {
  return (
    <CContainer lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          {/* FOR DASHBOARD */}
          <Route path="/ad/dashboard" element={<Middleware.Admin render={<DashboardAdmin />} />} />
          <Route path="/gr/dashboard" element={<Middleware.Guru render={<DashboardGuru />} />} />
          <Route path="/sw/dashboard" element={<Middleware.Siswa render={<DashboarSiswa />} />} />

          {/* FOR ADD SISWA GURU MATPEL */}
          {/* GURU */}
          <Route
            path="/ad/guru/tambah"
            element={<Middleware.Admin render={<TambahGuruAdmin />} />}
          />
          <Route
            path="/ad/guru/ubah/:id"
            element={<Middleware.Admin render={<UbahGuruAdmin />} />}
          />
          {/* SISWA */}
          <Route
            path="/ad/siswa/tambah"
            element={<Middleware.Admin render={<TambahSiswaAdmin />} />}
          />
          <Route
            path="/ad/siswa/ubah/:id"
            element={<Middleware.Admin render={<UbahSiswaAdmin />} />}
          />

          {/* MATPEL */}
          <Route path="/ad/matpel/main" element={<Middleware.Admin render={<MatpelAdmin />} />} />
          <Route
            path="/ad/matpel/tambah"
            element={<Middleware.Admin render={<TambahMatpelAdmin />} />}
          />
          <Route
            path="/ad/matpel/ubah/:id"
            element={<Middleware.Admin render={<UbahMatpelAdmin />} />}
          />

          {/* SISWA AND GURU ONLY */}
          <Route path="/jadwal-saya" element={<Middleware.NotAdmin render={<JadwalSaya />} />} />

          {/* GURU & ADMIN ONLY */}
          <Route path="/nilai/tambah" element={<Middleware.NotSiswa render={<TambahNilai />} />} />
          <Route
            path="/nilai/tambah-all"
            element={<Middleware.NotSiswa render={<TambahAllNilai />} />}
          />

          {/* TAMBAH EDIT GURU & SISWA */}
          {routes.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={<route.element />}
                />
              )
            )
          })}
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
