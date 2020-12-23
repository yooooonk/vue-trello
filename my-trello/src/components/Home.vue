<template>
<div>
  <div class="board-wrapper">
      <div class="board-list">
          <div class="board" v-for="board in list" :key="board.id"
            :data-color="board.bgColor" :data-id="board.id" @click="onClickBoard">                              
                <div class="board-title">{{board.title}}</div>  
          </div>
          <button href="" class="add-board-button" @click.prevent="isOpenModal=true"><i class="fas fa-plus"></i></button>
      </div>      
  </div>
  <AddBoard v-if="isOpenModal" @close="onCloseModal"/>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
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
        })       
    },    
    updated(){
      Array.from(this.$el.querySelectorAll('.board')).forEach(el=>{
        const bgColor = el.dataset.color;
        el.style.backgroundColor=bgColor
      })
    },
    methods:{
      ...mapActions(['FETCH_BOARD']),
      onCloseModal(){
        this.isOpenModal=false
      },
      onClickBoard(e){
          const bid = e.target.dataset.id

          this.$router.push(`/board/${bid}`)
      }
    }
}
</script>

<style>

</style>