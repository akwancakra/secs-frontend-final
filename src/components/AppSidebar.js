import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'

import { AppSidebarNav } from './AppSidebarNav'

import logoAplis from 'src/assets/images/aplis-darken.png'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

// sidebar nav config
import * as Navigation from '../_nav/index'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)
  const auth = useSelector((state) => state.auth)

  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarBrand className="d-none d-md-flex" to="/">
        <img src={logoAplis} alt="Logo Aplis" height={35} />
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          {auth.account.role === 'admin' && <AppSidebarNav items={Navigation._navAdmin} />}
          {auth.account.role === 'guru' && <AppSidebarNav items={Navigation._navGuru} />}
          {auth.account.role === 'siswa' && <AppSidebarNav items={Navigation._navSiswa} />}
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
      />
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
