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


export const board = {
    fetch(id){
        return id? request('get',`/boards/${id}`): request('get','/boards')
    },
    create(title,bgColor){
        return request('post','/boards',{title,bgColor})
    },
    destroy(id){
        return request('delete',`/boards/${id}`)
    },
    update(id,payload){
        return request('put',`/boards/${id}`,payload)
    }
}

export const list ={
    create(payload){
        return request('post','/lists',payload)
    },
    update(id,payload){
        return request('put',`/lists/${id}`,payload)
    },
    destroy(id){
        return request('delete',`/lists/${id}`)
    }
}


export const card = {
    create(title,listId,pos){
      return request('post','/cards',{title,listId,pos})
    },
    fetch(id){
        return request('get',`/cards/${id}`)
    },
    update(id,payload){
        return request('put',`/cards/${id}`,payload)
    },
    destroy(id){
        return request('delete',`/cards/${id}`)
    }
  }