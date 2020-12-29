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
              <div class="list-section">
                      <div class="list-wrapper" v-for="list in board.lists" :key="list.pos"
                              :data-list-id="list.id">
                          <List :list="list" />
                      </div>
                      <div class="add-list">
                        <AddList />
                      </div>
                </div>
          </div>
      </section>      
      <router-view></router-view>
  </div>
  
</template>

<script>
import { mapActions, mapState } from 'vuex'
import List from './List.vue'
import AddList from './AddList.vue'
import dragger from '../utils/dragger'

export default {
    components:{List, AddList},    
    computed:{
        ...mapState(['board'])
    },
    data(){
        return {
            boardId:'',
            title:'',
            inputTitle:'',            
            isTitleEdit:false,
            listDragger:'',
            cardDragger:''
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
    updated(){
        this.setListDragable()
        this.setCardDragabble()
    },
    methods:{       
        ...mapActions(['FETCH_BOARD_BY_ID','UPDATE_BOARD','CREATE_LIST','UPDATE_LIST','UPDATE_CARD']),
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
        },
        setListDragable(){
            if(this.listDragger) this.listDragger.destroy()

            const options = {
                              invalid: (el, handle) => !/^list/.test(handle.className)
            }

            this.listDragger = dragger.init(Array.from(this.$el.querySelectorAll('.list-section')),options)

            this.listDragger.on('drop',(el,target,source,sibling)=>{
                const targetList = {
                    id : el.dataset.listId*1,
                    pos : 60666
                }

                const {prev,next} = dragger.siblings({
                    el,target,
                    candidates:Array.from(target.querySelectorAll('.list')),
                    type:'list'
                }) 

            if(!prev && next) targetList.pos = next.pos/2
            else if(!next && prev) targetList.pos = prev.pos*2
             else if(prev && prev) targetList.pos = (prev.pos+next.pos)/2
            
            this.UPDATE_LIST(targetList)  
            })              
        },
        setCardDragabble(){
          if(this.cdragger) this.cdragger.destroy()
          this.cdragger = dragger.init(Array.from(this.$el.querySelectorAll('.card-list')))

          this.cdragger.on('drop',(el,target,source,sibling)=>{
              const targetCard = {
              id : el.dataset.cardId*1,
              pos : 65335
              }

              const {prev,next} = dragger.siblings({
                  el,target,
                  candidates:Array.from(target.querySelectorAll('.card-item')),
                  type:'card'
              })
        
              if(!prev && next) targetCard.pos = next.pos/2
              else if(!next && prev) targetCard.pos = prev.pos*2
              else if(prev && prev) targetCard.pos = (prev.pos+next.pos)/2
              
              this.UPDATE_CARD(targetCard)
          })     
        }
        
    }
}
</script>

