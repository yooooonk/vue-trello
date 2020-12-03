<template>
  <div>
      Board
      <div v-if="loading">로딩중...</div>
      <div v-else>
          <div>bid:{{bid}} </div>
          <router-link :to="`/b/${bid}/c/1`">Card1</router-link>
          <router-link :to="`/b/${bid}/c/2`">Card2</router-link>
          
      </div>
      <hr />
        <router-view></router-view>
      
  </div>
</template>

<script>
export default {
    data(){
        return{
            bid : 0,
            loading: false

        }
    },
    methods:{
        fetchData(){
            this.loading = true
            setTimeout(()=>{
                this.bid = this.$route.params.bid
                this.loading = false
            },500)
            
        }
    },
    created(){
        this.fetchData()        
    }
}
</script>

<style>

</style>