<template>
  <div>
      <a @click.prevent="onClickTitle">Home</a>
  </div>
</template>

<script>
export default {
    data(){
        return {
            hello:'nav'
        }
    },
    methods:{
        onClickTitle(){
            const currentPath = this.$route.path

            if(currentPath === '/') return
            this.$route.push('/')
        }
    }
}
</script>

<style>

</style>