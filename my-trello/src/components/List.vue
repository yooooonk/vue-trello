<template>
<div class="list">
    <div class="header">
        <input type="text" v-if="isEdit" class="list-input" 
                        @blur="closeEdit" ref="title"
                        @keyup.enter="updateTitle" v-model="inputTitle"> 
        <div class="add-text" v-else @click="editTitle">{{list.title}} </div>
        <a href="" class="list-del-btn" @click.prevent="deleteList">&times;</a>    
    </div>
    <div class="line"></div>
    <div class="card-section">
        <div class="card-list">
            <div class="card-item" v-for="card in list.cards" :key="card.id">
                <Card :card="card" />                          
            </div>
            <div class="card-item" v-if="isAddCard">
                <AddCard :lid="list.id" @close="isAddCard=false" />
            </div>
        </div>
        <div class="add-card" @click="isAddCard=true">
            + Add another card
        </div>
    </div>
</div>
</template>

<script>
import { mapActions } from 'vuex'
import Card from './Card.vue'
import AddCard from './AddCard.vue'

export default {
    components:{
        Card, AddCard
    },
    props:['list'],
    data(){
        return {
            isAddCard:false,
            isEdit:false,
            inputTitle:this.list.title,
            listId:this.list.id            
        }
    },    
    methods:{
        ...mapActions(['CREATE_CARD','UPDATE_LIST','DELETE_LIST']),
        editTitle(){
            this.isEdit = true
            this.$nextTick(()=>{
                this.$refs.title.focus()
            })            
        },
        closeEdit(){            
            this.isEdit = false
            this.inputTitle = this.list.title
        },
        updateTitle(){
            const title = this.inputTitle;
            const preTitle = this.list.title
            
            if(!title || title===preTitle){
                this.closeEdit()
                return
            }

            this.UPDATE_LIST({id:this.listId,title})
                .then(()=>this.closeEdit())
        },
        deleteList(){
            if(confirm('list를 삭제하시겠습니까?')){
                this.DELETE_LIST({id:this.listId})
            }   
            
        }
        
        
    }

}
</script>

