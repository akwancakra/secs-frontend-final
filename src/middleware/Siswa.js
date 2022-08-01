import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
/* eslint-disable prettier/prettier */

const Siswa = (props) => {
  const auth = useSelector((state) => state.auth)
  const navigate = useNavigate()

  useEffect(() => {
    if (auth.role === 2) {
      navigate('/gr/dashboard')
    } else if (auth.role === 1) {
      navigate('/ad/dashboard')
    }
  }, []);

  return props.render
}

export default Siswa
