import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilCalendar, cilChart, cilHome, cilPeople } from '@coreui/icons'
import { CNavGroup, CNavItem } from '@coreui/react'

let _navSiswa = []
_navSiswa = [
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

export default _navSiswa
