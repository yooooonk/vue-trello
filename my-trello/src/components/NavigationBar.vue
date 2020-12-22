<template>
<nav class="nav">
    <div class="logo">
      <router-link to="/" >MY TRELLO</router-link>
    </div>
    <div class="auth">      
      <router-link to="/login"><button v-if="!isLogin">Login</button></router-link>
      <button v-if="isLogin" @click.prevent="logout">Logout</button>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
   computed:{       
       ...mapGetters(['isLogin'])
   },
   methods:{
       ...mapMutations(['LOGOUT']),
       logout(){
           this.LOGOUT()
           this.$router.push('/login')
       }
   }
}


</script>

