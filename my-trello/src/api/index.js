import axios from 'axios'
import router from '../router'

const DOMAIN = 'http://localhost:3000'
const UNAUTHORIZED = 401

const onUnauthorized = ()=>{
    
    router.push('/login').catch(()=>{})
}

export const setAuthInHeader = token =>{
    axios.defaults.headers.common['Authorization'] = token? `Bearer ${token}`:null
}

const request = (method,url,data)=>{
    return axios({
        method,
        url:DOMAIN+url,
        data
    }).then(res=>res.data)
    .catch(error=>{
        const{status} = error.response

        if(status === UNAUTHORIZED){
            onUnauthorized()
        }
        throw error.response
    })
}

export const auth={
    login(email,password){        
        return request('post','/login',{email,password})
    }
}