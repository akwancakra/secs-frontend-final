import React from 'react'
import {
  CAvatar,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
// IMG
import siswaPng from 'src/assets/images/avatars/siswa.png'
import userPng from 'src/assets/images/avatars/user.png'

import { Link, useNavigate } from 'react-router-dom'
// RDUX
import { useSelector, useDispatch } from 'react-redux'
// TOAST
import { toast } from 'react-toastify'
import Cookies from 'universal-cookie'

const AppHeaderDropdown = () => {
  const auth = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cookies = new Cookies()

  const LogoutHandler = () => {
    dispatch({
      type: 'set',
      auth: {
        isLogged: false,
        account: { id: 0, username: '', role: '' },
      },
    })

    console.log(auth)

    cookies.remove('auth')
    toast.success('Berhasil keluar!', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
    navigate('/login')
  }

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        {auth.account.role === 'siswa' ? (
          <CAvatar src={siswaPng} size="md" className="bg-secondary" />
        ) : (
          <CAvatar src={userPng} size="md" className="bg-secondary" />
        )}
      </CDropdownToggle>
      <CDropdownMenu className="pt-0 mt-2" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">Akun</CDropdownHeader>
        <Link to="/profil" className="dropdown-item">
          <CIcon icon={cilUser} className="me-2" />
          Profil
        </Link>
        <CDropdownDivider />
        <CDropdownItem onClick={() => LogoutHandler()} className="cursor-pointer">
          <CIcon icon={cilLockLocked} className="me-2" />
          Keluar
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
