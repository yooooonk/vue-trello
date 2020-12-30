<template>
  <Modal>
      <div slot="header">
          새 보드 추가
          <a class="modal-close-btn" href="" @click.prevent="$emit('close')">&times;</a>
      </div>
      
      <div slot="body">
          <input type="text" v-model="title" class="add-board-input" @keyup.enter="addBoard">
          <button class="button" :disabled="!title" @click="addBoard">추가</button>
          <div class="pallet">
              <a href="" data-color="#ff9f74" class="orange" @click.prevent="onClickPallet"></a>
              <a href="" data-color="#ffc853" class="yellow" @click.prevent="onClickPallet"></a>
              <a href="" data-color="#ffa6a3" class="rose-pink" @click.prevent="onClickPallet"></a>
              <a href="" data-color="#a3daff" class="skyblue" @click.prevent="onClickPallet"></a>
              <a href="" data-color="#9f73ae" class="purple" @click.prevent="onClickPallet"></a>
          </div>
      </div>
      <div slot="footer">          
          
      </div>
  </Modal>
</template>

<script>
import { mapActions } from 'vuex'
import Modal from './Modal.vue'

export default {
    components:{Modal},
    data(){
        return {
            pickedColor : '#ff9f74',
            title:''
        }
    },
    mounted(){
        
         /* Array.from(this.$el.querySelectorAll('a')).forEach((el,idx)=>{                        
            el.style.backgroundColor = el.dataset.color
        })   */

        this.$el.querySelector('.modal-container').style.backgroundColor = this.pickedColor
    },
    methods:{
        ...mapActions(['CREATE_BOARD']),
        onClickPallet(e){            
            const color = e.target.dataset.color
            
            this.pickedColor = color? color: '#ff9f74'
            this.$el.querySelector('.modal-container').style.backgroundColor = color
        },
        addBoard(){
            if(this.title){
                this.CREATE_BOARD({title:this.title,bgColor:this.pickedColor})
                .then(({id})=>{
                    this.$router.push(`/b/${id}`)                    
                })
            }
            
        }
    }
}
</script>

