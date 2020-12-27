<template>
<div class="list">
    <div class="header">
        {{list.title}}
    </div>
    <div class="line"></div>
    <div class="card-section">
        <div class="card-list">
            <div class="card-item" v-for="card in list.cards" :key="card.id">
                <Card :card="card" />                          
            </div>
            <div class="card-item" v-if="isAddCard">
                <AddCard :lid="list.id" @close="isAddCard=false"/>
            </div>
        </div>
        <div class="add-card" @click="addCard">
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
            isAddCard:false
        }
    },    
    methods:{
        ...mapActions(['CREATE_CARD']),
        addCard(){
            this.isAddCard=true
            //this.CREATE_CARD({title,id})
        }
    }

}
</script>

