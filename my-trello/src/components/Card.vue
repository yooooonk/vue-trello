<template>
  <div>
      {{card.title}}
  </div>
</template>

<script>
export default {
  props:['card','lid'],
  mounted(){
    console.log('card component',this.card)
  }

}
</script>
