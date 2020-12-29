<template>
  <div>
      <div class="card-header">
           <input type="text" v-if="isEdit" class="card-input" 
                        @blur="closeEdit" ref="title"
                        @keyup.enter="updateCard" v-model="inputTitle"> 
        <div class="add-text" v-else @click="editTitle">{{card.title}} </div>        
      </div>
      <a href="" class="card-del-btn" @click.prevent="deleteCard">&times;</a>    
      <div class="card-body" v-if="card.description">
        <i class="fas fa-bars"></i>
      </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props:['card','lid'],
  data(){
    return {
      isEdit:false
    }
  },
  mounted(){
    this.inputTitle = this.card.title
    console.log(this.card)
  },
  methods:{
    ...mapActions(['UPDATE_CARD','DELETE_CARD']),
    closeEdit(){
      this.isEdit=false;
      this.inputTitle = this.card.title
    },
    deleteCard(){
      if(confirm('카드를 삭제하겠습니까?')){
        this.DELETE_CARD({id:this.card.id})
      }
      
    },
    updateCard(){
      if(!this.inputTitle){        
        return
      }

      if(this.inputTitle === this.card.title){
        this.closeEdit()
        return
      }

      this.UPDATE_CARD({id:this.card.id,title:this.inputTitle})
    },
    editTitle(){
      this.isEdit = true
      this.$nextTick(()=>{
        this.$refs.title.focus()
      })
    }
  }

}
</script>
