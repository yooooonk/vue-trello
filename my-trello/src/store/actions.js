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
    CREATE_BOARD(_,{title,bgColor}){
        return api.board.create(title,bgColor)
                .then((res)=>res.item)
    }
}

export default actions