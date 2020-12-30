<template>
    <div class="menu-wrapper">
        <div class="menu-header">            
            <div class="header-title main-menu-title">Menu</div>
            <a class="menu-close-btn" href="" @click.prevent="closeBoardMenu">&times;</a>
            <hr />
        </div>
        <ul class="menu-list">
            <li @click="onClickAboutBoard"><i class="far fa-clipboard"></i>&nbsp; &nbsp;About this Board</li>
                <div class="about-board-wrapper" v-if="showDesToggle">
                    어바웃 보드
                    <!-- <div class="card-des">                                            
                        여기 descripton
                    </div>
                    <div class="add-des" v-if="!showDes" @click="editDescription">Add description</div>
                    <textarea v-if="showDes" @blur="updateDes" v-model="description" ref="inputDes"></textarea> -->
                </div>  
            <li><i class="fas fa-palette"></i>&nbsp; Change Background</li>
                <div class="pallet">
                    <a href="" data-color="#ff9f74" class="orange" @click.prevent="onChangeTheme"></a>
                    <a href="" data-color="#ffc853" class="yellow" @click.prevent="onChangeTheme"></a>
                    <a href="" data-color="#ffa6a3" class="rose-pink" @click.prevent="onChangeTheme"></a>
                    <a href="" data-color="#a3daff" class="skyblue" @click.prevent="onChangeTheme"></a>
                    <a href="" data-color="#b98dcb" class="purple" @click.prevent="onChangeTheme"></a>
                </div>
            <li><i class="fas fa-trash" @click="deleteBoard">&nbsp; Delete this Board</i></li>
        </ul>
    </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
export default {    
    computed:{
        ...mapState(['board'])
    },
    data(){
        return{
            showDesToggle:false,            
            description:''
        }
    },
    methods:{
        ...mapActions(['UPDATE_BOARD']),
        ...mapMutations(['SET_THEME','SET_OPEN_BOARD_MENU','SET_CURRENT_MENU']),
        onChangeTheme(e){
            const bgColor = e.target.dataset.color
            const id = this.board.id

            this.UPDATE_BOARD({id,bgColor}).then(()=>{
                this.SET_THEME(bgColor)
            })
        },
        editDescription(){

        },
        updateDes(){

        },
        onClickAboutBtn(){
            this.showDesToggle = !this.showDesToggle
        },
        closeBoardMenu(){
            this.SET_OPEN_BOARD_MENU(false)
        },
        onClickAboutBoard(){
            this.SET_CURRENT_MENU('ABOUT')
        },
        deleteBoard(){
            if(confirm('이 보드를 삭제하시겠습니까?')){
                
            }
        }
    }
}
</script>

<style>

</style>