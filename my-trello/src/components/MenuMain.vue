<template>
    <div class="menu-wrapper">
        <div class="menu-header">            
            <div class="header-title main-menu-title">Menu</div>
            <a class="menu-close-btn" href="" @click.prevent="closeBoardMenu">&times;</a>
            <hr />
        </div>
        <ul class="menu-list">
            <li @click="onClickAboutBoard"><i class="far fa-clipboard"></i>&nbsp; &nbsp;About this Board</li>                  
            <li @click="onClickPallet"><i class="fas fa-palette"></i>&nbsp; Change Background</li>
                <transition name="pallet-slide">
                    <div class="pallet" v-if="showPalletToggle">
                        <a href="" data-color="#ff9f74" class="orange" @click.prevent="onChangeTheme"></a>
                        <a href="" data-color="#ffc853" class="yellow" @click.prevent="onChangeTheme"></a>
                        <a href="" data-color="#ffa6a3" class="rose-pink" @click.prevent="onChangeTheme"></a>
                        <a href="" data-color="#a3daff" class="skyblue" @click.prevent="onChangeTheme"></a>
                        <a href="" data-color="#b98dcb" class="purple" @click.prevent="onChangeTheme"></a>
                    </div>
                </transition>
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
            showPalletToggle:false,            
            description:''
        }
    },
    methods:{
        ...mapActions(['UPDATE_BOARD','DELETE_BOARD']),
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
        onClickPallet(){
            this.showPalletToggle = !this.showPalletToggle
            
        },
        closeBoardMenu(){
            this.SET_OPEN_BOARD_MENU(false)
        },
        onClickAboutBoard(){
            this.SET_CURRENT_MENU('ABOUT')
        },
        deleteBoard(){
            console.log(this.board.id)
            if(confirm('이 보드를 삭제하시겠습니까?')){                
                this.DELETE_BOARD({id:this.board.id})
                .then(()=>this.$router.push('/'))
                    
            }
        }
    }
}
</script>

<style>

</style>