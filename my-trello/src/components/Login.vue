<template>
  <div class="login">
    <h2>LOGIN</h2>    
    <form action="" @submit.prevent="onSubmit">
      <table>
        <tr>
          <td>ID</td>
          <td><input type="text" v-model="id"></td>
          <td rowspan="2"><button type="submit" :class="validForm? 'valid':'invalid'" :disabled="!validForm">Enter</button></td>
        </tr>
        <tr>
          <td>PW</td>
          <td><input type="text" v-model="pw"></td>          
        </tr>
      </table>      
    </form>    
    <span class="error-message">{{error}}</span>
  </div>
  
</template>

<script>
import {mapActions} from 'vuex'

export default {
  data(){
    return {
      id:'',
      pw:'',
      rPath:'',
      error:''
    }
  },
  created() {
    this.rPath = this.$route.query.rPath || "/";
  },
  computed:{        
    validForm(){      
      return !!this.id && !!this.pw
    }
  },
  methods:{
    ...mapActions(['LOGIN']),
    onSubmit(){
      this.LOGIN({id:this.id,pw:this.pw})
      .then(()=>{
        
        this.$router.push(this.rPath)
      }).catch(error=>{
        
         this.error = error.data.error
        })
    }
  }
}
</script>
