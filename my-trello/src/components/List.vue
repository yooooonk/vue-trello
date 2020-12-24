<template>
<div class="list">
    <div class="heard">
        {{list.title}}
    </div>
    <div class="line">

    </div>
    <div class="list-wrapper">
        <div class="card-list">
            <div class="card-item" v-for="card in list.cards" :key="card.id">
                <Card :card="card" />
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

export default {
    components:{
        Card
    },
    props:['list'],
    data(){
        return {
            
        }
    },    
    methods:{
        ...mapActions(['CREATE_CARD']),
        addCard(){
            const id = this.list.id
            this.list.cards.push({title:'하하'})
            //this.CREATE_CARD({title,id})
        }
    }

}
</script>

