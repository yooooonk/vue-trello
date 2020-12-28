<template>
  <div>
      <section class="board-wrapper">
          <div class="header">              
              <div class="input-title" v-if="isTitleEdit">
                  <input type="text" @blur="onBlur" ref="inputTitle" v-model="title">
              </div>
              <div class="title" v-else @click="onClickTitle">{{title}}</div>
          </div>
          <div class="list-wrapper">
              <div class="list-section" v-for="list in board.lists" :key="list.id">
                  <List :list="list" />
              </div>
              <div class="add-list">
                  <input type="text" v-if="isAddList" class="add-list-input" 
                        @blur="onBlurListTitle" ref="listTitle"
                        @keyup.enter="addList" v-model="inputListTitle">
                  <div class="add-text" v-else @click="onClickListTitle">Add List+</div>
              </div>
          </div>
      </section>
      
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import List from './List.vue'
export default {
    components:{List},
    computed:{
        ...mapState(['board'])
    },
    data(){
        return {
            boardId:'',            
            title:'',
            inputListTitle:'',
            isTitleEdit:false,
            isAddList : false
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
           this.UPDATE_BOARD({id:this.boardId, title:this.title})
            .then(()=>{
                this.isTitleEdit = false
            })
        },
        onClickTitle(){
            this.isTitleEdit = true            
            
            this.$nextTick(()=>{
                this.$refs.inputTitle.focus()
            })            
        },
        onClickListTitle(){
            this.isAddList = true
            
            this.$nextTick(()=>{
                this.$refs.listTitle.focus()
            })
            
        },
        addList(){
            const title = this.inputListTitle
            const boardId = this.boardId
            
            const lastList = this.board.lists[this.board.lists.length-1]
            const pos = lastList? lastList.pos*2 : 65535
            if(title){
                this.CREATE_LIST({title,boardId,pos})
                    .finally(()=>{
                        this.inputListTitle = ''
                        this.isAddList = false
                    })
            }
        },
        onBlurListTitle(){
            this.inputListTitle = ''

        }
        
    }
}
</script>

