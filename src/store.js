import { createStore } from 'redux'
import Cookies from 'universal-cookie'

const cookies = new Cookies()
let data = cookies.get('auth')
if (!data) {
  data = {
    auth: {
      isLogged: false,
      account: { id: 0, username: '', role: '' },
    },
  }
}

const initialState = {
  sidebarShow: true,
  auth: data.auth,
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
