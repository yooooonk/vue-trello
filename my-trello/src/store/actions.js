import * as api from '../api'

const actions = {
    LOGIN({commit},{id,pw}){
        return api.auth.login(id,pw)
                .then(({accessToken})=>commit('LOGIN',accessToken))                
       
    }
}

export default actions