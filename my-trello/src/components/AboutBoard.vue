<template>
    <div class="menu-wrapper">
        <div class="menu-header">                     
            <a href="" @click.prevent="backToMain" class="back-btn"><i class="fas fa-angle-left"></i></a> 
            <div class="header-title about-menu-title">About this Board</div>            
            <a class="menu-close-btn" href="" @click.prevent="closeBoardMenu">&times;</a>
            <hr />            
        </div>
        안뇨오오오오오오오오오오
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
    methods:{
        ...mapMutations(['SET_OPEN_BOARD_MENU','SET_CURRENT_MENU']),
        closeBoardMenu(){
            this.SET_OPEN_BOARD_MENU(false)
        },
        backToMain(){
           this.SET_CURRENT_MENU('MAIN')
        }
    }
}
</script>
