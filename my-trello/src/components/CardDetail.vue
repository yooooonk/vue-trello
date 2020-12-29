<template>
    <Modal>
        <div slot="header">
            <div class="card-detail-header">                            
                <a class="modal-close-btn" href="" @click.prevent="onClose">&times;</a>                
            </div>
            <table>
                <tr>
                    <td width="220px"><input class="title-input" v-if="isEditTitle" type="text" v-model="inputTitle" ref="title" @blur="updateTitle" @keyup.enter="updateTitle">
                        <div class="title" v-else @click="onEditTitle" @mouseover="isIcon=true" @mouseout="isIcon=false">{{card.title}}</div>                                                
                    </td>
                    <td><i class="fas fa-pencil-alt pencil-icon" ref="icon" v-if="isIcon"></i></td>
                </tr>
            </table>
        </div>        
        <div slot="body">
            <i class="fas fa-bars"></i>&nbsp; discription
            <div class="card-body">
                <div class="card-des" v-if="card.description && !isEditDes" @click="editDescription">                    
                        {{card.description}}                    
                </div>
                <div class="add-des" v-if="!card.description && !isEditDes" @click="editDescription">Add description</div>
                <textarea v-if="isEditDes" @blur="updateDes" v-model="description" ref="inputDes"></textarea>
            </div>            
        </div>
        <div slot="footer">           
            <div class="card-save-btn" @click="updateDes">SAVE</div>
        </div>
        
    </Modal>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Modal from './Modal.vue'

export default {
  components: { Modal },  
  computed:{
      ...mapState(['board','card'])
  },  
  data(){
        return {          
            isEditTitle:false,              
            isEditDes:false,
            inputTitle:'',
            isIcon:true,
            description:'',
            cardId:''
        }
    },  
  created(){                      
      this.fetchData()
  },    
  methods:{
      ...mapActions(['FETCH_CARD','UPDATE_CARD']),      
      fetchData(){
          const id = this.$route.params.cid  
          
          this.FETCH_CARD({id})            
            .then(()=>{
                this.inputTitle = this.card.title
                this.description = this.card.description
            })
      },
      onClose(){
          this.$router.push(`/b/${this.board.id}`)
      },
      onEditTitle(){
          this.isEditTitle = true
          this.isIcon = false
          this.$nextTick(()=>{
              this.$refs.title.focus()              
          })
      },
      closeEditTitle(){
          this.isEditTitle = false 
          this.inputTitle = this.card.title
      },
      closeEditDes(){
          this.isEditDes=false
          this.inputDes = this.card.description
      },
      updateDes(){          
        const description = this.description

        if(description ===this.card.description){
            this.closeEditDes()
            return
        }

        this.UPDATE_CARD({id:this.card.id,description})
                .then(()=>{
                    this.closeEditDes()
                    this.fetchData()
                })

      },
      updateTitle(){
          const title = this.inputTitle
          if(!title || title===this.card.title) {
              this.closeEditTitle()
              return
          }

          this.UPDATE_CARD({id:this.card.id,title})
                .then(()=>{
                    this.closeEditTitle()
                    this.fetchData()
                })
      },
      editDescription(){
          this.isEditDes=true;
          this.$nextTick(()=>{
              this.$refs.inputDes.focus()
          })
      },
      updateCard(){
          const description = this.description
          
        console.log(this.description)   
      }

  }

}
</script>
