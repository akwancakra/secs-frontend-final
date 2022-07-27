import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilCalendar, cilChart, cilHome, cilPeople, cilSchool } from '@coreui/icons'
import { CNavGroup, CNavItem } from '@coreui/react'

let _navGuru = []
_navGuru = [
  {
    component: CNavItem,
    name: 'Beranda',
    to: '/gr/dashboard',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Guru',
    to: '/guru/main',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Jadwal',
    icon: <CIcon icon={cilCalendar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Daftar Jadwal',
        to: '/jadwal/main',
      },
      {
        component: CNavItem,
        name: 'Tambah Jadwal',
        to: '/jadwal/tambah',
      },
      {
        component: CNavItem,
        name: 'Jadwal Saya',
        to: '/jadwal-saya',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Siswa',
    to: '/siswa/main',
    icon: <CIcon icon={cilSchool} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Nilai',
    icon: <CIcon icon={cilChart} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Daftar Nilai',
        to: '/nilai/main',
      },
      {
        component: CNavItem,
        name: 'Tambah Nilai',
        to: '/nilai/tambah',
      },
      {
        component: CNavItem,
        name: 'Tambah Nilai Jadwal',
        to: '/nilai/tambah-all',
      },
    ],
  },
]

export default _navGuru
