import * as api from '../api'
import state from './state'

const actions = {
    LOGIN({commit},{id,pw}){
        return api.auth.login(id,pw)
                .then(({accessToken})=>commit('LOGIN',accessToken))                
       
    },
    FETCH_BOARD(){
        return api.board.fetch()
                .then(res=>res.list)
    },
    FETCH_BOARD_BY_ID({commit},{id}){
        return api.board.fetch(id)
                .then(res=> {commit('SET_BOARD_BY_ID',res.item)})
    },    
    CREATE_BOARD(_,{title,bgColor}){
        return api.board.create(title,bgColor)
                .then((res)=>res.item)
    },
    UPDATE_BOARD(_,{id,title,bgColor}){
        return api.board.update(id,{title,bgColor})
    },
    CREATE_CARD({dispatch,state},{title,listId,pos}){
        return api.card.create(title,listId,pos)
                .then(()=>dispatch('FETCH_BOARD_BY_ID',{id:state.board.id}))
    },
    CREATE_LIST({dispatch,state},{title,boardId,pos}){
        return api.list.create({title,boardId,pos}) 
                .then(()=>dispatch('FETCH_BOARD_BY_ID',{id:state.board.id}))
    }
}

export default actions