import * as api from '../api'

const actions = {
    LOGIN({commit},{id,pw}){
        return api.auth.login(id,pw)
                .then(({accessToken})=>commit('LOGIN',accessToken))                
       
    },
    FETCH_BOARD(){
        return api.board.fetch()
                .then(res=>res.list)
    },
    FETCH_LIST(_,{id}){
        return api.board.fetch(id)
                .then(res=>res.item)
    },    
    CREATE_BOARD(_,{title,bgColor}){
        return api.board.create(title,bgColor)
                .then((res)=>res.item)
    },
    UPDATE_BOARD(_,{id,title,bgColor}){
        return api.board.update(id,{title,bgColor})
    }
}

export default actions