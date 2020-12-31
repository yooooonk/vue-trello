<template>
<div>
  <div class="board-wrapper">
      <div class="board-list">
          <div class="board" v-for="board in list" :key="board.id"
            :data-color="board.bgColor" :data-id="board.id">                                            
            <router-link :to="`/b/${board.id}`">
                <div class="board-title">{{board.title}}</div>                
            </router-link>
          </div>
          <button href="" class="add-board-button" @click.prevent="isOpenModal=true"><i class="fas fa-plus"></i></button>
      </div>      
  </div>
  <AddBoard v-if="isOpenModal" @close="onCloseModal"/>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import AddBoard from './AddBoard.vue'
export default {
  components:{
      AddBoard
  },
    data(){
      return {
        list:[],
        isOpenModal:false
      }
    },
    created(){
        this.FETCH_BOARD().then((res)=>{
          this.list = res          
          this.SET_THEME()
        })       
    },    
    updated(){      
      Array.from(this.$el.querySelectorAll('.board')).forEach(el=>{
        const bgColor = el.dataset.color;
        el.style.backgroundColor=bgColor
      })

      this.SET_OPEN_BOARD_MENU(false)
      this.SET_CURRENT_MENU('MAIN')

    },
    methods:{
      ...mapActions(['FETCH_BOARD']),
      ...mapMutations(['SET_THEME','SET_OPEN_BOARD_MENU','SET_CURRENT_MENU']),
      onCloseModal(){
        this.isOpenModal=false
      }
      
    }
}
</script>

<style>

</style>