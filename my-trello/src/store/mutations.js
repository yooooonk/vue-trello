import { setAuthInHeader } from "../api"

const mutations = {
    LOGIN(state,token){
        if(!token) return
        state.token = token
        localStorage.setItem('token',token)
        setAuthInHeader(token)
    },
    LOGOUT(state){
        state.token = null
        localStorage.removeItem('token') // delete localStorage.token        
        setAuthInHeader(null)
    },
    SET_BOARD_BY_ID(state,board){
        state.board = board
    },
    SET_CARD(state,card){
        state.card = card
    }
}

export default mutations