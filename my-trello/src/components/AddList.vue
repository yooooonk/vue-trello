<template>
  <div>
    <input type="text" v-if="isAddList" class="list-input" 
                        @blur="closeAddList" ref="listTitle"
                        @keyup.enter="addList" v-model="inputListTitle">
    <div class="add-text" v-else @click="onClickListTitle">+ Add List</div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
    computed:{
        ...mapState(['board'])
    },
    data(){
        return {            
            inputListTitle:'',            
            isAddList : false
        }
    },
    methods:{
        ...mapActions(['CREATE_LIST']),
         onClickListTitle(){
            this.isAddList = true
            
            this.$nextTick(()=>{
                this.$refs.listTitle.focus()
            })            
        },
        closeAddList(){
            this.inputListTitle = ''
            this.isAddList = false
        },
        addList(){
            const title = this.inputListTitle
            const boardId = this.board.id
            
            const lastList = this.board.lists[this.board.lists.length-1]
            const pos = lastList? lastList.pos*2 : 65535
            if(title){
                this.CREATE_LIST({title,boardId,pos})
                    .finally(()=>{
                        this.closeAddList()
                    })
            }
        }
    }
}
</script>

<style>

</style>