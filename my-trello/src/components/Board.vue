<template>
  <div>
      <section class="board-wrapper">
          <div class="header">              
              <div class="input-title" v-if="isEdit">
                  <input type="text" @blur="onBlur" ref="inputTitle" v-model="title">
              </div>
              <div class="title" v-else @click="onClickTitle">{{title}}</div>
          </div>
          <div class="list-wrapper">
              <div class="list-section" v-for="list in lists" :key="list.id">
                  <List :list="list" />
              </div>
              <div class="add-list">
                  Add List+
              </div>
          </div>
      </section>
      
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import List from './List.vue'
export default {
    components:{List},
    data(){
        return {
            boardId:'',
            lists:[],
            title:'',
            isEdit:false            
        }
    },
    created(){
            const id = this.$route.params.bid
            this.boardId = id
            this.FETCH_LIST({id}).then(({title,lists})=>{
               this.lists = lists
               this.title = title
               
           })
        },
    methods:{       
        ...mapActions(['FETCH_LIST','UPDATE_BOARD']),
        onBlur(){
           
           this.UPDATE_BOARD({id:this.boardId, title:this.title})
            .then(()=>{
                this.isEdit = false
            })
        },
        onClickTitle(){
            this.isEdit = true            
            
            this.$nextTick(()=>{
                this.$refs.inputTitle.focus()
            })
            
        }
        
    }
}
</script>

