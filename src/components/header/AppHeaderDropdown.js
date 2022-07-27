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
import avatar8 from 'src/assets/images/avatars/siswa.png'
import { Link, useNavigate } from 'react-router-dom'
// RDUX
import { useSelector, useDispatch } from 'react-redux'
// TOAST
import { toast } from 'react-toastify'

const AppHeaderDropdown = () => {
  const auth = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const LogoutHandler = () => {
    dispatch({
      type: 'set',
      auth: {
        isLogged: false,
        account: { id: 0, username: '', role: '' },
      },
    })

    console.log(auth)

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
        <CAvatar src={avatar8} size="md" className="bg-secondary" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0 mt-2" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">Akun</CDropdownHeader>
        <Link to="/profil">
          <CDropdownItem>
            <CIcon icon={cilUser} className="me-2" />
            Profil
          </CDropdownItem>
        </Link>
        <CDropdownDivider />
        <CDropdownItem onClick={() => LogoutHandler()}>
          <CIcon icon={cilLockLocked} className="me-2" />
          Keluar
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
