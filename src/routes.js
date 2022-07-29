import React from 'react'

// OTHER
const Components = React.lazy(() => import('./views/comp/Comp'))
const Profile = React.lazy(() => import('./views/admin/Profile'))
const UbahProfile = React.lazy(() => import('./views/admin/ProfileUbah'))

// ADMIN
const Jadwal = React.lazy(() => import('./views/admin/jadwal/Daftar'))
const TambahJadwal = React.lazy(() => import('./views/admin/jadwal/Tambah'))
const UbahJadwal = React.lazy(() => import('./views/admin/jadwal/Ubah'))
const DetailJadwal = React.lazy(() => import('./views/admin/jadwal/Detail'))
// ADMIN NILAI
const Nilai = React.lazy(() => import('./views/admin/nilai/Daftar'))
const DetailNilai = React.lazy(() => import('./views/admin/nilai/Detail'))
// ADMIN GURU
const Guru = React.lazy(() => import('./views/admin/guru/Daftar'))
// ADMIN SISWA
const Siswa = React.lazy(() => import('./views/admin/siswa/Daftar'))
// GURU
// SISWA

const routes = [
  // ======================= BASE =======================
  { path: '/', exact: true, name: 'Home' },
  { path: '/components', name: 'Components', element: Components },
  { path: '/profil', name: 'Profile', element: Profile },
  { path: '/profil/ubah', name: 'Profile', element: UbahProfile },
  // ======================= ALL CAN ACCESS =======================
  // GURU
  { path: '/guru/main', name: 'Guru', element: Guru },
  // SISWA
  { path: '/siswa/main', name: 'Siswa', element: Siswa },
  // NILAI
  { path: '/nilai/main', name: 'Nilai', element: Nilai },
  { path: '/nilai/:id', name: 'Detail Nilai', element: DetailNilai },
  // JADWAL
  { path: '/jadwal/main', name: 'Jadwal', element: Jadwal },
  { path: '/jadwal/tambah', name: 'Tambah Jadwal', element: TambahJadwal },
  { path: '/jadwal/:id', name: 'Detail Jadwal', element: DetailJadwal },
  { path: '/jadwal/ubah/:id', name: 'Ubah Jadwal', element: UbahJadwal },
]

export default routes
