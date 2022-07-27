import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
/* eslint-disable prettier/prettier */

const Guru = (props) => {
  const auth = useSelector((state) => state.auth)
  const navigate = useNavigate()

  useEffect(() => {
    if (auth.account.role === 'admin') {
      navigate('/ad/dashboard')
    } else if (auth.account.role === 'siswa') {
      navigate('/sw/dashboard')
    }
  }, []);

  return props.render
}

export default Guru
