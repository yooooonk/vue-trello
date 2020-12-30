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
    },
    SET_THEME(state,color){
        state.bodyColor = color || '#ff9f74'        
    },
    SET_OPEN_BOARD_MENU(state,toggle){
        state.isOpenMenu = toggle
    },
    SET_CURRENT_MENU(state,menu){
        state.currentMenu = menu
    }
}

export default mutations