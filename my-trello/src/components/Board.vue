<template>
  <div>
      <section class="board-wrapper">
          <div class="header-title">              
              <div class="input-title" v-if="isTitleEdit">
                  <input type="text" @blur="onBlur" @keyup.enter="onSubmitTitle" ref="inputTitle" v-model="inputTitle">
              </div>
              <div class="title" v-else @click="onClickTitle">{{title}}</div>                
          </div>
          <div class="list-wrapper">
              <div class="list-section" v-for="list in board.lists" :key="list.id">
                  <List :list="list" />
              </div>
              <div class="add-list">
                  <AddList />
              </div>
          </div>
      </section>
      
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import List from './List.vue'
import AddList from './AddList.vue'
export default {
    components:{List, AddList},    
    computed:{
        ...mapState(['board'])
    },
    data(){
        return {
            boardId:'',
            title:''            ,
            inputTitle:'',            
            isTitleEdit:false
        }
    },
    created(){
            const id = this.$route.params.bid
            this.boardId = id
            this.FETCH_BOARD_BY_ID({id})
                .then(()=>{
                    this.title = this.board.title;                    
                })
        },
    methods:{       
        ...mapActions(['FETCH_BOARD_BY_ID','UPDATE_BOARD','CREATE_LIST']),
        onBlur(){           
          this.isTitleEdit = false
          this.inputTitle = ''
        },
        onClickTitle(){
            this.isTitleEdit = true            
            
            this.$nextTick(()=>{
                this.$refs.inputTitle.focus()
            })            
        },
        onSubmitTitle(){
            const preTitle = this.title
            const title = this.inputTitle

            if(!title || preTitle===title){
                this.onBlur()
                return
            }
             this.UPDATE_BOARD({id:this.boardId, title:this.inputTitle})
                    .then(()=>{
                            this.title = title;
                            this.isTitleEdit = false
                    })
        }
        
    }
}
</script>

