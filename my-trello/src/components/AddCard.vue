<template>
  <div class="add-card-section">    
    <input type="text" class="input" @blur="$emit('close')" @keyup.enter="onEnterTitle" v-model="inputTitle" autofocus>      
    <a href="" class="cancel-add-btn" @click.prevent="$emit('close')">&times;</a>
      
  </div>
  
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props:['lid'],
  data(){
    return {
      inputTitle:''
    }
  },
  methods:{ 
    ...mapActions(['CREATE_CARD']),    
    onEnterTitle(){
      if(this.inputTitle){
          this.CREATE_CARD({title:this.inputTitle,listId:this.lid})
          .finally(()=>{
            this.inputTitle = ''
            this.$emit('close')
          })          
        }
      }
      
  }

}
</script>
