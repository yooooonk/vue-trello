<template>
<nav class="nav">
    <div class="logo">
      <router-link to="/">MY TRELLO</router-link>
    </div>
    <div class="auth">      
      <router-link to="/login"><button v-if="!isLogin">Login</button></router-link>
      <button v-if="isLogin" @click.prevent="logout">Logout</button>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex'
export default {
   computed:{       
      ...mapState(['navbarColor','bodyColor','lightColor','midColor']),
       ...mapGetters(['isLogin'])
   },
   mounted(){
     this.updateTheme()
   },
   watch:{
     'bodyColor':'updateTheme'
   },
   methods:{
       ...mapMutations(['LOGOUT','SET_THEME']),
       logout(){
           this.LOGOUT()
           this.$router.push('/login')
       },
       updateTheme(){        
         const bodyColor = this.bodyColor
         
         this.$el.style.backgroundColor = bodyColor //nav

         const body = document.querySelector('body')         
         if(body) body.style.background = this.lightColor[bodyColor] // 배경

          const list = document.querySelectorAll('.list') 
                 
         if(this.$route.params.bid){           
           list.forEach(el=>{    
              el.childNodes[0].style.backgroundColor = bodyColor
              el.childNodes[2].style.borderColor = bodyColor
              const cardSection = el.querySelector('.card-section')
                  cardSection.style.backgroundColor = this.midColor[bodyColor]
                  cardSection.style.borderColor = bodyColor              
            })

            document.querySelector('.add-list').style.backgroundColor = bodyColor
            
            document.querySelectorAll('.add-card-btn').forEach((el)=>{
              el.style.backgroundColor = bodyColor
            })

            const headerTitle = document.querySelector('.header-title')
            
             if(headerTitle){
               headerTitle.style.borderColor = bodyColor
            }             
         }  

         
                
       }
   }
}


</script>

