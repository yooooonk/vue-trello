const getters ={
    isLogin(state){
        
        return !!state.token
    }
}

export default getters