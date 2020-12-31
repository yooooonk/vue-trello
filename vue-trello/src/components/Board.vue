<template>
  <div>
      <div class="board-wrapper">
          <div class="board">
              <div class="board-header">
                  <input type="text" class="form-control" v-if="isEditTitle" v-model="inputTitle" 
                          ref="inputTitle" @blur="onSubmitTitle" @keyup.enter="onSubmitTitle">
                  <span class="board-title" v-else @click="onClickTitle">{{board.title}} </span>
                  <a href="" class="board-header-btn show-menu" @click.prevent="onShowSettings">
                    ...Show Menu
                  </a>
              </div>
              <div class="list-section-wrapper">
                  <div class="list-section">
                      <div class="list-wrapper" v-for="list in board.lists" :key="list.pos"
                              :data-list-id="list.id">
                          <List :data="list" />
                      </div>
                      <div class="list-wrapper">
                        <AddList />
                      </div>
                  </div>
              </div>              
          </div>          
      </div>
      <BoardSettings v-if="isShowBoardSettings"/>
      <router-view></router-view>
  </div>
</template>

<script>
import {mapState,mapActions, mapMutations} from 'vuex'
import List from './List.vue'
import BoardSettings from './BoardSettings.vue'
import AddList from './AddList.vue'
import dragger from '../utils/dragger'

export default {
    components:{
        List,BoardSettings,AddList
    },
    data(){
        return{
            bid : 0,
            loading: false,
            cdragger:null,
            lDragger:null,
            isEditTitle:false,
            inputTitle :''
        }
    },
    computed:{
        ...mapState(['board','isShowBoardSettings'])
    },
    created(){
      this.SET_IS_SHOW_BOARD_SETTINS(false)
        this.fetchData().then(()=>{
          this.inputTitle = this.board.title
          this.SET_THEME(this.board.bgColor)          
        })

    },
    methods:{
        ...mapActions(['FETCH_BOARD','UPDATE_CARD','UPDATE_BOARD','UPDATE_LIST']),
        ...mapMutations(['SET_THEME','SET_IS_SHOW_BOARD_SETTINS']),
        fetchData(){
            this.loading = true

            return this.FETCH_BOARD({id:this.$route.params.bid})
            .then(()=>this.loading = false)
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
        },
        setListDragabble(){
          if(this.lDragger) this.lDragger.destroy()

          const options = {
        invalid: (el, handle) => !/^list/.test(handle.className)
      }

          this.lDragger = dragger.init(Array.from(this.$el.querySelectorAll('.list-section')),options)

          this.lDragger.on('drop',(el,target,source,sibling)=>{

              const targetList = {
                  id : el.dataset.listId*1,
                  pos : 56343
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
        onShowSettings(){
          this.SET_IS_SHOW_BOARD_SETTINS(true)
        },
        onClickTitle(){
          this.isEditTitle=true
          this.$nextTick(()=>{
            this.$refs.inputTitle.focus()
          })          
        },
        onSubmitTitle(){
          this.isEditTitle = false
          this.inputTitle = this.inputTitle.trim()

          if(!this.inputTitle) return
          

          const id = this.board.id
          const title = this.inputTitle
          
          if(title === this.board.title) return             
          this.UPDATE_BOARD({id,title})

          
        }
    }
    
}
</script>

<style>
.board-wrapper {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
}
.board {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.board-header {
  flex: none;
  padding: 8px 4px 8px 8px;
  margin: 0;
  height: 32px;
  line-height: 32px;
} 
.board-header input[type=text] {
  width: 200px;
}
.board-header-btn {
  border-radius: 4px;
  padding: 2px 10px;
  height: 30px;
  margin-bottom: 15px;
  display: inline-block;
  color: #fff;
}
.board-header-btn:hover,
.board-header-btn:focus {
  background-color: rgba(0,0,0,.15);
  cursor: pointer;
}
.board-title {
  font-weight: 700;
  font-size: 18px;
}
.show-menu {
  font-size: 14px;
  position: absolute;
  right: 15px;
}
.list-section-wrapper {
  flex-grow: 1;
  position: relative;
}
.list-section {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  padding: 0 10px;
}
.list-wrapper {
  display: inline-block;
  height: 100%;
  width: 272px;
  vertical-align: top;
  margin-right: 5px;
}
.card-item.gu-transit {
  background-color: #555 !important;
}
.card-item.gu-mirror {
  opacity: 1 !important;
  background-color: #fff !important;
  transform: rotate(3deg) !important;
}
</style>