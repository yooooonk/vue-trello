<template>
    <div class="menu-wrapper">
        <div class="menu-header">                     
            <a href="" @click.prevent="backToMain" class="back-btn"><i class="fas fa-angle-left"></i></a> 
            <div class="header-title about-menu-title">About this Board</div>            
            <a class="menu-close-btn" href="" @click.prevent="closeBoardMenu">&times;</a>
            <hr />            
        </div>
        <div class="about-menu-body">
            <i class="fas fa-bars"></i>&nbsp; discription
            <div class="board-des" v-if="!isEdit" @click="isEdit=true">
                {{board.description}}
            </div>
            <div class="add-board-des" @click="onClickAddDes" v-if="!board.description && !isEdit">
                + add description
            </div>
            <textarea v-if="isEdit" @blur="onBlurEdit" v-model="boardDescription" ref="description" ></textarea>
        </div>

    </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
export default {
    computed:{
        ...mapState(['board'])
    },
    data(){
        return {
            isEdit:false,
            boardDescription : ''
        }
    },
    mounted(){
        this.boardDescription = this.board.description        
    },
    methods:{
        ...mapMutations(['SET_OPEN_BOARD_MENU','SET_CURRENT_MENU']),
        ...mapActions(['UPDATE_BOARD']),
        closeBoardMenu(){
            this.SET_OPEN_BOARD_MENU(false)
            this.SET_CURRENT_MENU('MAIN')
        },
        backToMain(){
           this.SET_CURRENT_MENU('MAIN')
           
        },
        onClickAddDes(){
            this.isEdit=true
            this.$nextTick(()=>{
                this.$refs.description.focus()
            })
        },
        onBlurEdit(){
            const description = this.boardDescription;
            const id = this.board.id
                  

            this.UPDATE_BOARD({id,description})
                .then(()=>{
                    this.isEdit=false
                    this.boardDescription = this.board.description
                })
        }
    }
}
</script>
