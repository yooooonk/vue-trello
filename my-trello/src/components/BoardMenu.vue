<template>
    <div class="board-menu-wrapper"> 
            <MenuMain class="main-menu" v-if="currentMenu==='MAIN'"/>
            <AboutBoard class="about-menu" v-if="currentMenu==='ABOUT'"/>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import AboutBoard from './AboutBoard.vue'
import MenuMain from './MenuMain.vue'

export default {
    computed:{
    ...mapState(['currentMenu'])        
    },
    components:{
        AboutBoard, MenuMain
    },
    data(){
        return {
            
        }
    },
    methods:{
        ...mapMutations(['SET_CURRENT_MENU'])
        
    }

}
</script>

<style>

</style>