import React from 'react'

// OTHER
const Components = React.lazy(() => import('./views/comp/Comp'))
const Profile = React.lazy(() => import('./views/admin/Profile'))
const UbahProfile = React.lazy(() => import('./views/admin/ProfileUbah'))

// ADMIN
const DashboardAdmin = React.lazy(() => import('./views/admin/Dashboard'))
const Jadwal = React.lazy(() => import('./views/admin/jadwal/Daftar'))
const TambahJadwal = React.lazy(() => import('./views/admin/jadwal/Tambah'))
const UbahJadwal = React.lazy(() => import('./views/admin/jadwal/Ubah'))
const DetailJadwal = React.lazy(() => import('./views/admin/jadwal/Detail'))
// ADMIN NILAI
const Nilai = React.lazy(() => import('./views/admin/nilai/Daftar'))
const DetailNilai = React.lazy(() => import('./views/admin/nilai/Detail'))
const TambahNilai = React.lazy(() => import('./views/admin/nilai/Tambah'))
const TambahAllNilai = React.lazy(() => import('./views/admin/nilai/TambahAll'))
// ADMIN GURU
const Guru = React.lazy(() => import('./views/admin/guru/Daftar'))
const TambahGuruAdmin = React.lazy(() => import('./views/admin/guru/Tambah'))
const UbahGuruAdmin = React.lazy(() => import('./views/admin/guru/Ubah'))
// ADMIN SISWA
const Siswa = React.lazy(() => import('./views/admin/siswa/Daftar'))
const TambahSiswaAdmin = React.lazy(() => import('./views/admin/siswa/Tambah'))
const UbahSiswaAdmin = React.lazy(() => import('./views/admin/siswa/Ubah'))
// ADMIN MATA PELAJARAN
const MatpelAdmin = React.lazy(() => import('./views/admin/matpel/Daftar'))
const TambahMatpelAdmin = React.lazy(() => import('./views/admin/matpel/Tambah'))
const UbahMatpelAdmin = React.lazy(() => import('./views/admin/matpel/Ubah'))

// GURU
const DashboardGuru = React.lazy(() => import('./views/guru/Dashboard'))
const JadwalSaya = React.lazy(() => import('./views/admin/jadwal/JadwalSaya'))

// SISWA
const DashboardSiswa = React.lazy(() => import('./views/siswa/Dashboard'))

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
  { path: '/nilai/tambah', name: 'Tambah Nilai', element: TambahNilai },
  {
    path: '/nilai/tambah-all',
    name: 'Tambah Semua Nilai Admin',
    element: TambahAllNilai,
  },
  // JADWAL
  { path: '/jadwal/main', name: 'Jadwal', element: Jadwal },
  { path: '/jadwal/tambah', name: 'Tambah Jadwal', element: TambahJadwal },
  { path: '/jadwal/:id', name: 'Detail Jadwal', element: DetailJadwal },
  { path: '/jadwal/ubah/:id', name: 'Ubah Jadwal', element: UbahJadwal },
  { path: '/jadwal-saya', name: 'Guru Saya Dashboard', element: JadwalSaya },

  // ======================= ADMIN =======================
  { path: '/ad/dashboard', name: 'Admin Dashboard', element: DashboardAdmin },
  // ADMIN NILAI
  // ADMIN GURU
  { path: '/ad/guru/tambah', name: 'Tambah Guru Admin', element: TambahGuruAdmin },
  { path: '/ad/guru/ubah/:id', name: 'Ubah Guru Admin', element: UbahGuruAdmin },
  // ADMIN SISWA
  { path: '/ad/siswa/tambah', name: 'Tambah Siswa Admin', element: TambahSiswaAdmin },
  { path: '/ad/siswa/ubah/:id', name: 'Ubah Siswa Admin', element: UbahSiswaAdmin },
  // ADMIN MATPEL
  { path: '/ad/matpel/main', name: 'Matpel Admin', element: MatpelAdmin },
  { path: '/ad/matpel/tambah', name: 'Tambah Matpel Admin', element: TambahMatpelAdmin },
  { path: '/ad/matpel/ubah/:id', name: 'Ubah Matpel Admin', element: UbahMatpelAdmin },

  // ======================= GURU =======================
  { path: '/gr/dashboard', name: 'Guru Dashboard', element: DashboardGuru },

  // ======================= SISWA =======================
  { path: '/sw/dashboard', name: 'Siswa Dashboard', element: DashboardSiswa },
]

export default routes
