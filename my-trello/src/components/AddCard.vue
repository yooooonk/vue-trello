<template>
  <div class="add-card-section">    
    <input type="text" class="input">      
    <a href="" class="cancel-add-btn" @click.prevent="$emit('close')">&times;</a>
      
  </div>
  
</template>

<script>
export default {
  props:['lid'],
  mounted(){
    console.log(this.lid)
  }

}
</script>
