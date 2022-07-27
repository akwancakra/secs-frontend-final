import { createStore } from 'redux'

const initialState = {
  sidebarShow: true,
  auth: { isLogged: false, account: { id: 0, username: '', role: '' } },
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
