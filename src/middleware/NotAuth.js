import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
/* eslint-disable prettier/prettier */

const NotAuth = (props) => {
  const auth = useSelector((state) => state.auth)
  const navigate = useNavigate()

  useEffect(() => {
    if (auth.isLogged == false) {
      navigate('/login')
    }
  }, []);

  return props.render
}

export default NotAuth
