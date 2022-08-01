import React, { useEffect, useState } from 'react'
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
import axios from 'axios'

const AppHeaderDropdown = () => {
  const auth = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cookies = new Cookies()
  const [avatar, setAvatar] = useState('')

  useEffect(() => {
    getProfil()
  }, [])

  const getProfil = async () => {
    let url = ''
    if (auth.role == 2) {
      url = `http://localhost:5000/guru/user-id/${auth.id}`
    } else if (auth.role == 3) {
      url = `http://localhost:5000/siswa/user-id/${auth.id}`
    }

    await axios.get(url).then((result) => {
      setAvatar(result.data.photo)
    })
  }

  const LogoutHandler = () => {
    dispatch({
      type: 'set',
      auth: {
        isLogged: false,
        id: 0,
        role: 0,
        username: '',
        photo: '',
      },
    })

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
        {auth.role === 1 && <CAvatar src={userPng} size="md" className="bg-secondary" />}
        {auth.role === 2 && (
          <CAvatar
            src={avatar !== 'user.png' ? avatar : userPng}
            size="md"
            className="bg-secondary"
          />
        )}
        {auth.role === 3 && (
          <CAvatar
            src={avatar !== 'siswa.png' ? avatar : siswaPng}
            size="md"
            className="bg-secondary"
          />
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
