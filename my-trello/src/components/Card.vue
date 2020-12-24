<template>
  <div>
      카드카드
  </div>
</template>

<script>
export default {
  props:['card','lid'],
  mounted(){
    console.log(this.card,'카드',this.lid)
  }

}
</script>
