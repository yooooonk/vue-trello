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
    UPDATE_BOARD({dispatch,state},{id,title,bgColor,description}){
        return api.board.update(id,{title,bgColor,description})
                .then(()=>dispatch('FETCH_BOARD_BY_ID',{id:state.board.id}))
    },
    DELETE_BOARD({dispatch},{id}){  
        return api.board.destroy(id)
                .then(()=>dispatch('FETCH_BOARD'))
    },
    CREATE_CARD({dispatch,state},{title,listId,pos}){
        return api.card.create(title,listId,pos)
                .then(()=>dispatch('FETCH_BOARD_BY_ID',{id:state.board.id}))
    },    
    FETCH_CARD({commit},{id}){        
        return api.card.fetch(id)
                .then((res)=>commit('SET_CARD',res.item))
    },
    UPDATE_CARD({dispatch,state},{id,title,pos,description}){
        return api.card.update(id,{title,pos,description})
                    .then(()=>dispatch('FETCH_BOARD_BY_ID',{id:state.board.id}))
    },
    DELETE_CARD({dispatch,state},{id}){
        return api.card.destroy(id)
                    .then(()=>dispatch('FETCH_BOARD_BY_ID',{id:state.board.id}))
    },
    CREATE_LIST({dispatch,state},{title,boardId,pos}){
        return api.list.create({title,boardId,pos}) 
                .then(()=>dispatch('FETCH_BOARD_BY_ID',{id:state.board.id}))
    },
    UPDATE_LIST({dispatch,state},{title,pos,id}){
        return api.list.update(id,{title,pos})
                    .then(()=>dispatch('FETCH_BOARD_BY_ID',{id:state.board.id}))
    },
    DELETE_LIST({dispatch,state},{id}){
        return api.list.destroy(id)
                    .then(()=>dispatch('FETCH_BOARD_BY_ID',{id:state.board.id}))
    }
}

export default actions