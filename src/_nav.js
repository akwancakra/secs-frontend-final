import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilCalendar,
  cilChart,
  cilPuzzle,
  cilHome,
  cilBook,
  cilPeople,
  cilSchool,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

// DAPETING DULU PAKE RECOIL AJA BIAR GAMPANG
const auth = 'admin'
let _nav = []

if (auth === 'siswa') {
  _nav = [
    {
      component: CNavItem,
      name: 'Beranda',
      to: '/sw/dashboard',
      icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
      // badge: {
      //   color: 'info',
      //   text: 'NEW',
      // },
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
          name: 'Jadwal Saya',
          to: '/jadwal-saya',
        },
      ],
    },
    {
      component: CNavItem,
      name: 'Nilai',
      to: '/nilai/main',
      icon: <CIcon icon={cilChart} customClassName="nav-icon" />,
    },
  ]
} else if (auth === 'admin') {
  _nav = [
    {
      component: CNavItem,
      name: 'Beranda',
      to: '/ad/dashboard',
      icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
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
      ],
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
    {
      component: CNavGroup,
      name: 'Guru',
      icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
      items: [
        {
          component: CNavItem,
          name: 'Daftar Guru',
          to: '/guru/main',
        },
        {
          component: CNavItem,
          name: 'Tambah Guru',
          to: '/ad/guru/tambah',
        },
      ],
    },
    {
      component: CNavGroup,
      name: 'Siswa',
      icon: <CIcon icon={cilSchool} customClassName="nav-icon" />,
      items: [
        {
          component: CNavItem,
          name: 'Daftar Siswa',
          to: '/siswa/main',
        },
        {
          component: CNavItem,
          name: 'Tambah Siswa',
          to: '/ad/siswa/tambah',
        },
      ],
    },
    {
      component: CNavGroup,
      name: 'Matpel',
      icon: <CIcon icon={cilBook} customClassName="nav-icon" />,
      items: [
        {
          component: CNavItem,
          name: 'Daftar Matpel',
          to: '/ad/matpel/main',
        },
        {
          component: CNavItem,
          name: 'Tambah Matpel',
          to: '/ad/matpel/tambah',
        },
      ],
    },
  ]
} else if (auth === 'guru') {
  _nav = [
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
}

export default _nav
