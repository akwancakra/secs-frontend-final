import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
/* eslint-disable prettier/prettier */

const Admin = (props) => {
  const auth = useSelector((state) => state.auth)
  const navigate = useNavigate()

  useEffect(() => {
    if (auth.account.role === 'guru') {
      navigate('/gr/dashboard')
    } else if (auth.account.role === 'siswa') {
      navigate('/sw/dashboard')
    }
  }, []);

  return props.render
}

export default Admin
