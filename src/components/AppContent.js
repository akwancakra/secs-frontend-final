import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'
import { useSelector } from 'react-redux'
import * as Middleware from 'src/middleware/index'

// routes config
import routes from '../routes'

// ROUTES
const DashboardAdmin = React.lazy(() => import('src/views/admin/Dashboard'))
const DashboardGuru = React.lazy(() => import('src/views/guru/Dashboard'))
const DashboarSiswa = React.lazy(() => import('src/views/siswa/Dashboard'))

const AppContent = () => {
  return (
    <CContainer lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          {/* BELUM BENER INI DASHBOARD */}
          <Route path="/ad/dashboard" element={<Middleware.Admin render={<DashboardAdmin />} />} />
          <Route path="/gr/dashboard" element={<Middleware.Guru render={<DashboardGuru />} />} />
          <Route path="/sw/dashboard" element={<Middleware.Siswa render={<DashboarSiswa />} />} />

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
