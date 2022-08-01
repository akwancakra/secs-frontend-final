import { createStore } from 'redux'
import Cookies from 'universal-cookie'

const cookies = new Cookies()
let data = ''
data = cookies.get('auth')
if (data == undefined || !data) {
  data = {
    isLogged: false,
    id: 0,
    role: 0,
    username: '',
    photo: '',
  }
}

const initialState = {
  sidebarShow: true,
  auth: data,
}

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return { ...state, ...rest }
    default:
      return state
  }
}

const store = createStore(changeState)
export default store
